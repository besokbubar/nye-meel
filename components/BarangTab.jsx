import React, { useState, useRef } from "react";
import { Search, Plus, QrCode, Trash2, X, ChevronLeft, ChevronRight, Camera, Check } from "lucide-react";

export default function BarangTab() {
  // 1. Master Data Barang dengan Kategori yang Tepat
  const [items, setItems] = useState([
    { id: 1, name: "Teh Kotak 300ml", barcode: "899432901318", price: 4500, buyPrice: 3000, discount: 0, category: "Minuman", stock: 50, minStock: 10, sku: "190420260156" },
    { id: 2, name: "Bodrex", barcode: "899426878880", price: 14000, buyPrice: 10000, discount: 0, category: "Obat-obatan", stock: 76, minStock: 15, sku: "190420260157" },
    { id: 3, name: "Dunhill Mild", barcode: "899043057810", price: 4500, buyPrice: 3500, discount: 0, category: "Rokok", stock: 73, minStock: 20, sku: "190420260158" },
    { id: 4, name: "Kecap Manis ABC v3", barcode: "899080076078", price: 7500, buyPrice: 5500, discount: 0, category: "Sembako", stock: 96, minStock: 10, sku: "190420260159" },
    { id: 5, name: "Bawang Goreng", barcode: "899214611863", price: 17500, buyPrice: 12000, discount: 0, category: "Lainnya", stock: 68, minStock: 5, sku: "190420260160" },
    { id: 6, name: "Aqua 1.5L", barcode: "899043057811", price: 18000, buyPrice: 14000, discount: 0, category: "Minuman", stock: 42, minStock: 10, sku: "190420260161" },
    { id: 7, name: "Indomie Goreng", barcode: "899886620011", price: 3500, buyPrice: 2800, discount: 0, category: "Makanan", stock: 120, minStock: 20, sku: "190420260162" },
  ]);

  // 2. States Filter, Sorting, Search, Modal
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("terbaru"); // terbaru, az, harga_rendah, harga_tinggi, stok
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [showScanner, setShowScanModal] = useState(false);

  const categoryContainerRef = useRef(null);
  const categories = ["Semua", "Lainnya", "Makanan", "Minuman", "Obat-obatan", "Rokok", "Sembako"];

  // 3. LOGIKA FILTER KATEGORI & PENCARIAN SANGAT AKURAT
  const filteredItems = items.filter((item) => {
    const matchCategory =
      selectedCategory === "Semua" ||
      item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcode.includes(searchQuery) ||
      item.sku.includes(searchQuery);

    return matchCategory && matchSearch;
  });

  // LOGIKA SORTING / URUTAN
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "az") return a.name.localeCompare(b.name);
    if (sortBy === "harga_rendah") return a.price - b.price;
    if (sortBy === "harga_tinggi") return b.price - a.price;
    if (sortBy === "stok") return b.stock - a.stock;
    return b.id - a.id; // terbaru
  });

  // Handle Scroll Panah Kategori
  const scrollCategory = (direction) => {
    if (categoryContainerRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      categoryContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Open Edit / Add Form
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  const handleOpenAddNew = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      barcode: "",
      sku: `${Date.now()}`.slice(-12),
      category: selectedCategory === "Semua" ? "Lainnya" : selectedCategory,
      buyPrice: 0,
      price: 0,
      discount: 0,
      stock: 0,
      minStock: 5,
    };
    setEditingItem(newItem);
    setFormData(newItem);
  };

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

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
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
            placeholder="Cari barang..."
            className="w-full bg-slate-50 pl-9 pr-10 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-blue-500 font-medium"
          />
          <button
            onClick={() => setShowScanModal(true)}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-blue-600 p-0.5"
            title="Scan Barcode"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Kategori Pills + Panah Navigation Bar */}
      <div className="relative flex items-center bg-slate-100/70 rounded-2xl p-1 border border-slate-200">
        <button
          onClick={() => scrollCategory("left")}
          className="p-1 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={categoryContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-1 scrollbar-none scroll-smooth w-full"
        >
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

        <button
          onClick={() => scrollCategory("right")}
          className="p-1 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Counter & Interaktif Dropdown Urutan */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">
          Daftar {sortedItems.length} Barang
        </h2>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-xs text-slate-600 border rounded-xl px-2.5 py-1.5 bg-white font-semibold focus:outline-blue-500 cursor-pointer shadow-sm"
        >
          <option value="terbaru">Terbaru ∨</option>
          <option value="az">Nama (A-Z) ∨</option>
          <option value="harga_rendah">Harga Termurah ∨</option>
          <option value="harga_tinggi">Harga Termahal ∨</option>
          <option value="stok">Stok Terbanyak ∨</option>
        </select>
      </div>

      {/* Daftar Produk Sesuai Kategori */}
      <div className="space-y-3">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenEdit(item)}
            className="bg-white p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center cursor-pointer hover:border-blue-400 transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xl font-bold">
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
              <span className="text-xs font-extrabold text-slate-700">{item.stock}</span>
            </div>
          </div>
        ))}

        {sortedItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs space-y-2">
            <p>Tidak ada barang di kategori <strong>"{selectedCategory}"</strong></p>
            <button
              onClick={handleOpenAddNew}
              className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-xl hover:bg-blue-100"
            >
              + Tambah Barang di Kategori Ini
            </button>
          </div>
        )}
      </div>

      {/* Floating Add (+ Baru) Button */}
      <button
        onClick={handleOpenAddNew}
        className="fixed bottom-20 right-4 max-w-md bg-blue-600 text-white p-4 rounded-2xl shadow-xl hover:bg-blue-700 active:scale-95 transition border-2 border-white"
        title="Tambah Barang Baru"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal Edit / Tambah Barang */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom shadow-2xl">
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

            <button
              onClick={handleSave}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 shadow-md mt-4 transition"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* Modal Scanner Barcode Kamera */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in zoom-in-95">
          <div className="bg-slate-900 text-white w-full max-w-md rounded-3xl p-5 space-y-4 text-center relative border border-slate-700">
            <button
              onClick={() => setShowScanModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-bold text-base flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-blue-400" /> Scanner Barcode Kamera
            </h3>
            <div className="w-full h-40 bg-slate-950 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-500/50">
              <span className="text-xs text-blue-400 font-mono">ARAHKAN BARCODE DI SINI</span>
            </div>
            <button
              onClick={() => setShowScanModal(false)}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-xs"
            >
              Tutup Scanner
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
