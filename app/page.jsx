"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import KasirTab from "../components/KasirTab";
import BarangTab from "../components/BarangTab";
import HutangTab from "../components/HutangTab";
import LaporanTab from "../components/LaporanTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState("kasir");

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "kasir" && <KasirTab />}
      {activeTab === "barang" && <BarangTab />}
      {activeTab === "hutang" && <HutangTab />}
      {activeTab === "laporan" && <LaporanTab />}
    </Layout>
  );
}
