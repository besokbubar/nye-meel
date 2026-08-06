import React, { useState } from "react";
import { Download, TrendingUp, ShoppingBag, Wallet, CheckCircle, CreditCard, DollarSign } from "lucide-react";

export default function LaporanTab({ transactions = [] }) {
  const [period, setPeriod] = useState("Hari Ini");
  const [toastMessage, setToastMessage] = useState("");

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // LOGIKA HITUNG LAPORAN REAL-TIME DARI TRANSAKSI
  const calculateReport = () => {
    const now = new Date();

    const filteredTx = transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      if (period === "Hari Ini") {
        return txDate.toDateString() === now.toDateString();
      }
      if (period === "7 Hari") {
        const diffTime = Math.abs(now - txDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }
      if (period === "Bulan Ini") {
        return (
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear()
        );
      }
      return true;
    });

    let sales = 0;
    let itemsSold = 0;
    let grossProfit = 0;
    let moneyIn = 0;
    let debt = 0;
    let cash = 0;
    let qris = 0;

    filteredTx.forEach((tx) => {
      sales += tx.finalTotal || 0;
      debt += tx.debtAmount || 0;

      const receivedMoney = tx.isDebt
        ? Math.max(0, tx.payAmount)
        : tx.finalTotal;

      moneyIn += receivedMoney;
      cash += receivedMoney; // Default cash

      if (tx.items) {
        tx.items.forEach((item) => {
          itemsSold += item.qty || 0;
          const buy = item.buyPrice || 0;
          grossProfit += ((item.price || 0) - buy) * (item.qty || 0);
        });
      }
    });

    const totalMoneyDebt = moneyIn + debt;
    const ratioMoneyIn = totalMoneyDebt > 0 ? Math.round((moneyIn / totalMoneyDebt) * 100) : 0;
    const ratioDebt = totalMoneyDebt > 0 ? Math.round((debt / totalMoneyDebt) * 100) : 0;

    return {
      sales,
      transactions: filteredTx.length,
      itemsSold,
      grossProfit: Math.max(0, grossProfit),
      moneyIn,
      debt,
      cash,
      qris,
      ratioMoneyIn,
      ratioDebt,
    };
  };

  const currentData = calculateReport();

  const handleExportPDF = () => {
    window.print();
    showNotification(`Mencetak Laporan Keuangan Periode '${period}'...`);
  };

  return (
    <div className="space-y-4">
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-[#FFC72C] px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2 border border-[#FFC72C]/30 animate-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-[#FFC72C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Periode Pills */}
      <div className="grid grid-cols-3 gap-2 bg-amber-100/60 p-1.5 rounded-2xl border border-amber-200">
        {["Hari Ini", "7 Hari", "Bulan Ini"].map((p) => (
          <button
            key={p}
            onClick={() => {
              setPeriod(p);
              showNotification(`Periode Laporan: ${p}`);
            }}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
              period === p
                ? "bg-[#FFC72C] text-slate-900 shadow-md scale-102"
                : "text-slate-600 hover:text-slate-900 hover:bg-amber-50"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Title & Ekspor Button */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">Ringkasan Keuangan ({period})</h2>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFC72C] text-slate-900 border border-amber-300 rounded-xl text-xs font-extrabold hover:bg-amber-400 active:scale-95 transition shadow-sm"
        >
          <Download className="w-3.5 h-3.5" /> Ekspor PDF
        </button>
      </div>

      {/* Grid Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="w-8 h-8 bg-amber-100 text-amber-900 rounded-xl flex items-center justify-center">
            <Wallet className="w-4 h-4 text-amber-800" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">
              Rp {currentData.sales.toLocaleString()}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">Total Penjualan</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">{currentData.transactions}</h3>
            <p className="text-[11px] text-slate-400 font-medium">Total Transaksi</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="w-8 h-8 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center text-sm font-bold">
            📦
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">{currentData.itemsSold}</h3>
            <p className="text-[11px] text-slate-400 font-medium">Barang Terjual</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">
              Rp {currentData.grossProfit.toLocaleString()}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">Laba Kotor</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">Uang Masuk vs Hutang</h3>
        
        <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden flex border border-slate-200">
          <div className="bg-[#FFC72C] h-full transition-all duration-500" style={{ width: `${currentData.ratioMoneyIn}%` }}></div>
          <div className="bg-amber-600 h-full transition-all duration-500" style={{ width: `${currentData.ratioDebt}%` }}></div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC72C]"></span>
              <span>Uang Masuk</span>
            </div>
            <p className="font-extrabold text-slate-800 text-sm mt-0.5">Rp {currentData.moneyIn.toLocaleString()}</p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <span>Hutang</span>
            </div>
            <p className="font-extrabold text-red-600 text-sm mt-0.5">
              {currentData.debt > 0 ? `-Rp ${currentData.debt.toLocaleString()}` : "Rp 0"}
            </p>
          </div>
        </div>
      </div>

      {/* Rincian Pembayaran */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">Rincian Metode Uang Masuk</h3>
        
        <div className="flex justify-between items-center border-b pb-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-900 rounded-lg"><DollarSign className="w-4 h-4 text-amber-800" /></div>
            <span className="font-semibold text-slate-700">Tunai</span>
          </div>
          <span className="font-extrabold text-slate-800">Rp {currentData.cash.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-900 rounded-lg"><CreditCard className="w-4 h-4 text-amber-800" /></div>
            <span className="font-semibold text-slate-700">QRIS / Non-Tunai</span>
          </div>
          <span className="font-extrabold text-slate-800">Rp {currentData.qris.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
