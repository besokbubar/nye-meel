import React, { useState } from "react";
import { Plus, Minus, Trash2, Search, ShoppingCart, QrCode, X, Camera, Check } from "lucide-react";

export default function KasirTab() {
  const [catalog] = useState([
    { id: 101, name: "Teh Kotak 300ml", price: 4500, barcode: "899432901318" },
    { id: 102, name: "Magnum Blue", price: 11000, barcode: "899426878880" },
    { id: 103, name: "Aqua 1.5L", price: 18000, barcode: "899043057810" },
    { id: 104, name: "Bodrex Ekstra", price: 14000, barcode: "899080076078" },
  ]);

  const [items, setItems] = useState([
    { id: 101, name: "Teh Kotak 300ml", price: 4500, qty: 4 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);

  const filteredCatalog = catalog.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar & Tombol Plus (+) */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari barang atau scan..."
            className="w-full bg-slate-50 pl-9 pr-8 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-blue-500"
          />
        </div>

        {/* Tombol Plus (+) */}
        <button
          onClick={() => setShowAddModal(true)}
          className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Hasil Search Otomatis */}
      {searchQuery && (
        <div className="bg-white border rounded-2xl p-3 space-y-2 shadow-lg">
          {filteredCatalog.map((prod) => (
            <div key={prod.id} onClick={() => { addToCart(prod); setSearchQuery(""); }} className="flex justify-between items-center p-2 hover:bg-blue-50 rounded-xl cursor-pointer">
              <span className="text-xs font-bold">{prod.name}</span>
              <span className="text-xs text-blue-600 font-bold">+ Tambah</span>
            </div>
          ))}
        </div>
      )}

      {/* Tombol Floating Floating QR Scanner (Kanan Bawah) */}
      <div className="fixed bottom-36 right-4 z-10">
        <button
          onClick={() => setShowScanModal(true)}
          className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl hover:bg-blue-700 border-2 border-white"
        >
          <QrCode className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Scanner Kamera */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white w-full max-w-md rounded-3xl p-5 space-y-4 text-center">
            <h3 className="font-bold text-base flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-blue-400" /> Scanner Barcode Kamera
            </h3>
            <div className="w-full h-40 bg-slate-950 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-500">
              <span className="text-xs text-blue-400 font-mono">ARAHKAN BARCODE KE SINI</span>
            </div>
            <button onClick={() => setShowScanModal(false)} className="w-full py-3 bg-blue-600 rounded-xl font-bold text-xs">
              Tutup Scanner
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
