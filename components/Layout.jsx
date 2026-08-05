import React, { useState } from "react";
import { Store, Package, BookOpen, BarChart3, Bell, Menu, X, Settings, User, HelpCircle, LogOut } from "lucide-react";

export default function Layout({ children, activeTab, setActiveTab }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24 relative font-sans text-slate-800 shadow-xl border-x border-slate-200">
      {/* Header App */}
      <header className="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-800 leading-none">Kasir Warung</h1>
            <p className="text-[10px] text-slate-400 mt-0.5">Toko Nyemeel Utama</p>
          </div>
        </div>

        {/* Tombol Menu Burger Interaktif */}
        <button 
          onClick={() => setShowMenu(true)} 
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:bg-blue-50 transition"
        >
          <Menu className="w-6 h-6 text-blue-600" />
        </button>
      </header>

      <main className="p-4">{children}</main>

      {/* Drawer Menu Samping saat Tombol Burger Diklik */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-4/5 max-w-xs h-full p-5 space-y-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right">
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="font-bold text-sm text-slate-800">Menu Kasir Warung</h3>
                <button onClick={() => setShowMenu(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <button onClick={() => { alert("Pengaturan Toko"); setShowMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                  <User className="w-4 h-4" /> Pengaturan Toko
                </button>
                <button onClick={() => { alert("Pengaturan Struk"); setShowMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                  <Settings className="w-4 h-4" /> Pengaturan Struk & Printer
                </button>
                <button onClick={() => { alert("Bantuan: 08123456789"); setShowMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                  <HelpCircle className="w-4 h-4" /> Bantuan & Bimbingan
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <button onClick={() => setShowMenu(false)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50">
                <LogOut className="w-4 h-4" /> Keluar Sesi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
