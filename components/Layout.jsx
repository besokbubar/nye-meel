import React, { useState } from "react";
import { Store, Package, BookOpen, BarChart3, Menu, X, Settings, User, HelpCircle, LogOut, Printer, CheckCircle, Save, Phone, MapPin, MessageSquare, AlertTriangle } from "lucide-react";

export default function Layout({ children, activeTab, setActiveTab }) {
  const [showMenu, setShowMenu] = useState(false);

  // Master Data Identitas Toko (Bisa Di-edit via Pengaturan Toko)
  const [storeInfo, setStoreInfo] = useState({
    name: "Kasir Warung",
    subtitle: "Toko Nyemeel Utama",
    phone: "081234567890",
    address: "Jl. A Yani No. 13, Kota Langsa, Aceh",
    receiptFooter: "Terima kasih telah berbelanja!",
  });

  // State Pengaturan Struk & Printer
  const [printerSettings, setPrinterSettings] = useState({
    paperSize: "58mm",
    autoPrint: true,
    showAddress: true,
    showFooter: true,
  });

  // Modal States
  const [showStoreSettingsModal, setShowStoreSettingsModal] = useState(false);
  const [showPrinterSettingsModal, setShowPrinterSettingsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Forms State
  const [tempStoreForm, setTempStoreForm] = useState({ ...storeInfo });
  const [toastMessage, setToastMessage] = useState("");

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSaveStoreInfo = () => {
    setStoreInfo({ ...tempStoreForm });
    setShowStoreSettingsModal(false);
    showNotification("Identitas Toko berhasil diperbarui!");
  };

  const handleSavePrinterSettings = () => {
    setShowPrinterSettingsModal(false);
    showNotification("Pengaturan Struk & Printer disimpan!");
  };

  const tabs = [
    { id: "kasir", label: "Kasir", icon: Store },
    { id: "barang", label: "Barang", icon: Package },
    { id: "hutang", label: "Hutang", icon: BookOpen },
    { id: "laporan", label: "Laporan", icon: BarChart3 },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24 relative font-sans text-slate-800 shadow-xl border-x border-slate-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[80] bg-slate-900 text-[#FFC72C] px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2 border border-[#FFC72C]/30 animate-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-[#FFC72C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Utama Aplikasi */}
      <header className="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#FFC72C] rounded-xl text-slate-900 font-bold shadow-sm">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-800 leading-none">{storeInfo.name}</h1>
            <p className="text-[10px] text-slate-400 mt-0.5">{storeInfo.subtitle}</p>
          </div>
        </div>
        <button
          onClick={() => setShowMenu(true)}
          className="p-2 rounded-xl text-slate-700 hover:bg-amber-50 transition"
          title="Buka Menu Pengaturan"
        >
          <Menu className="w-6 h-6 text-slate-800" />
        </button>
      </header>

      <main className="p-4">{children}</main>

      {/* DRAWER SIDEBAR MENU PENGATURAN (AKTIF SEPENUHNYA) */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-4/5 max-w-xs h-full p-5 space-y-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right">
            <div className="space-y-5">
              {/* Profile Bar */}
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFC72C] text-slate-900 font-extrabold rounded-2xl flex items-center justify-center shadow-sm">
                    {storeInfo.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">{storeInfo.name}</h3>
                    <p className="text-[11px] text-slate-400">v1.2.0 (Pro)</p>
                  </div>
                </div>
                <button onClick={() => setShowMenu(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1.5">
                {/* 1. Pengaturan Toko */}
                <button
                  onClick={() => {
                    setTempStoreForm({ ...storeInfo });
                    setShowStoreSettingsModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 transition border border-transparent hover:border-amber-200"
                >
                  <User className="w-4 h-4 text-amber-700" /> Pengaturan Toko
                </button>

                {/* 2. Pengaturan Struk & Printer */}
                <button
                  onClick={() => {
                    setShowPrinterSettingsModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 transition border border-transparent hover:border-amber-200"
                >
                  <Settings className="w-4 h-4 text-amber-700" /> Pengaturan Struk & Printer
                </button>

                {/* 3. Bantuan & Bimbingan */}
                <button
                  onClick={() => {
                    setShowHelpModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 transition border border-transparent hover:border-amber-200"
                >
                  <HelpCircle className="w-4 h-4 text-amber-700" /> Bantuan & Bimbingan
                </button>
              </div>
            </div>

            {/* 4. Keluar Sesi */}
            <div className="border-t pt-4">
              <button
                onClick={() => {
                  setShowLogoutConfirm(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" /> Keluar Sesi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: PENGATURAN TOKO */}
      {showStoreSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-slate-900 rounded-xl"><User className="w-5 h-5 text-amber-800" /></span>
                <h3 className="font-bold text-base text-slate-800">Pengaturan Toko</h3>
              </div>
              <button onClick={() => setShowStoreSettingsModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Nama Toko *</label>
                <input
                  type="text"
                  value={tempStoreForm.name}
                  onChange={(e) => setTempStoreForm({ ...tempStoreForm, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold focus:outline-[#FFC72C]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Slogan / Cabang</label>
                <input
                  type="text"
                  value={tempStoreForm.subtitle}
                  onChange={(e) => setTempStoreForm({ ...tempStoreForm, subtitle: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold focus:outline-[#FFC72C]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">No. WhatsApp Toko</label>
                <input
                  type="text"
                  value={tempStoreForm.phone}
                  onChange={(e) => setTempStoreForm({ ...tempStoreForm, phone: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold focus:outline-[#FFC72C]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Alamat Lengkap</label>
                <textarea
                  value={tempStoreForm.address}
                  onChange={(e) => setTempStoreForm({ ...tempStoreForm, address: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold focus:outline-[#FFC72C]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Pesan Penutup Struk</label>
                <input
                  type="text"
                  value={tempStoreForm.receiptFooter}
                  onChange={(e) => setTempStoreForm({ ...tempStoreForm, receiptFooter: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 font-semibold focus:outline-[#FFC72C]"
                />
              </div>
            </div>

            <button
              onClick={handleSaveStoreInfo}
              className="w-full py-3 bg-[#FFC72C] text-slate-900 rounded-xl font-bold hover:bg-amber-400 shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan Toko
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: PENGATURAN STRUK & PRINTER */}
      {showPrinterSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-slate-900 rounded-xl"><Printer className="w-5 h-5 text-amber-800" /></span>
                <h3 className="font-bold text-base text-slate-800">Pengaturan Struk & Printer</h3>
              </div>
              <button onClick={() => setShowPrinterSettingsModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-2">Ukuran Kertas Thermal *</label>
                <div className="grid grid-cols-2 gap-2">
                  {["58mm", "80mm"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setPrinterSettings({ ...printerSettings, paperSize: sz })}
                      className={`py-2.5 rounded-xl font-bold border transition ${
                        printerSettings.paperSize === sz
                          ? "bg-[#FFC72C] text-slate-900 border-[#FFC72C] shadow-sm"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {sz} Thermal Printer
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Cetak Otomatis Setelah Bayar</span>
                  <input
                    type="checkbox"
                    checked={printerSettings.autoPrint}
                    onChange={(e) => setPrinterSettings({ ...printerSettings, autoPrint: e.target.checked })}
                    className="w-4 h-4 accent-[#FFC72C] cursor-pointer"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Tampilkan Alamat Toko di Struk</span>
                  <input
                    type="checkbox"
                    checked={printerSettings.showAddress}
                    onChange={(e) => setPrinterSettings({ ...printerSettings, showAddress: e.target.checked })}
                    className="w-4 h-4 accent-[#FFC72C] cursor-pointer"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Tampilkan Pesan Footer Struk</span>
                  <input
                    type="checkbox"
                    checked={printerSettings.showFooter}
                    onChange={(e) => setPrinterSettings({ ...printerSettings, showFooter: e.target.checked })}
                    className="w-4 h-4 accent-[#FFC72C] cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  window.print();
                  showNotification("Perintah tes cetak berhasil dikirim ke printer!");
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Tes Cetak Struk
              </button>
            </div>

            <button
              onClick={handleSavePrinterSettings}
              className="w-full py-3 bg-[#FFC72C] text-slate-900 rounded-xl font-bold hover:bg-amber-400 shadow-md"
            >
              Simpan Pengaturan Printer
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: BANTUAN & BIMBINGAN */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-slate-900 rounded-xl"><HelpCircle className="w-5 h-5 text-amber-800" /></span>
                <h3 className="font-bold text-base text-slate-800">Bantuan & Bimbingan</h3>
              </div>
              <button onClick={() => setShowHelpModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 space-y-1">
                <h4 className="font-bold text-slate-800">📖 Panduan Singkat Kasir Warung</h4>
                <p className="text-slate-600 leading-relaxed">
                  1. Pilih produk di menu <strong>Kasir</strong> atau gunakan scanner kamera.<br />
                  2. Atur diskon & nominal bayar di layar <strong>Uang Diterima</strong>.<br />
                  3. Jika pembayaran kurang, sisa tagihan akan otomatis tercatat sebagai <strong>Hutang</strong>.<br />
                  4. Kelola produk & kategori di menu <strong>Barang</strong>.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800">Hubungi Layanan Bantuan</h4>
                <p className="text-slate-500">Ada kendala dengan aplikasi Kasir Warung? Tim kami siap membantu.</p>
                <button
                  onClick={() => window.open(`https://wa.me/${storeInfo.phone}`, "_blank")}
                  className="w-full py-2 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp CS Support
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: KONFIRMASI KELUAR SESI */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-800 text-lg">Keluar Sesi Kasir?</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Anda akan keluar dari sesi aplikasi kasir saat ini.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  showNotification("Sesi kasir berhasil diakhiri!");
                }}
                className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-2 px-1 z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                isActive ? "text-slate-900 bg-[#FFC72C]" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
