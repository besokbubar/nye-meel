import React from "react";
import { CheckCircle2, X, Share2, Printer } from "lucide-react";

export default function ReceiptModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-base text-slate-800">Transaksi Berhasil!</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-3 font-mono">
          <div className="text-center space-y-1">
            <h4 className="font-bold text-slate-800 text-base font-sans">KASIR WARUNG</h4>
            <p className="text-slate-500 font-sans text-[11px]">Jl. A Yani No. 13, Kota Langsa, Aceh</p>
            <p className="text-slate-400 font-sans text-[10px]">06/08/26, 09:49</p>
          </div>
          <div className="flex justify-between text-slate-400 pt-2 border-t border-dashed"><span>ID Transaksi</span><span>INV-060826-0002</span></div>
          <div className="space-y-2 pt-2 border-t border-dashed font-sans">
            <div><div className="flex justify-between font-bold text-slate-800"><span>Teh Kotak 300ml</span><span>Rp 18.000</span></div><span className="text-[11px] text-slate-400">4 x Rp 4.500</span></div>
            <div><div className="flex justify-between font-bold text-slate-800"><span>Magnum Blue</span><span>Rp 22.000</span></div><span className="text-[11px] text-slate-400">2 x Rp 11.000</span></div>
            <div><div className="flex justify-between font-bold text-slate-800"><span>Aqua 1.5L</span><span>Rp 18.000</span></div><span className="text-[11px] text-slate-400">1 x Rp 18.000</span></div>
          </div>
          <div className="space-y-1 pt-2 border-t border-dashed font-sans">
            <div className="flex justify-between text-slate-500"><span>Total Item: 7</span></div>
            <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>Rp 58.000</span></div>
            <div className="flex justify-between text-red-500"><span>Diskon</span><span>-Rp 3.500</span></div>
            <div className="flex justify-between font-bold text-slate-800 text-sm"><span>Total</span><span>Rp 54.500</span></div>
            <div className="flex justify-between text-slate-600"><span>Dibayar</span><span>Rp 100.000</span></div>
            <div className="flex justify-between font-bold text-blue-600"><span>Kembali</span><span>Rp 45.500</span></div>
          </div>
          <p className="text-center text-slate-400 text-[11px] pt-3 font-sans">Terima kasih telah berbelanja!</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => alert("Membuka WhatsApp...")} className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100"><Share2 className="w-4 h-4" /> Kirim WA</button>
          <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100"><Printer className="w-4 h-4" /> Cetak</button>
        </div>
        <button onClick={onClose} className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md">Tutup</button>
      </div>
    </div>
  );
}
