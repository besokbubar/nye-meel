import React, { useState } from "react";
import { X, Delete, Edit2 } from "lucide-react";

export default function PaymentModal({ total, onClose, onSuccess }) {
  const [payAmount, setPayAmount] = useState("100000");
  const discount = 3500;
  const finalTotal = total - discount;
  const currentPay = parseInt(payAmount || "0");
  const change = Math.max(0, currentPay - finalTotal);

  const handleNumpad = (val) => {
    if (val === "DEL") {
      setPayAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (val === "000") {
      setPayAmount((prev) => (prev === "0" ? "0" : prev + "000"));
    } else {
      setPayAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm">💵</span>
            <h3 className="font-bold text-base text-slate-800">Uang Diterima</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 text-xs">
          <div className="flex justify-between text-slate-500 font-medium"><span>Total Tagihan</span><span>Rp {total.toLocaleString()}</span></div>
          <div className="flex justify-between text-red-500 font-medium"><span className="flex items-center gap-1">Diskon <Edit2 className="w-3 h-3" /></span><span>- Rp {discount.toLocaleString()}</span></div>
          <div className="flex justify-between font-bold text-blue-600 text-sm pt-2 border-t border-slate-200"><span>Total Akhir</span><span>Rp {finalTotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-slate-700 font-semibold pt-1"><span>Bayar</span><span>Rp {currentPay.toLocaleString()}</span></div>
          <div className="flex justify-between text-emerald-600 font-bold text-sm pt-1"><span>Kembali</span><span>Rp {change.toLocaleString()}</span></div>
        </div>

        <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5">
          <span className="text-slate-400 font-bold">Rp</span>
          <span className="font-bold text-lg text-slate-800">{currentPay.toLocaleString()}</span>
          <button onClick={() => setPayAmount("0")} className="text-slate-300 hover:text-slate-500"><X className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => setPayAmount(finalTotal.toString())} className="py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs">Uang Pas</button>
          {["20000", "50000", "100000"].map((nom) => (
            <button key={nom} onClick={() => setPayAmount(nom)} className="py-2.5 border border-blue-200 bg-blue-50/50 text-blue-700 font-bold rounded-xl text-xs hover:bg-blue-100">
              Rp {parseInt(nom).toLocaleString()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0"].map((num) => (
            <button key={num} onClick={() => handleNumpad(num)} className="py-3 bg-slate-100 font-bold rounded-xl text-slate-800 hover:bg-slate-200 active:bg-slate-300 text-base">
              {num}
            </button>
          ))}
          <button onClick={() => handleNumpad("DEL")} className="py-3 bg-red-50 text-red-500 flex items-center justify-center rounded-xl hover:bg-red-100 active:bg-red-200">
            <Delete className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="w-1/3 py-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">Kembali</button>
          <button onClick={onSuccess} className="w-2/3 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md">Konfirmasi</button>
        </div>
      </div>
    </div>
  );
}
