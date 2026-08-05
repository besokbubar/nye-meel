import React, { useState, useRef } from "react";
import { Search, Plus, QrCode, Trash2, X, ChevronLeft, ChevronRight, Camera, FolderPlus, Edit2, AlertTriangle, CheckCircle } from "lucide-react";

export default function BarangTab() {
  // 1. Master State Kategori (Singkron Real-time)
  const [categories, setCategories] = useState([
    "Semua",
    "Lainnya",
    "Makanan",
    "Minuman",
    "Obat-obatan",
    "Rokok",
    "Sembako",
  ]);

  // 2. Master State Barang
  const [items, setItems] = useState([
    { id: 1, name: "Ceker Ayam Pedas", barcode: "", price: 10000, buyPrice: 7000, discount: 0, category: "Makanan", stock: 100, minStock: 10, sku: "190420260155" },
    { id: 2, name: "Indomie Goreng", barcode: "899886620011", price: 3500, buyPrice: 2800, discount: 0, category: "Makanan", stock: 120, minStock: 20, sku: "190420260162" },
    { id: 3, name: "Aqua 1.5L", barcode: "899043057811", price: 18000, buyPrice: 14000, discount: 0, category: "Minuman", stock: 42, minStock: 10, sku: "190420260161" },
    { id: 4, name: "Bawang Goreng", barcode: "899214611863", price: 17500, buyPrice: 12000, discount: 0, category: "Lainnya", stock: 68, minStock: 5, sku: "190420260160" },
    { id: 5, name: "Kecap Manis ABC v3", barcode: "899080076078", price: 7500, buyPrice: 5500, discount: 0, category: "Sembako", stock: 96, minStock: 10, sku: "190420260159" },
  ]);

  // States Filter & Sorting
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");

  // States Modal Barang
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // States Modal Kategori
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [editingCatIndex, setEditingCatIndex] = useState(null);
  const [editCatValue, setEditCatValue] = useState("");

  // States Custom Pop-Up Confirm Delete & Toast
  const [confirmDeleteConfig, setConfirmDeleteConfig] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const [showScanner, setShowScanModal] = useState(false);
  const categoryContainerRef = useRef(null);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // LOGIKA FILTERING DINAMIS
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

  // LOGIKA SORTING DINAMIS
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "az") return a.name.localeCompare(b.name);
    if (sortBy === "harga_rendah") return a.price - b.price;
    if (sortBy === "harga_tinggi") return b.price - a.price;
    if (sortBy === "stok") return b.stock - a.stock;
    return b.id - a.id;
  });

  const scrollCategory = (direction) => {
    if (categoryContainerRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      categoryContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // --- HANDLER TAMBAH KATEGORI BARU ---
  const handleAddCategory = () => {
    const trimmed = newCatName.trim();
    if (!trimmed) return;

    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      showNotification(`Kategori '${trimmed}' sudah ada!`);
      return;
    }

    setCategories((prev) => [...prev, trimmed]);
    setSelectedCategory(trimmed);
    setNewCatName("");
    showNotification(`Kategori '${trimmed}' berhasil ditambahkan!`);
  };

  // --- HANDLER EDIT NAMA KATEGORI ---
  const handleUpdateCategory = (index) => {
    const trimmed = editCatValue.trim();
    if (!trimmed) return;

    const oldName = categories[index];

    setCategories((prev) => {
      const next = [...prev];
      next[index] = trimmed;
      return next;
    });

    // Update kategori pada semua barang yang menggunakan nama lama
    setItems((prev) =>
      prev.map((item) =>
        item.category === oldName ? { ...item, category: trimmed } : item
      )
    );

    if (selectedCategory === oldName) setSelectedCategory(trimmed);
    setEditingCatIndex(null);
    setEditCatValue("");
    showNotification(`Kategori diubah dari '${oldName}' menjadi '${trimmed}'`);
  };

  // --- HANDLER HAPUS KATEGORI (SEKIAN SERTA MENGHAPUS DARI MASTER STATE) ---
  const requestDeleteCategory = (catToDelete) => {
    if (catToDelete === "Semua") {
      showNotification("Kategori 'Semua' tidak dapat dihapus!");
      return;
    }

    setConfirmDeleteConfig({
      title: "Hapus Kategori",
      message: `Apakah Anda yakin ingin menghapus kategori '${catToDelete}'? Barang yang berada di kategori ini akan dipindahkan ke kategori 'Lainnya'.`,
      onConfirm: () => {
        // 1. Hapus dari state master categories
        setCategories((prev) => prev.filter((c) => c !== catToDelete));

        // 2. Pindahkan semua barang kategori ini ke 'Lainnya'
        setItems((prev) =>
          prev.map((item) =>
            item.category === catToDelete ? { ...item, category: "Lainnya" } : item
          )
        );

        // 3. Jika kategori yang dihapus sedang dipilih, kembalikan filter ke 'Semua'
        if (selectedCategory === catToDelete) {
          setSelectedCategory("Semua");
        }

        setConfirmDeleteConfig(null);
        showNotification(`Kategori '${catToDelete}' berhasil dihapus!`);
      },
    });
  };

  // --- HANDLERS BARANG ---
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  const handleOpenAddNew = () => {
    const validCatList = categories.filter((c) => c !== "Semua");
    const defaultCat = validCatList.includes(selectedCategory) ? selectedCategory : "Lainnya";

    const newItem = {
      id: Date.now(),
      name: "",
      barcode: "",
      sku: `${Date.now()}`.slice(-12),
      category: defaultCat,
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
    showNotification("Data barang berhasil disimpan!");
  };

  const requestDeleteItem = (id) => {
    setConfirmDeleteConfig({
      title: "Hapus Barang",
      message: "Apakah Anda yakin ingin menghapus barang ini dari inventaris?",
      onConfirm: () => {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setEditingItem(null);
        setConfirmDeleteConfig(null);
        showNotification("Barang berhasil dihapus!");
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-[#FFC72C] px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2 border border-[#FFC72C]/30 animate-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-[#FFC72C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari barang..."
            className="w-full bg-amber-50/50 pl-9 pr-10 py-2.5 rounded-xl text-sm border border-amber-200 focus:outline-[#FFC72C] font-medium text-slate-800"
          />
          <button
            onClick={() => setShowScanModal(true)}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-600 p-0.5"
            title="Scan Barcode"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Kategori Bar + Tombol Tambah Kategori */}
      <div className="space-y-2">
        <div className="relative flex items-center bg-amber-100/60 rounded-2xl p-1 border border-amber-200 gap-1">
          <button
            onClick={() => scrollCategory("left")}
            className="p-1 text-slate-500 hover:text-amber-700 hover:bg-white rounded-lg transition shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={categoryContainerRef}
            className="flex gap-2 overflow-x-auto py-1 px-1 scrollbar-none scroll-smooth w-full items-center"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#FFC72C] text-slate-900 shadow-md scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-amber-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCategory("right")}
            className="p-1 text-slate-500 hover:text-amber-700 hover:bg-white rounded-lg transition shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-2.5 py-1.5 bg-[#FFC72C] text-slate-900 hover:bg-amber-400 rounded-xl transition shrink-0 flex items-center gap-1 text-xs font-bold shadow-sm"
            title="Tambah / Kelola Kategori"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ Kategori</span>
          </button>
        </div>
      </div>

      {/* Counter & Sorting */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">
          Daftar {sortedItems.length} Barang
        </h2>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-xs text-slate-700 border rounded-xl px-2.5 py-1.5 bg-white font-bold focus:outline-[#FFC72C] cursor-pointer shadow-sm"
        >
          <option value="terbaru">Terbaru ∨</option>
          <option value="az">Nama (A-Z) ∨</option>
          <option value="harga_rendah">Harga Termurah ∨</option>
          <option value="harga_tinggi">Harga Termahal ∨</option>
          <option value="stok">Stok Terbanyak ∨</option>
        </select>
      </div>

      {/* Daftar Barang */}
      <div className="space-y-3">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenEdit(item)}
            className="bg-white p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center cursor-pointer hover:border-amber-400 transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-xl font-bold">
                📦
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                
                {item.barcode ? (
                  <p className="text-[11px] text-slate-400 font-mono">{item.barcode}</p>
                ) : (
                  <p className="text-[11px] text-slate-300 italic">Tanpa Barcode</p>
                )}

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-extrabold text-amber-700">
                    Rp {item.price.toLocaleString()}
                  </span>
                  <span className="bg-amber-100/70 text-slate-800 text-[10px] px-2.5 py-0.5 rounded-md font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/50 border border-amber-200 px-3.5 py-2 rounded-xl text-center">
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">Stok</p>
              <span className="text-xs font-extrabold text-slate-800">{item.stock}</span>
            </div>
          </div>
        ))}

        {sortedItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-amber-200 text-slate-400 text-xs space-y-2">
            <p>Tidak ada barang di kategori <strong>"{selectedCategory}"</strong></p>
            <button
              onClick={handleOpenAddNew}
              className="text-slate-900 font-bold bg-[#FFC72C] px-3.5 py-1.5 rounded-xl hover:bg-amber-400 shadow-sm"
            >
              + Tambah Barang Baru
            </button>
          </div>
        )}
      </div>

      {/* Floating Add (+ Barang Baru) Button */}
      <button
        onClick={handleOpenAddNew}
        className="fixed bottom-20 right-4 max-w-md bg-[#FFC72C] text-slate-900 p-4 rounded-2xl shadow-xl hover:bg-amber-400 active:scale-95 transition border-2 border-white font-bold"
        title="Tambah Barang Baru"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* MODAL KELOLA KATEGORI */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-slate-900 rounded-xl"><FolderPlus className="w-5 h-5 text-amber-700" /></span>
                <h3 className="font-bold text-base text-slate-800">Kelola Kategori</h3>
              </div>
              <button onClick={() => setShowCategoryModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Tambah Kategori */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Tambah Kategori Baru:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Contoh: Snack, Minuman, Chicken..."
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-[#FFC72C]"
                />
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-[#FFC72C] text-slate-900 text-xs font-bold rounded-xl hover:bg-amber-400 shadow-sm"
                >
                  + Tambah
                </button>
              </div>
            </div>

            {/* Daftar Kategori Real-Time */}
            <div className="space-y-2 pt-2 border-t">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Daftar Kategori Saat Ini ({categories.length}):</p>
              {categories.map((cat, idx) => (
                <div key={cat} className="flex justify-between items-center p-2.5 bg-slate-50 border rounded-xl text-xs">
                  {editingCatIndex === idx ? (
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <input
                        type="text"
                        value={editCatValue}
                        onChange={(e) => setEditCatValue(e.target.value)}
                        className="flex-1 border border-amber-300 rounded-lg px-2 py-1 text-xs font-bold"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdateCategory(idx)}
                        className="px-2 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[10px]"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingCatIndex(null)}
                        className="px-2 py-1 bg-slate-300 text-slate-700 font-bold rounded-lg text-[10px]"
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-bold text-slate-700">{cat}</span>
                      {cat !== "Semua" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingCatIndex(idx);
                              setEditCatValue(cat);
                            }}
                            className="p-1 text-slate-400 hover:text-amber-600"
                            title="Edit Nama Kategori"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => requestDeleteCategory(cat)}
                            className="p-1 text-slate-400 hover:text-red-600"
                            title="Hapus Kategori"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCategoryModal(false)}
              className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 mt-2"
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* MODAL EDIT / TAMBAH BARANG */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-100 text-slate-900 rounded-lg">📦</span>
                <h3 className="font-bold text-base text-slate-800">
                  {items.some((i) => i.id === editingItem.id) ? "Edit Barang" : "Tambah Barang Baru"}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {items.some((i) => i.id === editingItem.id) && (
                  <button
                    onClick={() => requestDeleteItem(editingItem.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Hapus Barang"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-600 p-1">
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
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 focus:outline-[#FFC72C]"
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
                      placeholder="Contoh: 899..."
                      className="w-full border border-slate-200 rounded-xl p-3 pr-8 font-medium focus:outline-[#FFC72C]"
                    />
                    <QrCode className="absolute right-2.5 top-3 w-4 h-4 text-amber-600" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Kategori *</label>
                {/* Dropdown Kategori Selalu Singkron dengan List Kategori Terbaru */}
                <select
                  value={formData.category || "Lainnya"}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white font-semibold text-slate-800 focus:outline-[#FFC72C]"
                >
                  {categories
                    .filter((c) => c !== "Semua")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
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
                      className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-bold focus:outline-[#FFC72C]"
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
                      className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-bold text-amber-700 focus:outline-[#FFC72C]"
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
                    className="w-full border border-slate-200 rounded-xl p-3 pl-9 font-semibold focus:outline-[#FFC72C]"
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
                      className="w-full border border-slate-200 rounded-xl p-3 pl-8 pr-10 font-bold focus:outline-[#FFC72C]"
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
                      className="w-full border border-slate-200 rounded-xl p-3 pl-8 pr-10 font-bold focus:outline-[#FFC72C]"
                    />
                    <span className="absolute right-3 text-slate-400 text-xs">pcs</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 bg-[#FFC72C] text-slate-900 rounded-xl font-bold hover:bg-amber-400 active:scale-95 shadow-md mt-4 transition"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* MODAL SCANNER BARCODE */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in zoom-in-95">
          <div className="bg-slate-900 text-white w-full max-w-md rounded-3xl p-5 space-y-4 text-center relative border border-slate-700">
            <button onClick={() => setShowScanModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-bold text-base flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" /> Scanner Barcode Kamera
            </h3>
            <div className="w-full h-40 bg-slate-950 rounded-2xl flex items-center justify-center border-2 border-dashed border-amber-500/50">
              <span className="text-xs text-amber-400 font-mono">ARAHKAN BARCODE DI SINI</span>
            </div>
            <button onClick={() => setShowScanModal(false)} className="w-full py-3 bg-[#FFC72C] text-slate-900 font-bold text-xs rounded-xl">
              Tutup Scanner
            </button>
          </div>
        </div>
      )}

      {/* MODAL CUSTOM CONFIRM DELETE */}
      {confirmDeleteConfig && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-800 text-lg">{confirmDeleteConfig.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {confirmDeleteConfig.message}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteConfig(null)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteConfig.onConfirm}
                className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
