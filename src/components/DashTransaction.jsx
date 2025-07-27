import { inter, interSB } from "@/fonts/font"

export default function DashTransaction() {
    return(
        <div>
            <div className="overflow-hidden rounded-[8px] border border-[#E0E0E0]">
                <div className="flex justify-between px-7 py-6 bg-white">
                    <p className={`${interSB.className} text-[18px] flex items-center`}>Transaksi terbaru</p>
                    <div className="flex justify-center gap-2">
                        <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Cari berdasarkan ID/produk/pelanggan/waktu"/>
                        <button className="px-3 bg-[#E0E0E0] rounded-sm ">cari</button>
                    </div>
                </div>
                <table className="table-auto w-full">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>ID</th>
                        <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PRODUK</th>
                        <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JUMLAH</th>
                        <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PELANGGAN</th>
                        <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>TOTAL HARGA</th>
                        <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>WAKTU</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={`px-4 py-2 ${inter.className} text-[15px]`}>1</td>
                        <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Indomie Goreng</td>
                        <td className={`px-4 py-2 ${inter.className} text-[15px]`}>5</td>
                        <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Budi</td>
                        <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp10.000</td>
                        <td className={`px-4 py-2 ${inter.className} text-[15px]`}>2025-07-16 14:22</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}