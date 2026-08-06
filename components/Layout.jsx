{/* Tombol Keluar Sesi & Setelan Pabrik */}
            <div className="border-t pt-4 space-y-2">
              <button
                onClick={() => {
                  if (onLogout) onLogout();
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition border border-red-100"
              >
                <LogOut className="w-4 h-4" /> Keluar Sesi (Kunci)
              </button>

              <button
                onClick={() => {
                  setShowResetConfirm(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 transition border border-amber-200"
              >
                <RotateCcw className="w-4 h-4" /> Setelan Pabrik (Kosongkan All)
              </button>
            </div>
