"use client";

import React, { useState } from "react";
// MENGGUNAKAN ALIAS COMPONENT RESMI KITA (@/components/Layout)
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

  // 2. Katalog Barang Terpusat
  const [catalog, setCatalog] = useState([]);

  // 3. Pelanggan & Hutang Terpusat
  const [customers, setCustomers] = useState([]);

  // 4. Riwayat Transaksi Terpusat
  const [transactions, setTransactions] = useState([]);

  // --- FUNGSI SINKRONISASI UTAMA TRANSAKSI BERHASIL ---
  const handleTransactionSuccess = (newTx) => {
    // A. Simpan ke Riwayat Transaksi
    setTransactions((prev) => [newTx, ...prev]);

    // B. Potong Stok Barang di Katalog
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

    // C. Jika Transaksi Hutang -> Otomatis Masuk ke Menu Hutang
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
  };

  // Reset Setelan Pabrik Total
  const handleFactoryReset = () => {
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
      {activeTab === "kasir" && (
        <KasirTab
          catalog={catalog}
          storeInfo={storeInfo}
          onTransactionSuccess={handleTransactionSuccess}
        />
      )}
      {activeTab === "barang" && (
        <BarangTab items={catalog} setItems={setCatalog} />
      )}
      {activeTab === "hutang" && (
        <HutangTab customers={customers} setCustomers={setCustomers} />
      )}
      {activeTab === "laporan" && (
        <LaporanTab transactions={transactions} />
      )}
    </Layout>
  );
}
