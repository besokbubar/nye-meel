"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import KasirTab from "@/components/KasirTab";
import BarangTab from "@/components/BarangTab";
import HutangTab from "@/components/HutangTab";
import LaporanTab from "@/components/LaporanTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState("kasir");

  // 1. Identitas Toko
  const [storeInfo, setStoreInfo] = useState({
    name: "Kasir Warung",
    subtitle: "Toko Baru Saya",
    phone: "-",
    address: "-",
    receiptFooter: "Terima kasih telah berbelanja!",
  });

  // 2. State Keranjang Terpusat (Agar tidak hilang saat pindah menu)
  const [cartItems, setCartItems] = useState([]);

  // 3. Katalog Barang Terpusat
  const [catalog, setCatalog] = useState([]);

  // 4. Pelanggan & Hutang Terpusat
  const [customers, setCustomers] = useState([]);

  // 5. Riwayat Transaksi Terpusat
  const [transactions, setTransactions] = useState([]);

  // --- SINKRONISASI TRANSAKSI BERHASIL ---
  const handleTransactionSuccess = (newTx) => {
    // Simpan ke Riwayat Transaksi
    setTransactions((prev) => [newTx, ...prev]);

    // Potong Stok Barang di Katalog
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

    // Jika Transaksi Hutang -> Otomatis Masuk ke Menu Hutang
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

    // Kosongkan Keranjang setelah pembayaran sukses
    setCartItems([]);
  };

  // Reset Setelan Pabrik Total
  const handleFactoryReset = () => {
    setCartItems([]);
    setCatalog([]);
    setCustomers([]);
    setTransactions([]);
    setStoreInfo({
      name: "Kasir Warung",
      subtitle: "Toko Baru Saya",
      phone: "-",
      address: "-",
      receiptFooter: "Terima kasih telah berbelanja!",
    });
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      storeInfo={storeInfo}
      setStoreInfo={setStoreInfo}
      onFactoryReset={handleFactoryReset}
    >
      {/* Seluruh komponen dirender tetapi disembunyikan agar state internal tetap terjaga */}
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
