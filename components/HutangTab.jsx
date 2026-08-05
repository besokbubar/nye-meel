import React, { useState } from "react";
import { Search, UserPlus, Download, ChevronRight, Share2, FileText, Trash2, X } from "lucide-react";

export default function HutangTab() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    { id: 1, name: "Fitri Nugroho", address: "Jl. Perdamaian No 12, Langsa", phone: "08688101863", debt: 287000, note: "Gang Dua Belas" },
    { id: 2, name: "Siti Handoko", address: "Alamat pelanggan 64", phone: "08123456789", debt: 874414, note: "" },
    { id: 3, name: "Sri Ramadhan", address: "Alamat pelanggan 84", phone: "08234567890", debt: 194326, note: "" },
    { id: 4, name: "Dewi Suryadi", address: "Alamat pelanggan 46", phone: "08345678901", debt: 546850, note: "" },
  ];

  return (
    <div className="space-y-4">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Cari pelanggan..." className="w-full bg-slate-50 pl-9 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-blue-500" />
        </div>
        <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 hover:bg-blue-100"><UserPlus className="w-5 h-5" /></button>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl shadow-lg space-y-3">
        <div className="flex justify-between items-start">
          <div><p className="text-xs text-blue-100 font-medium">Total Hutang</p><h2 className="text-2xl font-bold mt-1">Rp 61.986.194</h2></div>
          <div className="bg-blue-500/40 border border-blue-300/30 rounded-xl px-3 py-1.5 text-center"><span className="text-lg font-bold block leading-none">100</span><span className="text-[10px] text-blue-100 font-medium">Pelanggan</span></div>
        </div>
        <button className="w-full py-2 bg-blue-500/30 hover:bg-blue-500/50 border border-blue-300/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"><Download className="w-4 h-4" /> Ekspor Rekap Hutang</button>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">Daftar 100 Pelanggan</h2>
        <span className="text-xs text-slate-400 border rounded-lg px-2 py-1 bg-white">Terbaru ∨</span>
      </div>

      <div className="space-y-3">
        {customers.map((c) => (
          <div key={c.id} onClick={() => setSelectedCustomer(c)} className="bg-white p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center cursor-pointer hover:border-blue-300 transition shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-sm">{c.name.charAt(0)}</div>
              <div><h3 className="font-bold text-slate-800 text-sm">{c.name}</h3><p className="text-[11px] text-slate-400">{c.address}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right"><p className="font-bold text-red-500 text-sm">Rp {c.debt.toLocaleString()}</p><p className="text-[10px] text-slate-400">Sisa Hutang</p></div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        ))}
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm">
          <div className="bg-slate-50 w-full max-w-md rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center border-b pb-3 bg-white -mx-5 -mt-5 p-5 rounded-t-3xl">
              <h3 className="font-bold text-base text-slate-800">Detail Pelanggan</h3>
              <div className="flex items-center gap-3">
                <button className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-lg">{selectedCustomer.name.charAt(0)}</div>
                <div><h3 className="font-bold text-slate-800 text-base">{selectedCustomer.name}</h3><p className="text-xs text-slate-400">{selectedCustomer.phone}</p></div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl space-y-2 text-xs">
                <div><p className="text-slate-400 font-medium">Alamat</p><p className="font-semibold text-slate-700">{selectedCustomer.address}</p></div>
                {selectedCustomer.note && <div><p className="text-slate-400 font-medium">Catatan</p><p className="font-semibold text-slate-700">{selectedCustomer.note}</p></div>}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-4 rounded-2xl shadow-md">
              <p className="text-xs text-red-100 font-medium">Total Hutang</p>
              <h2 className="text-2xl font-bold mt-1">Rp {selectedCustomer.debt.toLocaleString()}</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100"><Share2 className="w-4 h-4" /> Tagih via WA</button>
              <button className="flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100"><FileText className="w-4 h-4" /> Ekspor PDF</button>
            </div>

            <div className="flex justify-between items-center pt-2">
              <h4 className="font-bold text-slate-700 text-xs">Riwayat Transaksi</h4>
              <span className="text-[11px] text-slate-400">Semua ∨</span>
            </div>

            <div className="space-y-2">
              <div className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                <div><p className="font-bold text-slate-800 text-xs">Transaksi</p><p className="text-[10px] text-slate-400">19/04/26, 15:53</p></div>
                <span className="font-bold text-red-500 text-xs">+ Rp 24.000</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="py-3 border border-red-300 text-red-600 bg-white font-bold rounded-xl text-xs hover:bg-red-50">+ Tambah</button>
              <button className="py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 shadow-md">💵 Bayar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
