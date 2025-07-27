'use client'
import { inter, interSB } from "@/fonts/font"
import { useState } from "react"

export default function SettingUsaha() {
    const [inActive, setInActive] = useState('pemasukan')
    const [tanggal, setTanggal] = useState('')

    return(
        <div>
            <div className="flex justify-between flex-wrap pb-10">
                <div className="bg-white rounded-[8px] borded border-1 border-[#E0E0E0] w-[250px]">
                    <div className="mx-7 my-4">
                        <div className="flex justify-between">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[14px]`}>Omset bulanan</p>
                                <p className={`${interSB.className} text-[#00D4A0] text-[22px]`}>Rp. 2,455,000</p>
                            </div>
                            <p className="flex items-center">O</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-[8px] borded border-1 border-[#E0E0E0] w-[250px]">
                    <div className="mx-7 my-4">
                        <div className="flex justify-between">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[14px]`}>Operasional bulanan</p>
                                <p className={`${interSB.className} text-[#F77171] text-[22px]`}>Rp. 2,455,000</p>
                            </div>
                            <p className="flex items-center">O</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-[8px] borded border-1 border-[#E0E0E0] w-[250px]">
                    <div className="mx-7 my-4">
                        <div className="flex justify-between">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[14px]`}>Pengeluaran variable</p>
                                <p className={`${interSB.className} text-[#F77171] text-[22px]`}>Rp. 2,455,000</p>
                            </div>
                            <p className="flex items-center">O</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-[8px] borded border-1 border-[#E0E0E0] w-[250px]">
                    <div className="mx-7 my-4">
                        <div className="flex justify-between">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[14px]`}>Profit bersih bulanan</p>
                                <p className={`${interSB.className} text-[#00D4A0] text-[22px]`}>Rp. 2,455,000</p>
                            </div>
                            <p className="flex items-center">O</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pb-10">
                <div className="bg-white w-full h-full py-8 rounded-[8px] borded border-1 border-[#E0E0E0]">
                    <div className="flex justify-between flex-wrap px-8 pb-8 border-b border-b-[#E0E0E0]">
                        <button onClick={() => setInActive('pemasukan')}>
                            <div className={`${inter.className} ${inActive == "pemasukan" ? 'text-[#5A81F7] bg-[#D7E1FF] px-3 py-2 rounded-[8px]' : 'px-3 py-2 text-gray-600'} flex justify-center gap-2`}>
                                <p>O</p>
                                <p>Pemasukan/Pengeluaran</p>
                            </div>
                        </button>
                        <button onClick={() => setInActive('list')}>
                            <div className={`${inter.className} ${inActive == "list" ? 'text-[#5A81F7] bg-[#D7E1FF] px-3 py-2 rounded-[8px]' : 'px-3 py-2 text-gray-600'} flex justify-center gap-2`}>
                                <p>O</p>
                                <p>List operasional</p>
                            </div>
                        </button>
                        <button onClick={() => setInActive('pengeluaran')}>
                            <div className={`${inter.className} ${inActive == "pengeluaran" ? 'text-[#5A81F7] bg-[#D7E1FF] px-3 py-2 rounded-[8px]' : 'px-3 py-2 text-gray-600'} flex justify-center gap-2`}>
                                <p>O</p>
                                <p>Operasional non pegawai</p>
                            </div>
                        </button>
                        <button onClick={() => setInActive('pegawai')}>
                            <div className={`${inter.className} ${inActive == "pegawai" ? 'text-[#5A81F7] bg-[#D7E1FF] px-3 py-2 rounded-[8px]' : 'px-3 py-2 text-gray-600'} flex justify-center gap-2`}>
                                <p>O</p>
                                <p>Atur pegawai</p>
                            </div>
                        </button>
                    </div>
                    {inActive == "pemasukan" && (
                        <div className="pb-20">
                            <div className="flex justify-between mx-7 my-5">
                                <p className={`${interSB.className} text-[18px]`}>List pemasukan/pengeluaran</p>
                                <div className="flex justify-end gap-2">
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Dari:</p>
                                    <input
                                        type="date"
                                        value={tanggal}
                                        onChange={(e) => setTanggal(e.target.value)}
                                        className="border border-gray-400 rounded-sm border-1 px-1 text-sm outline-none"
                                        />
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Hingga:</p>
                                    <input
                                        type="date"
                                        value={tanggal}
                                        onChange={(e) => setTanggal(e.target.value)}
                                        className="border border-gray-400 rounded-sm border-1 px-1 text-sm outline-none"
                                        />
                                    <button className="px-3 py-1 bg-[#4170FF] text-white rounded-sm ">Download rekap</button>
                                </div>
                            </div>
                            <table className="table-auto w-full">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>ID</th>
                                    <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JENIS</th>
                                    <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>TOTAL</th>
                                    <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>WAKTU</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className={`px-4 py-2 ${inter.className} text-[#00D4A0] text-[15px]`}>1</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[#00D4A0] text-[15px]`}>Indomie Goreng</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[#00D4A0] text-[15px]`}>+Rp6000</td>
                                </tr>
                                <tr>
                                    <td className={`px-4 py-2 ${inter.className} text-[#F77171] text-[15px]`}>2</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[#F77171] text-[15px]`}>Telur 10 peti</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[#F77171] text-[15px]`}>-Rp3000000</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {inActive == "list" && (
                        <div className="pb-20">
                            <div className="flex justify-between mx-7 my-5">
                                <p className={`${interSB.className} text-[18px]`}>Biaya operasional bulanan</p>
                            </div>
                            <table className="table-auto w-full">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>ID</th>
                                    <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JENIS PENGELUARAN</th>
                                    <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JUMLAH PENGELUARAN</th>
                                    <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>KETERANGAN</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>1</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Indomie Goreng</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp6000/pcs</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>-</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {inActive == "pengeluaran" && (
                        <div>
                            <p className={`${interSB.className} text-[18px] px-8 py-8`}>Tambah biaya operasional bulanan (non pegawai)</p>
                            <div className="flex justify-center mb-4">
                                <div>
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Jenis pengeluaran</p>
                                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: Sewa ruko, PDAM, PLN, dll"/>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <div>
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Biaya operasional</p>
                                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 200000"/>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <div>
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Keterangan</p>
                                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="opsional"/>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <button className="px-20 py-1 bg-[#4170FF] text-white rounded-sm ">Simpan</button>
                            </div>
                            <div className="flex justify-center pb-10 pt-10">
                                <div className="bg-white w-full h-full py-8 borded-t border-t-1 border-t-[#E0E0E0]">
                                    <div className="flex justify-between mx-7 mb-6">
                                        <p className={`${interSB.className} text-[18px] flex justify-center`}>List operasional non pegawai</p>
                                        <div className="flex justify-end gap-2 mx-7">
                                            <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Cari berdasarkan ID/produk"/>
                                            <button className="px-3 bg-[#E0E0E0] rounded-sm ">cari</button>
                                        </div>
                                    </div>
                                    <div className="">
                                        <table className="table-auto w-full">
                                            <thead className="bg-gray-100">
                                            <tr>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>ID</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JENIS PENGELUARAN</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JUMLAH PENGELUARAN</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>KETERANGAN</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-right`}>AKSI</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>1</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Indomie Goreng</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp6000/pcs</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>-</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px] text-end`}>
                                                    <button className="px-3 py-1 bg-[#4170FF] mr-2 text-white rounded-sm ">edit</button>
                                                    <button className="px-3 py-1 bg-[#F77171] text-white rounded-sm ">hapus</button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {inActive == "pegawai" && (
                        <div>
                            <p className={`${interSB.className} text-[18px] px-8 py-8`}>Tambah pegawai</p>
                            <div className="flex justify-center mb-4">
                                <div>
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Nama</p>
                                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: Budi"/>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <div>
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Alamat</p>
                                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: JL. xxxx"/>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <div>
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>No WA</p>
                                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 08xxxx"/>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <div>
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Gaji bulanan</p>
                                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 1200000"/>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <div>
                                    <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Role</p>
                                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: ownner, admin, kasir"/>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <button className="px-20 py-1 bg-[#4170FF] text-white rounded-sm ">Simpan</button>
                            </div>
                            <div className="flex justify-center pb-10 pt-10">
                                <div className="bg-white w-full h-full py-8 borded-t border-t-1 border-t-[#E0E0E0]">
                                    <div className="flex justify-between mx-7 mb-6">
                                        <p className={`${interSB.className} text-[18px] flex justify-center`}>List pegawai</p>
                                        <div className="flex justify-end gap-2 mx-7">
                                            <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Cari berdasarkan ID/produk"/>
                                            <button className="px-3 bg-[#E0E0E0] rounded-sm ">cari</button>
                                        </div>
                                    </div>
                                    <div className="">
                                        <table className="table-auto w-full">
                                            <thead className="bg-gray-100">
                                            <tr>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>ID</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>NAMA</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>ALAMAT</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>NO WA</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>GAJI BULANAN</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>Role</th>
                                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-right`}>AKSI</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>1</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Indomie Goreng</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp6000/pcs</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>089666823165</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp. 1,200,000</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>admin</td>
                                                <td className={`px-4 py-2 ${inter.className} text-[15px] text-end`}>
                                                    <button className="px-3 py-1 bg-[#4170FF] mr-2 text-white rounded-sm ">edit</button>
                                                    <button className="px-3 py-1 bg-[#F77171] text-white rounded-sm ">hapus</button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}