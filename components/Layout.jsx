import React from "react";
import { Store, Package, BookOpen, BarChart3, Bell, Menu } from "lucide-react";

export default function Layout({ children, activeTab, setActiveTab }) {
  const tabs = [
    { id: "kasir", label: "Kasir", icon: Store },
    { id: "barang", label: "Barang", icon: Package },
    { id: "hutang", label: "Hutang", icon: BookOpen },
    { id: "laporan", label: "Laporan", icon: BarChart3 },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24 relative font-sans text-slate-800 shadow-xl border-x border-slate-200">
      <header className="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
            <Store className="w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg text-slate-800">Kasir Warung</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"><Bell className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"><Menu className="w-5 h-5" /></button>
        </div>
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
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                isActive ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-600"
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
