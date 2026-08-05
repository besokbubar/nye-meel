import React, { useState } from "react";
import { Store, Package, BookOpen, BarChart3, Bell, Menu, X, Settings, User, HelpCircle, LogOut } from "lucide-react";

export default function Layout({ children, activeTab, setActiveTab }) {
  const [showMenu, setShowMenu] = useState(false);

  const tabs = [
    { id: "kasir", label: "Kasir", icon: Store },
    { id: "barang", label: "Barang", icon: Package },
    { id: "hutang", label: "Hutang", icon: BookOpen },
    { id: "laporan", label: "Laporan", icon: BarChart3 },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24 relative font-sans text-slate-800 shadow-xl border-x border-slate-200">
      <header className="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#FFC72C] rounded-xl text-slate-900 font-bold">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-800 leading-none">Kasir Warung</h1>
            <p className="text-[10px] text-slate-400 mt-0.5">Toko Nyemeel Utama</p>
          </div>
        </div>
        <button 
          onClick={() => setShowMenu(true)} 
          className="p-2 rounded-xl text-slate-700 hover:bg-amber-50 transition"
        >
          <Menu className="w-6 h-6 text-slate-800" />
        </button>
      </header>

      <main className="p-4">{children}</main>

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
