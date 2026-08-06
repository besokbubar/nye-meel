import React, { useState } from "react";
import { Plus, Minus, Trash2, Search, ShoppingCart, QrCode, X, Check, Camera, CheckCircle2 } from "lucide-react";
import PaymentModal from "./PaymentModal";
import ReceiptModal from "./ReceiptModal";

export default function KasirTab({ catalog = [], storeInfo, items = [], setItems, onTransactionSuccess }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedTransaction, setCompletedTransaction] = useState(null);
  const [scanMessage, setScanMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const filteredCatalog = catalog.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (prod.barcode && prod.barcode.includes(searchQuery))
  );

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, buyPrice: product.buyPrice || 0, qty: 1 }];
    });

    triggerToast(`🛒 ${product.name} ditambah ke keranjang!`);
  };

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };

  const removeItem = (id, name) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    triggerToast(`🗑️ ${name || 'Item'} dihapus!`);
  };

  const handleClearCart = () => {
    setItems([]);
    triggerToast("✨ Keranjang dikosongkan!");
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);

  const handleSimulatedScan = (product) => {
    addToCart(product);
    setScanMessage(`Berhasil scan: ${product.name}`);
    setTimeout(() => setScanMessage(""), 2000);
  };

  return (
    <div className="space-y-4 relative">
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-[#FFC72C] px-4 py-3 rounded-2xl text-xs font-extrabold shadow-2xl flex items-center gap-2.5 border-2 border-[#FFC72C]/40 animate-in slide-in-from-top-4 backdrop-blur-md">
          <div className="w-5 h-5 bg-[#FFC72C] text-slate-900 rounded-full flex items-center justify-center font-black">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search Bar & Plus (+) Button */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari barang atau scan..."
            className="w-full bg-amber-50/50 pl-9 pr-8 py-2.5 rounded-xl text-sm border border-amber-200 focus:outline-[#FFC72C] font-medium text-slate-800"
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

        <button
          onClick={() => setShowAddModal(true)}
          className="p-2.5 bg-[#FFC72C] text-slate-900 rounded-xl hover:bg-amber-400 active:scale-95 transition shadow-sm font-bold shrink-0"
          title="Tambah Produk ke Keranjang"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Dynamic Search Dropdown */}
      {searchQuery && (
        <div className="bg-white border border-amber-200 rounded-2xl p-3 space-y-2 shadow-lg animate-in fade-in max-h-48 overflow-y-auto">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Hasil Pencarian:</p>
          {filteredCatalog.length > 0 ? (
            filteredCatalog.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  addToCart(prod);
                  setSearchQuery("");
                }}
                className="flex justify-between items-center p-2 hover:bg-amber-50 rounded-xl cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800">{prod.name}</p>
                  <p className="text-[10px] text-slate-400">Rp {prod.price.toLocaleString()}</p>
                </div>
                <button className="text-xs font-bold text-slate-900 bg-[#FFC72C] hover:bg-amber-400 px-3 py-1 rounded-xl shadow-sm active:scale-95 transition">
                  + Tambah
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-2 text-center">Barang tidak ditemukan</p>
          )}
        </div>
      )}

      {/* Cart Item List */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">Keranjang</h2>
        {items.length > 0 && (
          <button onClick={handleClearCart} className="text-xs text-red-500 font-semibold hover:underline">
            Hapus Semua
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{item.qty} x Rp {item.price.toLocaleString()}</p>
              <p className="font-extrabold text-amber-700 text-sm mt-1">Rp {(item.price * item.qty).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => removeItem(item.id, item.name)} className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg">
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

        {items.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 space-y-2">
            <ShoppingCart className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">Keranjang masih kosong</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs text-slate-900 font-bold bg-[#FFC72C] px-3.5 py-1.5 rounded-xl hover:bg-amber-400 shadow-sm"
            >
              + Pilih Produk
            </button>
          </div>
        )}
      </div>

      {/* Floating QR Button */}
      <div className="fixed bottom-36 right-4 max-w-md z-10">
        <button
          onClick={() => setShowScanModal(true)}
          className="bg-[#FFC72C] text-slate-900 p-4 rounded-2xl shadow-xl hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center border-2 border-white font-bold"
        >
          <QrCode className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Pilih Produk (+) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-slate-900 font-bold rounded-xl"><Plus className="w-5 h-5" /></span>
                <h3 className="font-bold text-base text-slate-800">Pilih Produk ke Keranjang</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {catalog.map((prod) => (
                <div
                  key={prod.id}
                  className="flex justify-between items-center p-3 border border-slate-100 rounded-2xl hover:border-amber-400 transition"
                >
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{prod.name}</h4>
                    <p className="text-xs text-amber-700 font-extrabold mt-0.5">Rp {prod.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className="flex items-center gap-1 bg-[#FFC72C] text-slate-900 px-3.5 py-1.5 rounded-xl text-xs font-extrabold hover:bg-amber-400 active:scale-90 transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah
                  </button>
                </div>
              ))}

              {catalog.length === 0 && (
                <p className="text-center text-xs text-slate-400 py-8">Belum ada daftar produk. Tambahkan barang di menu <strong>Barang</strong>.</p>
              )}
            </div>

            <button
              onClick={() => setShowAddModal(false)}
              className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 mt-2"
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* Modal Scanner Kamera */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in zoom-in-95">
          <div className="bg-slate-900 text-white w-full max-w-md rounded-3xl p-5 space-y-4 text-center relative border border-slate-700 shadow-2xl">
            <button
              onClick={() => setShowScanModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-bold text-lg flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-[#FFC72C]" /> Scanner Barcode Kamera
            </h3>

            <div className="w-full h-44 bg-slate-950 rounded-2xl relative flex items-center justify-center border-2 border-dashed border-[#FFC72C]/50 overflow-hidden">
              <div className="w-32 h-32 border-2 border-[#FFC72C] rounded-xl animate-pulse flex items-center justify-center">
                <span className="text-[10px] text-[#FFC72C] font-mono font-bold">SCANNING...</span>
              </div>
              {scanMessage && (
                <div className="absolute bottom-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 animate-bounce">
                  <Check className="w-3.5 h-3.5" /> {scanMessage}
                </div>
              )}
            </div>

            <div className="space-y-2 text-left">
              <p className="text-[11px] font-bold text-slate-400">Klik Produk untuk Tes Scan Barcode:</p>
              <div className="grid grid-cols-2 gap-2">
                {catalog.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleSimulatedScan(prod)}
                    className="p-2 bg-slate-800 hover:bg-amber-900/40 border border-slate-700 rounded-xl text-left transition"
                  >
                    <p className="text-xs font-bold text-white truncate">{prod.name}</p>
                    <p className="text-[10px] text-[#FFC72C] font-mono">{prod.barcode || "No Barcode"}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowScanModal(false)}
              className="w-full py-3 bg-[#FFC72C] text-slate-900 rounded-xl font-bold text-xs hover:bg-amber-400 shadow-md transition"
            >
              Kembali ke Kasir
            </button>
          </div>
        </div>
      )}

      {/* Bottom Bar Payment */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto p-3.5 bg-white border-t border-slate-200 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 bg-amber-100 text-slate-900 font-bold rounded-xl">
            <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{totalCount}</span>
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Total Tagihan</p>
            <p className="font-extrabold text-amber-700 text-base">Rp {total.toLocaleString()}</p>
          </div>
        </div>
        <button
          onClick={() => setShowPayment(true)}
          disabled={items.length === 0}
          className="bg-[#FFC72C] text-slate-900 font-extrabold px-7 py-2.5 rounded-xl hover:bg-amber-400 disabled:opacity-50 transition shadow-sm"
        >
          Bayar
        </button>
      </div>

      {showPayment && (
        <PaymentModal
          total={total}
          onClose={() => setShowPayment(false)}
          onSuccess={(paymentData) => {
            const newTransaction = {
              id: Date.now(),
              date: new Date(),
              items: [...items],
              total,
              discount: paymentData.discount,
              finalTotal: paymentData.finalTotal,
              payAmount: paymentData.payAmount,
              isDebt: paymentData.isDebt,
              debtAmount: paymentData.debtAmount,
              changeAmount: paymentData.changeAmount,
            };

            setCompletedTransaction(newTransaction);

            if (onTransactionSuccess) {
              onTransactionSuccess(newTransaction);
            }

            setShowPayment(false);
            setShowReceipt(true);
            triggerToast("✅ Transaksi sukses & masuk ke Laporan!");
          }}
        />
      )}

      {showReceipt && completedTransaction && (
        <ReceiptModal transaction={completedTransaction} storeInfo={storeInfo} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
}
