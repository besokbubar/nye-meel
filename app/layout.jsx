import "./globals.css";

export const metadata = {
  title: "Kasir Warung",
  description: "Aplikasi Kasir Warung Complete",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased bg-slate-100 min-h-screen">{children}</body>
    </html>
  );
}
