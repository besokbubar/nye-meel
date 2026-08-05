import React, { useState } from "react";
import { Plus, Minus, Trash2, Search, ShoppingCart, QrCode, X, Check, Camera } from "lucide-react";
import PaymentModal from "./PaymentModal";
import ReceiptModal from "./ReceiptModal";

export default function KasirTab() {
  const [catalog] = useState([
    { id: 101, name: "Teh Kotak 300ml", price: 4500, barcode: "899432901318" },
    { id: 102, name: "Magnum Blue", price: 11000, barcode: "899426878880" },
    { id: 103, name: "Aqua 1.5L", price: 18000, barcode: "899043057810" },
  ]);

  const [items, setItems] = useState([
    { id: 101, name: "Teh Kotak 300ml", price: 4500, qty: 4 },
    { id: 102, name: "Magnum Blue", price: 11000, qty: 2 },
    { id: 103, name: "Aqua 1.5L", price: 18000, qty: 1 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedTransaction, setCompletedTransaction] = useState(null);

  const filteredCatalog = catalog.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="space-y-4">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari barang atau scan..."
            className="w-full bg-amber-50/50 pl-9 pr-8 py-2.5 rounded-xl text-sm border border-amber-200 focus:outline-[#FFC72C] font-medium"
          />
        </div>
        <button onClick={() => setShowAddModal(true)} className="p-2.5 bg-[#FFC72C] text-slate-900 rounded-xl hover:bg-amber-400 font-bold transition shadow-sm">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {searchQuery && (
        <div className="bg-white border rounded-2xl p-3 space-y-2 shadow-lg animate-in fade-in max-h-48 overflow-y-auto">
          {filteredCatalog.map((prod) => (
            <div key={prod.id} onClick={() => { addToCart(prod); setSearchQuery(""); }} className="flex justify-between items-center p-2 hover:bg-amber-50 rounded-xl cursor-pointer">
              <span className="text-xs font-bold text-slate-800">{prod.name}</span>
              <span className="text-xs text-amber-700 font-bold bg-amber-100 px-2.5 py-1 rounded-lg">+ Tambah</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">Keranjang</h2>
        {items.length > 0 && (
          <button onClick={() => setItems([])} className="text-xs text-red-500 font-semibold hover:underline">Hapus Semua</button>
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
              <button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                <button onClick={() => updateQty(item.id, -1)} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-l-xl"><Minus className="w-3.5 h-3.5" /></button>
                <span className="px-3 text-xs font-bold text-slate-700">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-r-xl"><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-36 right-4 z-10">
        <button onClick={() => setShowScanModal(true)} className="bg-[#FFC72C] text-slate-900 p-4 rounded-2xl shadow-xl hover:bg-amber-400 transition border-2 border-white">
          <QrCode className="w-6 h-6" />
        </button>
      </div>

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
        <button onClick={() => setShowPayment(true)} disabled={items.length === 0} className="bg-[#FFC72C] text-slate-900 font-extrabold px-7 py-2.5 rounded-xl hover:bg-amber-400 disabled:opacity-50 transition shadow-sm">
          Bayar
        </button>
      </div>

      {showPayment && (
        <PaymentModal
          total={total}
          onClose={() => setShowPayment(false)}
          onSuccess={(paymentData) => {
            setCompletedTransaction({
              items: [...items],
              total,
              discount: paymentData.discount,
              finalTotal: paymentData.finalTotal,
              payAmount: paymentData.payAmount,
              isDebt: paymentData.isDebt,
              debtAmount: paymentData.debtAmount,
              changeAmount: paymentData.changeAmount,
            });
            setShowPayment(false);
            setShowReceipt(true);
            setItems([]);
          }}
        />
      )}

      {showReceipt && completedTransaction && (
        <ReceiptModal transaction={completedTransaction} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
}
