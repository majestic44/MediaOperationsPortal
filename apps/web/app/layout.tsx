
import './globals.css'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
