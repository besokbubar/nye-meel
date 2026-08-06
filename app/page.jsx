"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import KasirTab from "../components/KasirTab";
import BarangTab from "../components/BarangTab";
import HutangTab from "../components/HutangTab";
import LaporanTab from "../components/LaporanTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState("kasir");

  // SETELAN PABRIK: Identitas Toko & Katalog
  const [storeInfo, setStoreInfo] = useState({
    name: "Kasir Warung",
    subtitle: "Toko Baru Saya",
    phone: "-",
    address: "-",
    receiptFooter: "Terima kasih telah berbelanja!",
  });

  const [catalog, setCatalog] = useState([]);

  const handleFactoryReset = () => {
    setCatalog([]);
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
      {activeTab === "kasir" && <KasirTab catalog={catalog} storeInfo={storeInfo} />}
      {activeTab === "barang" && <BarangTab items={catalog} setItems={setCatalog} />}
      {activeTab === "hutang" && <HutangTab />}
      {activeTab === "laporan" && <LaporanTab />}
    </Layout>
  );
}
