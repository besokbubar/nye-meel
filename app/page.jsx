"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import KasirTab from "../components/KasirTab";
import BarangTab from "../components/BarangTab";
import HutangTab from "../components/HutangTab";
import LaporanTab from "../components/LaporanTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState("kasir");

  // Identitas Toko
  const [storeInfo, setStoreInfo] = useState({
    name: "Kasir Warung",
    subtitle: "Toko Baru Saya",
    phone: "-",
    address: "-",
    receiptFooter: "Terima kasih telah berbelanja!",
  });

  // Katalog Barang & Riwayat Transaksi Real-time
  const [catalog, setCatalog] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fungsi Tambah Transaksi Selesai
  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);

    // Potong Stok Barang Otomatis
    if (newTx.items && newTx.items.length > 0) {
      setCatalog((prevCatalog) =>
        prevCatalog.map((item) => {
          const soldItem = newTx.items.find((i) => i.id === item.id);
          if (soldItem) {
            return { ...item, stock: Math.max(0, item.stock - soldItem.qty) };
          }
          return item;
        })
      );
    }
  };

  const handleFactoryReset = () => {
    setCatalog([]);
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
          onTransactionSuccess={handleAddTransaction}
        />
      )}
      {activeTab === "barang" && <BarangTab items={catalog} setItems={setCatalog} />}
      {activeTab === "hutang" && <HutangTab />}
      {activeTab === "laporan" && <LaporanTab transactions={transactions} />}
    </Layout>
  );
}
