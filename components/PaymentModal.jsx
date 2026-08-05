import React, { useState } from "react";
import { X, Delete, Edit2 } from "lucide-react";

export default function PaymentModal({ total, onClose, onSuccess }) {
  const [discount, setDiscount] = useState(3500);
  const [editingDiscount, setEditingDiscount] = useState(false);
  const [discountInput, setDiscountInput] = useState("3500");

  const finalTotal = Math.max(0, total - discount);
  const [payAmount, setPayAmount] = useState("0");
  const currentPay = parseInt(payAmount || "0");

  // RUMUS PERHITUNGAN AKURAT
  const isInsufficient = currentPay < finalTotal;
  const change = currentPay >= finalTotal ? currentPay - finalTotal : 0;

  const handleNumpad = (val) => {
    if (val === "DEL") {
      setPayAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (val === "000") {
      setPayAmount((prev) => (prev === "0" ? "0" : prev + "000"));
    } else {
      setPayAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  const handleSaveDiscount = () => {
    const val = parseInt(discountInput || "0");
    setDiscount(val);
    setEditingDiscount(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm">💵</span>
            <h3 className="font-bold text-base text-slate-800">Uang Diterima</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Financial Breakdown */}
        <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 text-xs">
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Total Tagihan</span>
            <span className="font-bold">Rp {total.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-red-500 font-medium items-center">
            <button
              onClick={() => setEditingDiscount(true)}
              className="flex items-center gap-1 text-red-500 hover:underline font-semibold"
            >
              Diskon <Edit2 className="w-3 h-3" />
            </button>
            <span>- Rp {discount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-bold text-blue-600 text-sm pt-2 border-t border-slate-200">
            <span>Total Akhir</span>
            <span className="text-base">Rp {finalTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-slate-700 font-semibold pt-1">
            <span>Bayar</span>
            <span className={`font-bold ${isInsufficient && currentPay > 0 ? "text-amber-600" : "text-slate-800"}`}>
              Rp {currentPay.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between font-bold text-emerald-600 text-sm pt-1">
            <span>Kembali</span>
            <span className={change > 0 ? "text-emerald-600 font-bold" : "text-slate-400"}>
              Rp {change.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Edit Diskon Popup Form */}
        {editingDiscount && (
          <div className="flex gap-2 items-center bg-red-50 p-2.5 rounded-xl border border-red-200">
            <span className="text-xs font-bold text-red-600">Ubah Diskon (Rp):</span>
            <input
              type="number"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              className="w-28 px-2 py-1 text-xs border rounded-lg font-bold"
            />
            <button
              onClick={handleSaveDiscount}
              className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
            >
              Simpan
            </button>
          </div>
        )}

        {/* Input Display Box */}
        <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-inner">
          <span className="text-slate-400 font-bold text-sm">Rp</span>
          <span className="font-bold text-xl text-slate-800">
            {currentPay.toLocaleString()}
          </span>
          <button onClick={() => setPayAmount("0")} className="text-slate-300 hover:text-slate-500 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tombol Preset & Uang Pas */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setPayAmount(finalTotal.toString())}
            className="py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-sm transition"
          >
            Uang Pas
          </button>
          {["20000", "50000", "100000"].map((nom) => (
            <button
              key={nom}
              onClick={() => setPayAmount(nom)}
              className="py-2.5 border border-blue-200 bg-blue-50/50 text-blue-700 font-bold rounded-xl text-xs hover:bg-blue-100 transition"
            >
              Rp {parseInt(nom).toLocaleString()}
            </button>
          ))}
        </div>

        {/* Keypad Numpad */}
        <div className="grid grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0"].map((num) => (
            <button
              key={num}
              onClick={() => handleNumpad(num)}
              className="py-3 bg-slate-100 font-bold rounded-xl text-slate-800 hover:bg-slate-200 active:bg-slate-300 text-base transition"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumpad("DEL")}
            className="py-3 bg-red-50 text-red-500 flex items-center justify-center rounded-xl hover:bg-red-100 active:bg-red-200 transition"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="w-1/3 py-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">
            Kembali
          </button>
          <button
            onClick={() => {
              if (isInsufficient) {
                alert(`Uang pembayaran kurang! Masih kurang Rp ${(finalTotal - currentPay).toLocaleString()}`);
                return;
              }
              onSuccess({
                discount,
                finalTotal,
                payAmount: currentPay,
                change,
              });
            }}
            disabled={currentPay === 0}
            className="w-2/3 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md disabled:opacity-50 transition"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}
