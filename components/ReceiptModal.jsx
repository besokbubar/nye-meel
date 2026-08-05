import React from "react";
import { CheckCircle2, X, Share2, Printer } from "lucide-react";

export default function ReceiptModal({ transaction, onClose }) {
  if (!transaction) return null;

  const { items = [], total = 0, discount = 0, finalTotal = 0, payAmount = 0, isDebt = false, debtAmount = 0, changeAmount = 0 } = transaction;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-base text-slate-800">Transaksi Berhasil!</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-4 text-xs space-y-3 font-sans shadow-inner">
          <div className="text-center space-y-0.5">
            <h4 className="font-extrabold text-slate-800 text-base tracking-wide">KASIR WARUNG</h4>
            <p className="text-slate-500 text-[11px]">Jl. A Yani No. 13, Kota Langsa, Aceh</p>
            <p className="text-slate-400 text-[10px]">06/08/26, 09:49</p>
          </div>

          <div className="flex justify-between text-slate-400 text-[11px] pt-2 border-t border-dashed border-slate-300">
            <span>ID Transaksi</span>
            <span>INV-060826-0002</span>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-dashed border-slate-300">
            {items.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{item.name}</span>
                  <span>Rp {(item.price * item.qty).toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-slate-400">{item.qty} x Rp {item.price.toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-dashed border-slate-300">
            <div className="flex justify-between text-slate-500 font-medium"><span>Total Item: {items.reduce((s, i) => s + i.qty, 0)}</span></div>
            <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>Rp {total.toLocaleString()}</span></div>
            <div className="flex justify-between text-red-500 font-medium"><span>Diskon</span><span>-Rp {discount.toLocaleString()}</span></div>
            <div className="flex justify-between font-extrabold text-slate-800 text-sm pt-1"><span>Total</span><span>Rp {finalTotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-slate-600 pt-1"><span>Dibayar</span><span>Rp {payAmount.toLocaleString()}</span></div>

            {isDebt ? (
              <div className="flex justify-between font-extrabold text-red-600 text-sm bg-red-50 p-2 rounded-xl border border-red-200 mt-1">
                <span>Hutang</span>
                <span>Rp {debtAmount.toLocaleString()}</span>
              </div>
            ) : (
              <div className="flex justify-between font-extrabold text-amber-700 text-sm pt-1">
                <span>Kembali</span>
                <span>Rp {changeAmount.toLocaleString()}</span>
              </div>
            )}
          </div>

          <p className="text-center text-slate-400 text-[11px] pt-3 font-medium">Terima kasih telah berbelanja!</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => window.open(`https://wa.me/`, "_blank")} className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100">
            <Share2 className="w-4 h-4" /> Kirim WA
          </button>
          <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-2.5 bg-amber-50 text-slate-800 border border-amber-200 rounded-xl text-xs font-bold hover:bg-amber-100">
            <Printer className="w-4 h-4" /> Cetak
          </button>
        </div>

        <button onClick={onClose} className="w-full py-3 bg-[#FFC72C] text-slate-900 font-extrabold rounded-xl text-xs hover:bg-amber-400 shadow-md">
          Tutup
        </button>
      </div>
    </div>
  );
}
