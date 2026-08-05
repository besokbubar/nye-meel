import React, { useState } from "react";
import { Download, TrendingUp, ShoppingBag, Wallet } from "lucide-react";

export default function LaporanTab() {
  const [period, setPeriod] = useState("Bulan Ini");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 bg-slate-200/60 p-1 rounded-2xl">
        {["Hari Ini", "7 Hari", "Bulan Ini"].map((p) => (
          <button key={p} onClick={() => setPeriod(p)} className={`py-2 text-xs font-bold rounded-xl transition-all ${period === p ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">Ringkasan Keuangan</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-xs font-bold hover:bg-blue-100">
          <Download className="w-3.5 h-3.5" /> Ekspor PDF
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Wallet className="w-4 h-4" /></div>
          <div><h3 className="font-bold text-slate-800 text-base">Rp 819.500</h3><p className="text-[11px] text-slate-400 font-medium">Total Penjualan</p></div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><ShoppingBag className="w-4 h-4" /></div>
          <div><h3 className="font-bold text-slate-800 text-base">4</h3><p className="text-[11px] text-slate-400 font-medium">Total Transaksi</p></div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">📦</div>
          <div><h3 className="font-bold text-slate-800 text-base">67</h3><p className="text-[11px] text-slate-400 font-medium">Barang Terjual</p></div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><TrendingUp className="w-4 h-4" /></div>
          <div><h3 className="font-bold text-slate-800 text-base">Rp 96.500</h3><p className="text-[11px] text-slate-400 font-medium">Laba Kotor</p></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">Uang Masuk vs Hutang</h3>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex"><div className="bg-blue-600 h-full w-[90%]"></div><div className="bg-amber-500 h-full w-[10%]"></div></div>
        <div className="flex justify-between items-center text-xs">
          <div><div className="flex items-center gap-1.5 text-slate-500"><span className="w-2 h-2 rounded-full bg-blue-600"></span><span>Uang Masuk</span></div><p className="font-bold text-slate-800 text-sm mt-0.5">Rp 908.000</p></div>
          <div className="text-right"><div className="flex items-center gap-1.5 justify-end text-slate-500"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span>Hutang</span></div><p className="font-bold text-red-500 text-sm mt-0.5">-Rp 88.500</p></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">Rincian Uang Masuk</h3>
        <div className="flex justify-between items-center border-b pb-2 text-xs">
          <div className="flex items-center gap-2"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg">💵</div><span className="font-semibold text-slate-700">Tunai</span></div>
          <span className="font-bold text-slate-800">Rp 400.000</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2"><div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">💳</div><span className="font-semibold text-slate-700">QRIS / Non-Tunai</span></div>
          <span className="font-bold text-slate-800">Rp 508.000</span>
        </div>
      </div>
    </div>
  );
}
