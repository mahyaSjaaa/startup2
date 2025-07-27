'use client'
import { inter, interSB } from "@/fonts/font"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ListTransaksi({ stateSelesai }) {
    const [tanggal, setTanggal] = useState('')
    const [jenisTransaksi, setJenisTransaksi] = useState("");
    const [datas, setDatas] = useState([])
    
    const handleSearch = () => {
        console.log(tanggal);
        
    }

    const handleChange = (e) => {
        const value = e.target.value
        setJenisTransaksi(value)   
    }

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase.from('transaksi').select().order('created_at', {ascending:false}).limit(10)
            console.log(data);
            
            if(!error) setDatas(data)
        }
        fetchData()
    },[stateSelesai])

    return(
        <div className="flex justify-center pb-10">
            <div className="bg-white w-full h-full py-7 rounded-[8px] borded border-1 border-[#E0E0E0]">
                <div className="flex justify-between mx-7 mb-5">
                    {jenisTransaksi == "" && (
                        <p className={`${interSB.className} text-[18px] flex items-center`}>Riwayat Transaksi Pemasukan</p>
                    )}
                    {jenisTransaksi == "Pemasukan" && (
                        <p className={`${interSB.className} text-[18px] flex items-center`}>Riwayat Transaksi Pemasukan</p>
                    )}
                    {jenisTransaksi == "Pengeluaran" && (
                        <p className={`${interSB.className} text-[18px] text-[#F77171] flex items-center`}>Riwayat Transaksi Pengeluaran</p>
                    )}
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
                    </div>
                </div>
                <div className="flex justify-end gap-2 mx-7 my-5">
                    <select id="transaksi" name="transaksi" value={jenisTransaksi} onChange={handleChange}>
                        <option value="">Pilih jenis transaksi</option>
                        <option value="Pemasukan">Pemasukan</option>
                        <option value="Pengeluaran">Pengeluaran</option>
                    </select>
                    <input type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Cari berdasarkan ID/produk/pelanggan/waktu"/>
                    <button className="px-3 bg-[#E0E0E0] rounded-sm" onClick={handleSearch}>cari</button>  
                </div>
                <div className="">
                {jenisTransaksi == "" && (
                    <div>
                        <table className="table-auto w-full">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PRODUK</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JUMLAH</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>HARGA</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>TOTAL HARGA</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>WAKTU</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>AKSI</th>
                            </tr>
                            </thead>
                            <tbody>
                                {datas?.filter((data) => data.jenis_transaksi === "PEMASUKAN").map((data) => (
                                <tr key={data.id}>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk.map((prod) => (
                                        <ul key={prod.nama}>
                                            <li>{prod.nama}</li>
                                        </ul>
                                    ))}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk.map((prod) => (
                                        <ul key={prod.nama}>
                                            <li>{prod.jumlah} {prod.satuan}</li>
                                        </ul>
                                    ))}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk.map((prod) => (
                                        <ul key={prod.nama}>
                                            <li>Rp.{prod.harga}/{prod.satuan}</li>
                                        </ul>
                                    ))}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px] text-[#00D4A0]`}>Rp{data.pemasukan}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.created_at}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>
                                        <button className="px-3 py-1 bg-[#4170FF] text-white rounded-sm ">Detail</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {jenisTransaksi == "Pemasukan" && (
                    <div>
                        <table className="table-auto w-full">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PRODUK</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JUMLAH</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>HARGA</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>TOTAL HARGA</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>WAKTU</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>AKSI</th>
                            </tr>
                            </thead>
                            <tbody>
                                {datas?.filter((data) => data.jenis_transaksi === "PEMASUKAN").map((data) => (
                                <tr key={data.id}>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk.map((prod) => (
                                        <ul key={prod.nama}>
                                            <li>{prod.nama}</li>
                                        </ul>
                                    ))}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk.map((prod) => (
                                        <ul key={prod.nama}>
                                            <li>{prod.jumlah} {prod.satuan}</li>
                                        </ul>
                                    ))}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk.map((prod) => (
                                        <ul key={prod.nama}>
                                            <li>Rp.{prod.harga}/{prod.satuan}</li>
                                        </ul>
                                    ))}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px] text-[#00D4A0]`}>Rp{data.pemasukan}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.created_at}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>
                                        <button className="px-3 py-1 bg-[#4170FF] text-white rounded-sm ">Detail</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {jenisTransaksi == "Pengeluaran" && (
                    <div>
                        <table className="table-auto w-full">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PRODUK</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>JUMLAH</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>TOTAL HARGA</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>WAKTU</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>AKSI</th>
                            </tr>
                            </thead>
                            <tbody>
                                {datas?.filter((data) => data.jenis_transaksi === "PENGELUARAN").map((data) => (
                                <tr key={data.id}>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.stokPartai == 0 ? data.stok : data.stokPartai} {data.satuanPartai == "" ? data.satuan : data.satuanPartai}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px] text-[#F77171]`}>Rp{data.pengeluaran}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.created_at}</td>
                                    <td className={`px-4 py-2 ${inter.className} text-[15px]`}>
                                        <button className="px-3 py-1 bg-[#4170FF] text-white rounded-sm ">Detail</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}