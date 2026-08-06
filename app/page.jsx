"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import KasirTab from "@/components/KasirTab";
import BarangTab from "@/components/BarangTab";
import HutangTab from "@/components/HutangTab";
import LaporanTab from "@/components/LaporanTab";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("kasir");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Default Identitas Toko
  const defaultStoreInfo = {
    name: "Kasir Warung",
    subtitle: "Toko Utama Saya",
    phone: "-",
    address: "-",
    receiptFooter: "Terima kasih telah berbelanja!",
    pin: "1234", // PIN Default
  };

  // State Utama
  const [storeInfo, setStoreInfo] = useState(defaultStoreInfo);
  const [cartItems, setCartItems] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // 1. KETIKA PERTAMA KALI DIBUKA: BACA DATA DARI LOCAL STORAGE
  useEffect(() => {
    try {
      const savedStore = localStorage.getItem("kw_storeInfo");
      const savedCatalog = localStorage.getItem("kw_catalog");
      const savedCustomers = localStorage.getItem("kw_customers");
      const savedTransactions = localStorage.getItem("kw_transactions");
      const savedCart = localStorage.getItem("kw_cart");
      const savedAuth = localStorage.getItem("kw_isLoggedIn");

      if (savedStore) setStoreInfo(JSON.parse(savedStore));
      if (savedCatalog) setCatalog(JSON.parse(savedCatalog));
      if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedAuth === "true") setIsLoggedIn(true);
    } catch (e) {
      console.error("Gagal membaca data dari LocalStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // 2. OTOMATIS SIMPAN KE LOCAL STORAGE SETIAP ADA PERUBAHAN
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("kw_storeInfo", JSON.stringify(storeInfo));
    localStorage.setItem("kw_catalog", JSON.stringify(catalog));
    localStorage.setItem("kw_customers", JSON.stringify(customers));
    localStorage.setItem("kw_transactions", JSON.stringify(transactions));
    localStorage.setItem("kw_cart", JSON.stringify(cartItems));
    localStorage.setItem("kw_isLoggedIn", isLoggedIn ? "true" : "false");
  }, [storeInfo, catalog, customers, transactions, cartItems, isLoggedIn, isLoaded]);

  // Transaksi Berhasil
  const handleTransactionSuccess = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);

    // Potong Stok Barang
    if (newTx.items && newTx.items.length > 0) {
      setCatalog((prevCatalog) =>
        prevCatalog.map((item) => {
          const sold = newTx.items.find((i) => i.id === item.id);
          if (sold) {
            return {
              ...item,
              stock: Math.max(0, item.stock - sold.qty),
            };
          }
          return item;
        })
      );
    }

    // Catat Hutang Otomatis jika kurang bayar
    if (newTx.isDebt && newTx.debtAmount > 0) {
      const customerName = newTx.customerName || "Pelanggan Kasir";
      setCustomers((prevCustomers) => {
        const existing = prevCustomers.find(
          (c) => c.name.toLowerCase() === customerName.toLowerCase()
        );

        if (existing) {
          return prevCustomers.map((c) =>
            c.id === existing.id
              ? {
                  ...c,
                  debt: c.debt + newTx.debtAmount,
                  history: [
                    {
                      id: Date.now(),
                      date: new Date().toLocaleString(),
                      type: "Hutang Transaksi",
                      amount: newTx.debtAmount,
                    },
                    ...c.history,
                  ],
                }
              : c
          );
        } else {
          return [
            {
              id: Date.now(),
              name: customerName,
              phone: "-",
              address: "Transaksi Kasir",
              debt: newTx.debtAmount,
              history: [
                {
                  id: Date.now(),
                  date: new Date().toLocaleString(),
                  type: "Hutang Transaksi",
                  amount: newTx.debtAmount,
                },
              ],
            },
            ...prevCustomers,
          ];
        }
      });
    }

    setCartItems([]);
  };

  // Reset Setelan Pabrik Total
  const handleFactoryReset = () => {
    setCartItems([]);
    setCatalog([]);
    setCustomers([]);
    setTransactions([]);
    setStoreInfo(defaultStoreInfo);
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("kw_isLoggedIn", "false");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 text-[#FFC72C] flex items-center justify-center font-bold text-sm">
        Memuat Data Kasir Warung...
      </div>
    );
  }

  // Jika Belum Login -> Tampilkan Layar Login PIN
  if (!isLoggedIn) {
    return (
      <LoginModal
        storeInfo={storeInfo}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    );
  }

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      storeInfo={storeInfo}
      setStoreInfo={setStoreInfo}
      onFactoryReset={handleFactoryReset}
      onLogout={handleLogout}
    >
      <div className={activeTab === "kasir" ? "block" : "hidden"}>
        <KasirTab
          catalog={catalog}
          storeInfo={storeInfo}
          items={cartItems}
          setItems={setCartItems}
          onTransactionSuccess={handleTransactionSuccess}
        />
      </div>

      <div className={activeTab === "barang" ? "block" : "hidden"}>
        <BarangTab items={catalog} setItems={setCatalog} />
      </div>

      <div className={activeTab === "hutang" ? "block" : "hidden"}>
        <HutangTab customers={customers} setCustomers={setCustomers} />
      </div>

      <div className={activeTab === "laporan" ? "block" : "hidden"}>
        <LaporanTab transactions={transactions} />
      </div>
    </Layout>
  );
}
