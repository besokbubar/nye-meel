import React, { useState } from "react";
import { Search, Plus, QrCode, Trash2, X } from "lucide-react";

export default function BarangTab() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [editingItem, setEditingItem] = useState(null);

  const items = [
    { id: 1, name: "Teh Kotak 300ml", barcode: "BCD-899432901318", price: 4500, buyPrice: 3000, category: "Minuman", stock: 50, minStock: 10, sku: "190420260156" },
    { id: 2, name: "Bodrex", barcode: "BCD-899426878880", price: 14000, buyPrice: 10000, category: "Obat-obatan", stock: 76, minStock: 15, sku: "190420260157" },
    { id: 3, name: "Dunhill Mild", barcode: "BCD-899043057810", price: 4500, buyPrice: 3500, category: "Rokok", stock: 73, minStock: 20, sku: "190420260158" },
    { id: 4, name: "Kecap Manis ABC v3", barcode: "BCD-899080076078", price: 7500, buyPrice: 5500, category: "Sembako", stock: 96, minStock: 10, sku: "190420260159" },
    { id: 5, name: "Bawang Goreng", barcode: "BCD-899214611863", price: 17500, buyPrice: 12000, category: "Lainnya", stock: 68, minStock: 5, sku: "190420260160" },
  ];

  const categories = ["Semua", "Lainnya", "Makanan", "Minuman", "Obat-obatan"];

  return (
    <div className="space-y-4">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Cari barang..." className="w-full bg-slate-50 pl-9 pr-10 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-blue-500" />
          <QrCode className="absolute right-3 top-3 w-4 h-4 text-slate-400 cursor-pointer" />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">Daftar 499 Barang</h2>
        <span className="text-xs text-slate-400 border rounded-lg px-2 py-1 bg-white">Terbaru ∨</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} onClick={() => setEditingItem(item)} className="bg-white p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center cursor-pointer hover:border-blue-300 transition shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-xl font-bold">📦</div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                <p className="text-[11px] text-slate-400">{item.barcode}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-blue-600">Rp {item.price.toLocaleString()}</span>
                  <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-md font-medium">{item.category}</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
              <span className="text-xs font-bold text-slate-700">{item.stock}</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setEditingItem(items[0])} className="fixed bottom-20 right-4 max-w-md bg-blue-600 text-white p-4 rounded-2xl shadow-xl hover:bg-blue-700">
        <Plus className="w-6 h-6" />
      </button>

      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">📦</span>
                <h3 className="font-bold text-base text-slate-800">Edit Barang</h3>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div><label className="block text-slate-600 font-bold mb-1">Nama Barang *</label><input type="text" defaultValue={editingItem.name} className="w-full border border-slate-200 rounded-xl p-3 font-semibold" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-slate-600 font-bold mb-1">SKU (Otomatis) *</label><input type="text" defaultValue={editingItem.sku} className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-500" /></div>
                <div><label className="block text-slate-600 font-bold mb-1">Barcode</label><div className="relative"><input type="text" defaultValue={editingItem.barcode.replace('BCD-', '')} className="w-full border border-slate-200 rounded-xl p-3 pr-8" /><QrCode className="absolute right-2.5 top-3 w-4 h-4 text-blue-600" /></div></div>
              </div>
              <div><label className="block text-slate-600 font-bold mb-1">Kategori</label><select defaultValue={editingItem.category} className="w-full border border-slate-200 rounded-xl p-3 bg-white"><option>Minuman</option><option>Makanan</option><option>Obat-obatan</option><option>Rokok</option><option>Sembako</option></select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-slate-600 font-bold mb-1">Harga Beli *</label><div className="relative flex items-center"><span className="absolute left-3 text-slate-400">Rp</span><input type="number" defaultValue={editingItem.buyPrice} className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-bold" /></div></div>
                <div><label className="block text-slate-600 font-bold mb-1">Harga Jual *</label><div className="relative flex items-center"><span className="absolute left-3 text-slate-400">Rp</span><input type="number" defaultValue={editingItem.price} className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-bold text-blue-600" /></div></div>
              </div>
              <div><label className="block text-slate-600 font-bold mb-1">Diskon (Nominal Rupiah)</label><div className="relative flex items-center"><span className="absolute left-3 text-slate-400">Rp</span><input type="number" defaultValue={0} className="w-full border border-slate-200 rounded-xl p-3 pl-9" /></div></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-slate-600 font-bold mb-1">Stok *</label><div className="relative flex items-center"><span className="absolute left-3 text-slate-400">#</span><input type="number" defaultValue={editingItem.stock} className="w-full border border-slate-200 rounded-xl p-3 pl-8 pr-10 font-bold" /><span className="absolute right-3 text-slate-400 text-xs">pcs</span></div></div>
                <div><label className="block text-slate-600 font-bold mb-1">Stok Min.</label><div className="relative flex items-center"><span className="absolute left-3 text-slate-400">#</span><input type="number" defaultValue={editingItem.minStock} className="w-full border border-slate-200 rounded-xl p-3 pl-8 pr-10 font-bold" /><span className="absolute right-3 text-slate-400 text-xs">pcs</span></div></div>
              </div>
            </div>

            <button onClick={() => setEditingItem(null)} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md mt-4">Simpan</button>
          </div>
        </div>
      )}
    </div>
  );
}
