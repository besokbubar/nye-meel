import React, { useState } from "react";
import { Search, UserPlus, Download, ChevronRight, Share2, FileText, Trash2, X, Plus, CheckCircle, AlertTriangle, Wallet } from "lucide-react";

export default function HutangTab() {
  // Master State Daftar Pelanggan
  const [customers, setCustomers] = useState([
    { id: 1, name: "Fitri Nugroho", address: "Jl. Perdamaian No 12, Langsa", phone: "08688101863", debt: 287000, note: "Gang Dua Belas", history: [{ id: 101, date: "06/08/26, 10:15", type: "Hutang", amount: 287000 }] },
    { id: 2, name: "Siti Handoko", address: "Alamat pelanggan 64", phone: "08123456789", debt: 874414, note: "", history: [{ id: 102, date: "05/08/26, 14:20", type: "Hutang", amount: 874414 }] },
    { id: 3, name: "Sri Ramadhan", address: "Alamat pelanggan 84", phone: "08234567890", debt: 194326, note: "", history: [{ id: 103, date: "04/08/26, 09:30", type: "Hutang", amount: 194326 }] },
    { id: 4, name: "Dewi Suryadi", address: "Alamat pelanggan 46", phone: "08345678901", debt: 546850, note: "", history: [{ id: 104, date: "03/08/26, 16:45", type: "Hutang", amount: 546850 }] },
  ]);

  // States Interaktif
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showAddDebtModal, setShowAddDebtModal] = useState(false);

  // Form Inputs
  const [newCustomerForm, setNewCustomerForm] = useState({ name: "", phone: "", address: "", note: "", debt: 0 });
  const [payAmountInput, setPayAmountInput] = useState("");
  const [addDebtInput, setAddDebtInput] = useState("");

  // Toast & Confirm Delete
  const [toastMessage, setToastMessage] = useState("");
  const [confirmDeleteConfig, setConfirmDeleteConfig] = useState(null);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Filter Pelanggan
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  // Perhitungan Finansial
  const totalDebt = customers.reduce((sum, c) => sum + c.debt, 0);

  // --- HANDLERS ---
  const handleAddCustomer = () => {
    if (!newCustomerForm.name.trim()) {
      alert("Nama pelanggan wajib diisi!");
      return;
    }

    const newCust = {
      id: Date.now(),
      name: newCustomerForm.name.trim(),
      phone: newCustomerForm.phone.trim() || "-",
      address: newCustomerForm.address.trim() || "-",
      note: newCustomerForm.note.trim(),
      debt: parseInt(newCustomerForm.debt || "0"),
      history: newCustomerForm.debt > 0 ? [{ id: Date.now(), date: "06/08/26, 10:30", type: "Hutang Awal", amount: parseInt(newCustomerForm.debt) }] : [],
    };

    setCustomers((prev) => [newCust, ...prev]);
    setShowAddCustomerModal(false);
    setNewCustomerForm({ name: "", phone: "", address: "", note: "", debt: 0 });
    showNotification(`Pelanggan '${newCust.name}' berhasil ditambahkan!`);
  };

  const handlePayDebt = () => {
    const payVal = parseInt(payAmountInput || "0");
    if (!payVal || payVal <= 0) return;

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === selectedCustomer.id) {
          const newDebt = Math.max(0, c.debt - payVal);
          const newHistory = [{ id: Date.now(), date: "06/08/26, 10:35", type: "Pembayaran", amount: -payVal }, ...c.history];
          const updatedCust = { ...c, debt: newDebt, history: newHistory };
          setSelectedCustomer(updatedCust);
          return updatedCust;
        }
        return c;
      })
    );

    setShowPayModal(false);
    setPayAmountInput("");
    showNotification(`Pembayaran Rp ${payVal.toLocaleString()} berhasil dicatat!`);
  };

  const handleAddDebt = () => {
    const debtVal = parseInt(addDebtInput || "0");
    if (!debtVal || debtVal <= 0) return;

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === selectedCustomer.id) {
          const newDebt = c.debt + debtVal;
          const newHistory = [{ id: Date.now(), date: "06/08/26, 10:36", type: "Hutang Tambahan", amount: debtVal }, ...c.history];
          const updatedCust = { ...c, debt: newDebt, history: newHistory };
          setSelectedCustomer(updatedCust);
          return updatedCust;
        }
        return c;
      })
    );

    setShowAddDebtModal(false);
    setAddDebtInput("");
    showNotification(`Hutang tambahan Rp ${debtVal.toLocaleString()} berhasil dicatat!`);
  };

  const handleDeleteCustomer = (id) => {
    setConfirmDeleteConfig({
      title: "Hapus Pelanggan",
      message: "Apakah Anda yakin ingin menghapus data pelanggan ini?",
      onConfirm: () => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
        setSelectedCustomer(null);
        setConfirmDeleteConfig(null);
        showNotification("Data pelanggan berhasil dihapus!");
      },
    });
  };

  const handleSendWA = (cust) => {
    const msg = `Halo Kak ${cust.name}, pengingat dari KASIR WARUNG. Sisa hutang Anda saat ini adalah *Rp ${cust.debt.toLocaleString()}*. Terima kasih!`;
    window.open(`https://wa.me/${cust.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-[#FFC72C] px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2 border border-[#FFC72C]/30 animate-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-[#FFC72C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search Header & Tambah Pelanggan Button */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pelanggan..."
            className="w-full bg-amber-50/50 pl-9 pr-4 py-2.5 rounded-xl text-sm border border-amber-200 focus:outline-[#FFC72C] font-medium text-slate-800"
          />
        </div>
        <button
          onClick={() => setShowAddCustomerModal(true)}
          className="p-2.5 bg-[#FFC72C] text-slate-900 rounded-xl hover:bg-amber-400 font-bold transition shadow-sm"
          title="Tambah Pelanggan Baru"
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>

      {/* CARD BANNER UTAMA TOTAL HUTANG (SEKARANG KUNING #FFC72C) */}
      <div className="bg-[#FFC72C] text-slate-900 p-5 rounded-3xl shadow-lg space-y-4 border-2 border-amber-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-amber-900 font-bold uppercase tracking-wide">Total Hutang Keseluruhan</p>
            <h2 className="text-2xl font-black mt-1 text-slate-900">
              Rp {totalDebt.toLocaleString()}
            </h2>
          </div>
          <div className="bg-slate-900/10 border border-slate-900/20 rounded-2xl px-3.5 py-1.5 text-center">
            <span className="text-base font-black block leading-none text-slate-900">{customers.length}</span>
            <span className="text-[10px] text-amber-900 font-extrabold">Pelanggan</span>
          </div>
        </div>

        <button
          onClick={() => {
            window.print();
            showNotification("Mencetak Rekap Hutang Pelanggan...");
          }}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-[#FFC72C] rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition"
        >
          <Download className="w-4 h-4" /> Ekspor Rekap Hutang
        </button>
      </div>

      {/* Header List */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-700 text-base">
          Daftar {filteredCustomers.length} Pelanggan
        </h2>
        <span className="text-xs text-slate-500 border border-amber-200 rounded-xl px-2.5 py-1 bg-amber-50/50 font-semibold">
          Terbaru
        </span>
      </div>

      {/* Daftar Card Pelanggan */}
      <div className="space-y-3">
        {filteredCustomers.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCustomer(c)}
            className="bg-white p-3.5 rounded-2xl border border-slate-100 flex justify-between items-center cursor-pointer hover:border-amber-400 transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFC72C] text-slate-900 font-black rounded-full flex items-center justify-center text-sm shadow-sm">
                {c.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{c.name}</h3>
                <p className="text-[11px] text-slate-400">{c.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="font-extrabold text-red-600 text-sm">Rp {c.debt.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 font-medium">Sisa Hutang</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-amber-200 text-slate-400 text-xs">
            Pelanggan tidak ditemukan.
          </div>
        )}
      </div>

      {/* MODAL 1: DETAIL PELANGGAN */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-50 w-full max-w-md rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3 bg-white -mx-5 -mt-5 p-5 rounded-t-3xl">
              <h3 className="font-bold text-base text-slate-800">Detail Pelanggan</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Hapus Pelanggan"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl space-y-3 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFC72C] text-slate-900 font-black rounded-full flex items-center justify-center text-lg">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{selectedCustomer.name}</h3>
                  <p className="text-xs text-slate-400">{selectedCustomer.phone}</p>
                </div>
              </div>

              <div className="bg-amber-50/50 p-3 rounded-xl space-y-1.5 text-xs border border-amber-200/60">
                <div><p className="text-slate-400 font-medium">Alamat</p><p className="font-semibold text-slate-700">{selectedCustomer.address}</p></div>
                {selectedCustomer.note && <div><p className="text-slate-400 font-medium">Catatan</p><p className="font-semibold text-slate-700">{selectedCustomer.note}</p></div>}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-4 rounded-2xl shadow-md">
              <p className="text-xs text-red-100 font-medium">Total Sisa Hutang</p>
              <h2 className="text-2xl font-black mt-0.5">Rp {selectedCustomer.debt.toLocaleString()}</h2>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSendWA(selectedCustomer)}
                className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100"
              >
                <Share2 className="w-4 h-4" /> Tagih via WA
              </button>
              <button
                onClick={() => {
                  window.print();
                  showNotification("Mencetak Laporan PDF Pelanggan...");
                }}
                className="flex items-center justify-center gap-2 py-2.5 bg-amber-100 text-slate-800 border border-amber-300 rounded-xl text-xs font-bold hover:bg-amber-200"
              >
                <FileText className="w-4 h-4" /> Ekspor PDF
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-700 text-xs">Riwayat Transaksi & Pembayaran</h4>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {selectedCustomer.history.map((h) => (
                  <div key={h.id} className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{h.type}</p>
                      <p className="text-[10px] text-slate-400">{h.date}</p>
                    </div>
                    <span className={`font-extrabold ${h.amount < 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {h.amount < 0 ? `- Rp ${Math.abs(h.amount).toLocaleString()}` : `+ Rp ${h.amount.toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowAddDebtModal(true)}
                className="py-3 border border-red-300 text-red-600 bg-white font-bold rounded-xl text-xs hover:bg-red-50"
              >
                + Tambah Hutang
              </button>
              <button
                onClick={() => setShowPayModal(true)}
                className="py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 shadow-md"
              >
                💵 Bayar Hutang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: TAMBAH PELANGGAN BARU */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-slate-900 rounded-xl"><UserPlus className="w-5 h-5" /></span>
                <h3 className="font-bold text-base text-slate-800">Tambah Pelanggan Baru</h3>
              </div>
              <button onClick={() => setShowAddCustomerModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Nama Pelanggan *</label>
                <input
                  type="text"
                  value={newCustomerForm.name}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })}
                  placeholder="Masukkan nama lengkap..."
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold focus:outline-[#FFC72C]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">No. WhatsApp / HP</label>
                <input
                  type="text"
                  value={newCustomerForm.phone}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })}
                  placeholder="0812345..."
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold focus:outline-[#FFC72C]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Alamat Singkat</label>
                <input
                  type="text"
                  value={newCustomerForm.address}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, address: e.target.value })}
                  placeholder="Alamat atau lokasi..."
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold focus:outline-[#FFC72C]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Nominal Hutang Awal (Rp)</label>
                <input
                  type="number"
                  value={newCustomerForm.debt}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, debt: e.target.value })}
                  placeholder="0"
                  className="w-full border border-slate-200 rounded-xl p-3 font-bold text-red-600 focus:outline-[#FFC72C]"
                />
              </div>
            </div>

            <button
              onClick={handleAddCustomer}
              className="w-full py-3 bg-[#FFC72C] text-slate-900 rounded-xl font-bold hover:bg-amber-400 shadow-md mt-2"
            >
              Simpan Pelanggan
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: BAYAR HUTANG */}
      {showPayModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 space-y-4 text-center shadow-2xl">
            <h3 className="font-extrabold text-slate-800 text-base">Bayar Hutang</h3>
            <p className="text-xs text-slate-500">Sisa Hutang: <strong>Rp {selectedCustomer.debt.toLocaleString()}</strong></p>

            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-400 font-bold text-xs">Rp</span>
              <input
                type="number"
                value={payAmountInput}
                onChange={(e) => setPayAmountInput(e.target.value)}
                placeholder="Jumlah bayar..."
                className="w-full border border-emerald-300 rounded-xl p-3 pl-8 text-sm font-bold text-emerald-600 focus:outline-emerald-500"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowPayModal(false)} className="py-2.5 bg-slate-100 font-bold text-xs rounded-xl">Batal</button>
              <button onClick={handlePayDebt} className="py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md">Konfirmasi</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: TAMBAH HUTANG */}
      {showAddDebtModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 space-y-4 text-center shadow-2xl">
            <h3 className="font-extrabold text-slate-800 text-base">Tambah Catatan Hutang</h3>

            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-400 font-bold text-xs">Rp</span>
              <input
                type="number"
                value={addDebtInput}
                onChange={(e) => setAddDebtInput(e.target.value)}
                placeholder="Nominal hutang..."
                className="w-full border border-red-300 rounded-xl p-3 pl-8 text-sm font-bold text-red-600 focus:outline-red-500"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowAddDebtModal(false)} className="py-2.5 bg-slate-100 font-bold text-xs rounded-xl">Batal</button>
              <button onClick={handleAddDebt} className="py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl shadow-md">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CUSTOM CONFIRM DELETE */}
      {confirmDeleteConfig && (
        <div className="fixed inset-0 bg-black/70 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg">{confirmDeleteConfig.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{confirmDeleteConfig.message}</p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => setConfirmDeleteConfig(null)} className="py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl">Batal</button>
              <button onClick={confirmDeleteConfig.onConfirm} className="py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl shadow-md">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
