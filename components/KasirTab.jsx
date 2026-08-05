import React, { useState } from "react";
import { Plus, Minus, Trash2, Search, ShoppingCart, QrCode } from "lucide-react";

export default function KasirTab({ onCheckout }) {
  const [items, setItems] = useState([
    { id: 1, name: "Teh Kotak 300ml", price: 4500, qty: 4 },
    { id: 2, name: "Magnum Blue", price: 11000, qty: 2 },
    { id: 3, name: "Aqua 1.5L", price: 18000, qty: 1 },
  ]);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari barang..."
            className="w-full bg-slate-50 pl-9 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-blue-500"
          />
        </div>
        <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 hover:bg-blue-100">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">Keranjang</h2>
        <button onClick={() => setItems([])} className="text-xs text-red-500 font-semibold hover:underline">
          Hapus Semua
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{item.qty} x Rp {item.price.toLocaleString()}</p>
              <p className="font-bold text-blue-600 text-sm mt-1">Rp {(item.price * item.qty).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                <button onClick={() => updateQty(item.id, -1)} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-l-xl"><Minus className="w-3.5 h-3.5" /></button>
                <span className="px-3 text-xs font-bold text-slate-700">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-r-xl"><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-36 right-4 max-w-md">
        <button className="bg-blue-600 text-white p-3.5 rounded-2xl shadow-lg hover:bg-blue-700 transition">
          <QrCode className="w-6 h-6" />
        </button>
      </div>

      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto p-3.5 bg-white border-t border-slate-200 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{totalCount}</span>
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Total Tagihan</p>
            <p className="font-bold text-blue-600 text-base">Rp {total.toLocaleString()}</p>
          </div>
        </div>
        <button onClick={onCheckout} disabled={items.length === 0} className="bg-blue-600 text-white font-bold px-7 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition">
          Bayar
        </button>
      </div>
    </div>
  );
}
