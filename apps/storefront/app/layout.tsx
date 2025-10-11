export const dynamic = "force-dynamic";
export const revalidate = false;
import "./globals.css";
import Header from "./components/Header";
export const metadata = { title: "NexGear" };
export default function RootLayout({ children }:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
