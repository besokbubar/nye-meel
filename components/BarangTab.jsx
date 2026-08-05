import React, { useState } from "react";
import { Search, Plus, QrCode, Trash2, X } from "lucide-react";

export default function BarangTab() {
  // 1. State Master Daftar Barang (Bisa Di-edit/Ditambah/Dihapus)
  const [items, setItems] = useState([
    { id: 1, name: "Teh Kotak 300ml", barcode: "899432901318", price: 4500, buyPrice: 3000, discount: 0, category: "Minuman", stock: 50, minStock: 10, sku: "190420260156" },
    { id: 2, name: "Bodrex", barcode: "899426878880", price: 14000, buyPrice: 10000, discount: 0, category: "Obat-obatan", stock: 76, minStock: 15, sku: "190420260157" },
    { id: 3, name: "Dunhill Mild", barcode: "899043057810", price: 4500, buyPrice: 3500, discount: 0, category: "Rokok", stock: 73, minStock: 20, sku: "190420260158" },
    { id: 4, name: "Kecap Manis ABC v3", barcode: "899080076078", price: 7500, buyPrice: 5500, discount: 0, category: "Sembako", stock: 96, minStock: 10, sku: "190420260159" },
    { id: 5, name: "Bawang Goreng", barcode: "899214611863", price: 17500, buyPrice: 12000, discount: 0, category: "Lainnya", stock: 68, minStock: 5, sku: "190420260160" },
  ]);

  // 2. State Filter & Search
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // 3. State Form Edit/Tambah
  const [editingItem, setEditingItem] = useState(null); // Item yang sedang diedit/dibuat
  const [formData, setFormData] = useState({});

  const categories = ["Semua", "Lainnya", "Makanan", "Minuman", "Obat-obatan", "Rokok", "Sembako"];

  // FILTERING DYNAMIC
  const filteredItems = items.filter((item) => {
    const matchCategory =
      selectedCategory === "Semua" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcode.includes(searchQuery) ||
      item.sku.includes(searchQuery);

    return matchCategory && matchSearch;
  });

  // Buka Modal Edit
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  // Buka Modal Tambah Barang Baru
  const handleOpenAddNew = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      barcode: "",
      sku: `${Date.now()}`.slice(-12),
      category: "Lainnya",
      buyPrice: 0,
      price: 0,
      discount: 0,
      stock: 0,
      minStock: 5,
    };
    setEditingItem(newItem);
    setFormData(newItem);
  };

  // Simpan Perubahan (Save Edit / New)
  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Nama barang wajib diisi!");
      return;
    }

    setItems((prev) => {
      const exists = prev.some((i) => i.id === formData.id);
      if (exists) {
        return prev.map((i) => (i.id === formData.id ? { ...formData } : i));
      }
      return [formData, ...prev];
    });

    setEditingItem(null);
  };

  // Hapus Barang
  const handleDelete = (id) => {
    if (confirm("Apakah kamu yakin ingin menghapus barang ini?")) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, barcode, atau SKU..."
            className="w-full bg-slate-50 pl-9 pr-8 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-blue-500 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Kategori Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Title & Total Item Counter */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">
          Daftar {filteredItems.length} Barang
        </h2>
        <span className="text-xs text-slate-400 border rounded-lg px-2.5 py-1 bg-white">
          Terbaru ∨
        </span>
      </div>

      {/* Item List */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenEdit(item)}
            className="bg-white p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center cursor-pointer hover:border-blue-400 transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-xl font-bold">
                📦
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                <p className="text-[11px] text-slate-400 font-mono">BCD-{item.barcode}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-extrabold text-blue-600">
                    Rp {item.price.toLocaleString()}
                  </span>
                  <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-md font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
              <p className="text-[10px] text-slate-400 font-medium">Stok</p>
              <span className="text-xs font-extrabold text-slate-700">{item.stock}</span>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
            Tidak ada barang di kategori <strong>"{selectedCategory}"</strong>
          </div>
        )}
      </div>

      {/* Floating Add (+ Baru) Button */}
      <button
        onClick={handleOpenAddNew}
        className="fixed bottom-20 right-4 max-w-md bg-blue-600 text-white p-4 rounded-2xl shadow-xl hover:bg-blue-700 active:scale-95 transition"
        title="Tambah Barang Baru"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal Edit / Tambah Barang */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom shadow-2xl">
            {/* Header Modal */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">📦</span>
                <h3 className="font-bold text-base text-slate-800">
                  {items.some((i) => i.id === editingItem.id) ? "Edit Barang" : "Tambah Barang Baru"}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {items.some((i) => i.id === editingItem.id) && (
                  <button
                    onClick={() => handleDelete(editingItem.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Hapus Barang"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Fields Interaktif */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Nama Barang *</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama barang..."
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 focus:outline-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">SKU (Otomatis) *</label>
                  <input
                    type="text"
                    value={formData.sku || ""}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Barcode</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.barcode || ""}
                      onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                      placeholder="899..."
                      className="w-full border border-slate-200 rounded-xl p-3 pr-8 font-medium focus:outline-blue-500"
                    />
                    <QrCode className="absolute right-2.5 top-3 w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Kategori *</label>
                <select
                  value={formData.category || "Lainnya"}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white font-semibold text-slate-800 focus:outline-blue-500"
                >
                  <option value="Minuman">Minuman</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Obat-obatan">Obat-obatan</option>
                  <option value="Rokok">Rokok</option>
                  <option value="Sembako">Sembako</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Harga Beli *</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-semibold">Rp</span>
                    <input
                      type="number"
                      value={formData.buyPrice || 0}
                      onChange={(e) => setFormData({ ...formData, buyPrice: parseInt(e.target.value || "0") })}
                      className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-bold focus:outline-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Harga Jual *</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-semibold">Rp</span>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value || "0") })}
                      className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-bold text-blue-600 focus:outline-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Diskon (Nominal Rupiah)</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400 font-semibold">Rp</span>
                  <input
                    type="number"
                    value={formData.discount || 0}
                    onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value || "0") })}
                    className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-semibold focus:outline-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Stok *</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-bold">#</span>
                    <input
                      type="number"
                      value={formData.stock || 0}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value || "0") })}
                      className="w-full border border-slate-200 rounded-xl p-3 pl-8 pr-10 font-bold focus:outline-blue-500"
                    />
                    <span className="absolute right-3 text-slate-400 text-xs">pcs</span>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Stok Min.</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-bold">#</span>
                    <input
                      type="number"
                      value={formData.minStock || 0}
                      onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value || "0") })}
                      className="w-full border border-slate-200 rounded-xl p-3 pl-8 pr-10 font-bold focus:outline-blue-500"
                    />
                    <span className="absolute right-3 text-slate-400 text-xs">pcs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Simpan */}
            <button
              onClick={handleSave}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 shadow-md mt-4 transition"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
