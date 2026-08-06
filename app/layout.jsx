import "./globals.css";

export const metadata = {
  title: "Kasir Warung",
  description: "Aplikasi Kasir Warung Modern",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-slate-100 min-h-screen text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
