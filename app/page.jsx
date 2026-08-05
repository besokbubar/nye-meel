"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import KasirTab from "../components/KasirTab";
import BarangTab from "../components/BarangTab";
import HutangTab from "../components/HutangTab";
import LaporanTab from "../components/LaporanTab";
import PaymentModal from "../components/PaymentModal";
import ReceiptModal from "../components/ReceiptModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("kasir");
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "kasir" && (
        <KasirTab onCheckout={() => setShowPayment(true)} />
      )}
      {activeTab === "barang" && <BarangTab />}
      {activeTab === "hutang" && <HutangTab />}
      {activeTab === "laporan" && <LaporanTab />}

      {showPayment && (
        <PaymentModal
          total={58000}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            setShowReceipt(true);
          }}
        />
      )}

      {showReceipt && (
        <ReceiptModal onClose={() => setShowReceipt(false)} />
      )}
    </Layout>
  );
}
