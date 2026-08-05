import React from "react";
import { CheckCircle2, X, Share2, Printer } from "lucide-react";

export default function ReceiptModal({ transaction, onClose }) {
  const data = transaction || {
    items: [
      { name: "Teh Kotak 300ml", price: 4500, qty: 4 },
      { name: "Magnum Blue", price: 11000, qty: 2 },
      { name: "Aqua 1.5L", price: 18000, qty: 1 },
    ],
    total: 112000,
    discount: 3500,
    finalTotal: 108500,
    payAmount: 100000,
    isDebt: true,
    debtAmount: 8500,
    changeAmount: 0,
  };

  const handleSendWA = () => {
    const statusStr = data.isDebt ? `Hutang: Rp ${data.debtAmount.toLocaleString()}` : `Kembali: Rp ${data.changeAmount.toLocaleString()}`;
    const text = `*KASIR WARUNG*\nJl. A Yani No. 13, Kota Langsa, Aceh\nID: INV-020526-0002\n--------------------------\nTotal Akhir: Rp ${data.finalTotal.toLocaleString()}\nDibayar: Rp ${data.payAmount.toLocaleString()}\n${statusStr}\n\nTerima kasih telah berbelanja!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 shadow-2xl">
        {/* Header Title */}
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-base text-slate-800">Transaksi Berhasil!</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Receipt */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 text-xs space-y-3 font-sans shadow-inner">
          <div className="text-center space-y-0.5">
            <h4 className="font-extrabold text-slate-800 text-base tracking-wide">KASIR WARUNG</h4>
            <p className="text-slate-500 text-[11px]">Jl. A Yani No. 13, Kota Langsa, Aceh</p>
            <p className="text-slate-400 text-[10px]">02/05/26, 09:49</p>
          </div>

          <div className="flex justify-between text-slate-400 text-[11px] pt-2 border-t border-dashed border-slate-300">
            <span>ID Transaksi</span>
            <span>INV-020526-0002</span>
          </div>

          {/* List Barang */}
          <div className="space-y-2.5 pt-2 border-t border-dashed border-slate-300">
            {data.items.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{item.name}</span>
                  <span>Rp {(item.price * item.qty).toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {item.qty} x Rp {item.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Perhitungan Finansial */}
          <div className="space-y-1.5 pt-2 border-t border-dashed border-slate-300">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Total Item: {data.items.reduce((s, i) => s + i.qty, 0)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>Rp {data.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-500 font-medium">
              <span>Diskon</span>
              <span>-Rp {data.discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-extrabold text-slate-800 text-sm pt-1">
              <span>Total</span>
              <span>Rp {data.finalTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600 pt-1">
              <span>Dibayar</span>
              <span>Rp {data.payAmount.toLocaleString()}</span>
            </div>

            {/* BARIS UTAMA HUTANG / KEMBALI */}
            {data.isDebt ? (
              <div className="flex justify-between font-extrabold text-red-600 text-sm bg-red-50 p-2 rounded-xl border border-red-200 mt-1">
                <span>Hutang</span>
                <span>Rp {data.debtAmount.toLocaleString()}</span>
              </div>
            ) : (
              <div className="flex justify-between font-bold text-blue-600 text-sm pt-1">
                <span>Kembali</span>
                <span>Rp {data.changeAmount.toLocaleString()}</span>
              </div>
            )}
          </div>

          <p className="text-center text-slate-400 text-[11px] pt-3 font-medium">
            Terima kasih telah berbelanja!
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleSendWA}
            className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100"
          >
            <Share2 className="w-4 h-4" /> Kirim WA
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100"
          >
            <Printer className="w-4 h-4" /> Cetak
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
