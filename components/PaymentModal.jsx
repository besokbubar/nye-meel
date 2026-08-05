import React, { useState } from "react";
import { X, Delete, Edit2, Check } from "lucide-react";

export default function PaymentModal({ total, onClose, onSuccess }) {
  const [discount, setDiscount] = useState(3500);
  const [isEditingDiscount, setIsEditingDiscount] = useState(false);
  const [tempDiscount, setTempDiscount] = useState("3500");

  const finalTotal = Math.max(0, total - discount);
  const [payAmount, setPayAmount] = useState("100000");
  const currentPay = parseInt(payAmount || "0");

  const isDebt = currentPay < finalTotal;
  const debtAmount = isDebt ? finalTotal - currentPay : 0;
  const changeAmount = !isDebt ? currentPay - finalTotal : 0;

  const handleNumpad = (val) => {
    if (val === "DEL") setPayAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    else if (val === "000") setPayAmount((prev) => (prev === "0" ? "0" : prev + "000"));
    else setPayAmount((prev) => (prev === "0" ? val : prev + val));
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-slate-900 rounded-lg text-sm">💵</span>
            <h3 className="font-bold text-base text-slate-800">Uang Diterima</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 text-xs">
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Total Tagihan</span>
            <span className="font-bold">Rp {total.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-red-500 font-medium items-center">
            <button onClick={() => setIsEditingDiscount(!isEditingDiscount)} className="flex items-center gap-1.5 text-red-500 font-semibold hover:underline bg-red-50 px-2 py-0.5 rounded-lg border border-red-200">
              <span>Diskon</span>
              <Edit2 className="w-3 h-3" />
            </button>
            {isEditingDiscount ? (
              <div className="flex items-center gap-1">
                <input type="number" value={tempDiscount} onChange={(e) => setTempDiscount(e.target.value)} className="w-20 px-2 py-0.5 text-xs border border-red-300 rounded-lg font-bold text-red-600" autoFocus />
                <button onClick={() => { setDiscount(parseInt(tempDiscount || "0")); setIsEditingDiscount(false); }} className="p-1 bg-red-600 text-white rounded-lg"><Check className="w-3 h-3" /></button>
              </div>
            ) : (
              <span>- Rp {discount.toLocaleString()}</span>
            )}
          </div>

          <div className="flex justify-between font-extrabold text-amber-700 text-sm pt-2 border-t border-slate-200">
            <span>Total Akhir</span>
            <span className="text-base">Rp {finalTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-slate-700 font-semibold pt-1">
            <span>Bayar</span>
            <span>Rp {currentPay.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-bold text-sm pt-1">
            <span>{isDebt ? "Hutang" : "Kembali"}</span>
            <span className={isDebt ? "text-red-600 font-bold" : "text-amber-700 font-extrabold"}>
              Rp {(isDebt ? debtAmount : changeAmount).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-inner">
          <span className="text-slate-400 font-bold text-sm">Rp</span>
          <span className="font-bold text-xl text-slate-800">{currentPay.toLocaleString()}</span>
          <button onClick={() => setPayAmount("0")} className="text-slate-300 hover:text-slate-500 p-1"><X className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => setPayAmount(finalTotal.toString())} className="py-2.5 bg-[#FFC72C] text-slate-900 font-extrabold rounded-xl text-xs hover:bg-amber-400 shadow-sm transition">
            Uang Pas
          </button>
          {["20000", "50000", "100000"].map((nom) => (
            <button key={nom} onClick={() => setPayAmount(nom)} className="py-2.5 border border-amber-200 bg-amber-50/60 text-slate-800 font-bold rounded-xl text-xs hover:bg-amber-100 transition">
              Rp {parseInt(nom).toLocaleString()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0"].map((num) => (
            <button key={num} onClick={() => handleNumpad(num)} className="py-3 bg-slate-100 font-bold rounded-xl text-slate-800 hover:bg-slate-200 active:bg-slate-300 text-base transition">
              {num}
            </button>
          ))}
          <button onClick={() => handleNumpad("DEL")} className="py-3 bg-red-50 text-red-500 flex items-center justify-center rounded-xl hover:bg-red-100">
            <Delete className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="w-1/3 py-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">Kembali</button>
          <button onClick={() => onSuccess({ discount, finalTotal, payAmount: currentPay, isDebt, debtAmount, changeAmount })} className="w-2/3 py-3 bg-[#FFC72C] text-slate-900 rounded-xl text-xs font-extrabold hover:bg-amber-400 shadow-md transition">
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}
