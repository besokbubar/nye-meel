import React, { useState } from "react";
import { Store, AlertCircle } from "lucide-react";

export default function LoginModal({ storeInfo, onLoginSuccess }) {
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const validPin = storeInfo?.pin || "1234";

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg("");

      if (newPin.length === 4) {
        if (newPin === validPin) {
          onLoginSuccess();
        } else {
          setTimeout(() => {
            setErrorMsg("PIN Salah! Silakan coba lagi.");
            setPin("");
          }, 200);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 space-y-6 text-center shadow-2xl relative z-10 border border-slate-100">
        <div className="space-y-2">
          <div className="w-14 h-14 bg-[#FFC72C] text-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Store className="w-7 h-7" />
          </div>
          <h2 className="font-extrabold text-xl text-slate-800">{storeInfo?.name || "Kasir Warung"}</h2>
          <p className="text-xs text-slate-400 font-medium">Masukkan 4 Digit PIN Kasir</p>
        </div>

        <div className="flex justify-center items-center gap-3 py-2">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                pin.length > idx
                  ? "bg-[#FFC72C] scale-125 shadow-sm"
                  : "bg-slate-200"
              }`}
            ></div>
          ))}
        </div>

        {errorMsg && (
          <div className="flex items-center justify-center gap-1.5 text-red-500 text-xs font-bold bg-red-50 py-2 rounded-xl border border-red-200 animate-bounce">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 pt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="py-3.5 bg-slate-50 hover:bg-amber-100 active:scale-90 text-slate-800 font-black text-lg rounded-2xl border border-slate-200 transition shadow-sm"
            >
              {num}
            </button>
          ))}
          <div className="flex items-center justify-center text-[10px] text-slate-400 font-bold">
            PIN: {validPin}
          </div>
          <button
            onClick={() => handleKeyPress(0)}
            className="py-3.5 bg-slate-50 hover:bg-amber-100 active:scale-90 text-slate-800 font-black text-lg rounded-2xl border border-slate-200 transition shadow-sm"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="py-3.5 bg-slate-100 hover:bg-red-100 text-red-600 active:scale-90 font-bold text-xs rounded-2xl border border-slate-200 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
