"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import KasirTab from "../components/KasirTab";
import BarangTab from "../components/BarangTab";
import HutangTab from "../components/HutangTab";
import LaporanTab from "../components/LaporanTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState("kasir");

  // Master Data Identitas Toko Terpusat
  const [storeInfo, setStoreInfo] = useState({
    name: "Nye-meel",
    subtitle: "Bikin Nagih Terus",
    phone: "081284135374",
    address: "Jl. Kantil No.16 RT.003/001 Kelapa Gading Timur Jakarta Utara",
    receiptFooter: "Terima kasih telah berbelanja!",
  });

  // Master Katalog Barang Terpusat
  const [catalog, setCatalog] = useState([
    { id: 1, name: "Teh Kotak 300ml", barcode: "899432901318", price: 4500, buyPrice: 3000, discount: 0, category: "Minuman", stock: 50, minStock: 10, sku: "190420260156" },
    { id: 2, name: "Bodrex", barcode: "899426878880", price: 14000, buyPrice: 10000, discount: 0, category: "Obat-obatan", stock: 76, minStock: 15, sku: "190420260157" },
    { id: 3, name: "Dunhill Mild", barcode: "899043057810", price: 4500, buyPrice: 3500, discount: 0, category: "Rokok", stock: 73, minStock: 20, sku: "190420260158" },
    { id: 4, name: "Kecap Manis ABC v3", barcode: "899080076078", price: 7500, buyPrice: 5500, discount: 0, category: "Sembako", stock: 96, minStock: 10, sku: "190420260159" },
    { id: 5, name: "Ceker Ayam Pedas", barcode: "", price: 10000, buyPrice: 7000, discount: 0, category: "Makanan", stock: 100, minStock: 10, sku: "190420260155" },
    { id: 6, name: "Aqua 1.5L", barcode: "899043057811", price: 18000, buyPrice: 14000, discount: 0, category: "Minuman", stock: 42, minStock: 10, sku: "190420260161" },
  ]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} storeInfo={storeInfo} setStoreInfo={setStoreInfo}>
      {activeTab === "kasir" && <KasirTab catalog={catalog} storeInfo={storeInfo} />}
      {activeTab === "barang" && <BarangTab items={catalog} setItems={setCatalog} />}
      {activeTab === "hutang" && <HutangTab />}
      {activeTab === "laporan" && <LaporanTab />}
    </Layout>
  );
}
