import React, { useState, useEffect } from "react";
import { X, CheckCircle, Calculator, Wallet, CreditCard } from "lucide-react";

export default function PaymentModal({ total = 0, items = [], onClose, onSuccess }) {
  // Hitung total diskon bawaan dari seluruh barang yang ada di keranjang
  const initialProductDiscount = items.reduce(
    (sum, item) => sum + (item.discount || 0) * (item.qty || 1),
    0
  );

  const [discountInput, setDiscountInput] = useState(
    initialProductDiscount ? initialProductDiscount.toString() : "0"
  );
  const [payAmountInput, setPayAmountInput] = useState("");
  const [customerName, setCustomerName] = useState("");

  const discount = parseInt(discountInput || "0", 10);
  const finalTotal = Math.max(0, total - discount);
  const payAmount = parseInt(payAmountInput || "0", 10);

  const isDebt = payAmount < finalTotal;
  const debtAmount = isDebt ? finalTotal - payAmount : 0;
  const changeAmount = !isDebt ? payAmount - finalTotal : 0;

  // Helper format rupiah dengan titik
  const formatRupiah = (num) => {
    return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleQuickPay = (amount) => {
    setPayAmountInput(amount.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payAmountInput && payAmountInput !== 0) {
      alert("Masukkan nominal uang yang diterima!");
      return;
    }

    onSuccess({
      discount,
      finalTotal,
      payAmount,
      isDebt,
      debtAmount,
      changeAmount,
      customerName: customerName.trim() || "Pelanggan Kasir",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-100 text-slate-900 rounded-xl">
              <Wallet className="w-5 h-5 text-amber-800" />
            </span>
            <h3 className="font-extrabold text-base text-slate-800">Uang Diterima & Pembayaran</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Ringkasan Belanja */}
          <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 space-y-1.5">
            <div className="flex justify-between font-semibold text-slate-600">
              <span>Subtotal Belanja</span>
              <span>Rp {formatRupiah(total)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between font-semibold text-red-600">
                <span>Total Diskon Produk</span>
                <span>- Rp {formatRupiah(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-slate-900 text-base pt-1 border-t border-amber-200">
              <span>Total Tagihan</span>
              <span className="text-amber-700">Rp {formatRupiah(finalTotal)}</span>
            </div>
          </div>

          {/* Input Diskon Tambahan / Produk */}
          <div>
            <label className="block text-slate-600 font-bold mb-1">
              Diskon Transaksi (Nominal Rp)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400 font-bold">Rp</span>
              <input
                type="number"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
                placeholder="0"
                className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-bold text-slate-800 focus:outline-[#FFC72C]"
              />
            </div>
          </div>

          {/* Input Nominal Uang Diterima */}
          <div>
            <label className="block text-slate-600 font-bold mb-1">Uang Diterima *</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400 font-bold">Rp</span>
              <input
                type="number"
                value={payAmountInput}
                onChange={(e) => setPayAmountInput(e.target.value)}
                placeholder="0"
                className="w-full border-2 border-amber-300 rounded-xl p-3 pl-9 text-base font-black text-slate-900 focus:outline-[#FFC72C]"
                autoFocus
              />
            </div>

            {/* Tombol Cepat Nominal */}
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {[finalTotal, 10000, 20000, 50000, 100000].map((amt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPay(amt)}
                  className="py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 font-bold rounded-lg border border-slate-200 text-[11px] truncate transition"
                >
                  {amt === finalTotal ? "Uang Pas" : `Rp ${formatRupiah(amt)}`}
                </button>
              ))}
            </div>
          </div>

          {/* Jika Uang Kurang -> Input Nama Pelanggan untuk Catatan Hutang */}
          {isDebt && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl space-y-2 animate-in fade-in">
              <div className="flex justify-between items-center text-red-700 font-bold">
                <span>Status: Kurang Bayar (Hutang)</span>
                <span>Rp {formatRupiah(debtAmount)}</span>
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Nama Pelanggan (Untuk Catatan Hutang)</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Masukkan nama pelanggan..."
                  className="w-full border border-red-300 rounded-xl p-2.5 font-bold focus:outline-red-500 bg-white"
                />
              </div>
            </div>
          )}

          {/* Kembalian */}
          {!isDebt && payAmount > 0 && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex justify-between items-center text-emerald-800 font-black text-sm">
              <span>Uang Kembalian:</span>
              <span className="text-base">Rp {formatRupiah(changeAmount)}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FFC72C] text-slate-900 rounded-xl font-extrabold hover:bg-amber-400 active:scale-95 shadow-md transition text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> Konfirmasi Pembayaran
          </button>
        </form>
      </div>
    </div>
  );
}
