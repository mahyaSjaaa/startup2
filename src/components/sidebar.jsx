'use client'
import { inter, interSB } from "@/fonts/font"

export default function Sidebar({ activeMenu, setActiveMenu }) {
  const menus = [
    { id: "dashboard", label: "Dashboard" },
    { id: "transaksi", label: "Transaksi" },
    { id: "produk", label: "Produk" },
    // { id: "pelanggan", label: "Pelanggan" },
    { id: "web", label: "Website Builder" },
    { id: "setting", label: "Pengaturan Usaha" },
  ];

  return (
    <div className="relative">
      <div className="fixed top-0 w-[15%] border-r border-r-[#E0E0E0] bg-white h-screen">
        <div className="flex gap-5 pl-6 py-3 border-b border-b-[#E0E0E0]">
          <div>
            <p className={`${interSB.className}`}>Rafffi Mahya</p>
            <p className={`${inter.className} text-gray-500 text-[14px]`}>admin</p>
          </div>
        </div>
        <div className="pt-5">
          {menus.map((menu) => (
            <div
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              className={`flex gap-3 pl-4 mx-2 py-2 rounded-sm cursor-pointer ${
                activeMenu === menu.id ? "bg-[#D7E1FF]" : ""
              }`}
            >
              <p>O</p>
              <p
                className={`${inter.className} text-[15px] ${
                  activeMenu === menu.id ? "text-[#5A81F7]" : "text-gray-600"
                }`}
              >
                {menu.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
