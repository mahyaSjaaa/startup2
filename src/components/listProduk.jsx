'use client'
import { inter, interSB } from "@/fonts/font"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"

export default function ListProduk({ stateSelesai, setStateSelesai }) {
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  const [onKonfirmasi, setOnKonfirmasi] = useState('')
  const [currStok, setCurrStok] = useState([])
  const [status, setStatus] = useState(false)
  const [dataAlert, setDataAlert] = useState('tidak')
  const [hiddenZ, setHiddenZ] = useState(false)
  const [result, setResult] = useState([])

  const jumlahRef = useRef({})
  const [jumlah, setJumlah] = useState({})
  const [totalHargaTampung, setTotalHargaTampung] = useState(0)
  const [totalJumlahProduk, setTotalJumlahProduk] = useState(0)

  const updateTotals = () => {
    const totalJumlah = Object.values(jumlahRef.current).reduce((acc, val) => acc + val, 0)
    const totalHarga = datas.reduce((acc, item) => {
      const qty = jumlahRef.current[item.produk] || 0
      return acc + qty * item.harga
    }, 0)
    setTotalJumlahProduk(totalJumlah)
    setTotalHargaTampung(totalHarga)
  }

  const syncJumlahState = () => {
    setJumlah({ ...jumlahRef.current })
    updateTotals()
  }

  const fetchData = async () => {
    const { data, error } = await supabase.from('produk').select()
    if (error) return console.error(error)

    setDatas(data)

    const updatedJumlah = { ...jumlahRef.current }
    data.forEach(item => {
      if (!(item.produk in updatedJumlah)) {
        updatedJumlah[item.produk] = 0
      }
    })
    jumlahRef.current = updatedJumlah
    syncJumlahState()

    const curStoks = data.reduce((acc, item) => {
      acc[item.produk] = item.stok
      return acc
    }, {})
    setCurrStok(curStoks)

    const cekStok = data?.some(i => i.stok <= i.threshold)
    setDataAlert(cekStok ? 'ada' : 'tidak')

    const cekZero = data?.some(i => i.stok === 0)
    setHiddenZ(cekZero)
  }

  const handleSearch = async keyword => {
    if (!keyword) return
    const { data, error } = await supabase.from('produk').select().like('produk', `%${keyword}%`)
    if (error) return console.error(error)
    if (data.length === 0) return alert('data tidak ditemukan')
    if (data[0].stok === 0) return alert('stok produk yang anda cari kosong')

    const updatedJumlah = { ...jumlahRef.current }
    data.forEach(item => {
      if (!(item.produk in updatedJumlah)) {
        updatedJumlah[item.produk] = 0
      }
    })
    jumlahRef.current = updatedJumlah
    setSearchData(data)
    syncJumlahState()

    const cekZero = data?.some(i => i.stok === 0)
    setHiddenZ(cekZero)
  }

  useEffect(() => {
    if (search === '') setSearchData([])
  }, [search])

  const handleChangeJumlah = (produk, val, stok) => {
    const value = Math.max(0, parseInt(val) || 0)
    if (value > stok) return alert('stok tidak cukup!')
    jumlahRef.current[produk] = value
    syncJumlahState()
  }

  const handleAdd = (produk, stok) => {
    const current = jumlahRef.current[produk] || 0
    if (current >= stok) return alert('stok tidak cukup!')
    jumlahRef.current[produk] = current + 1
    syncJumlahState()
  }

  const handleMinus = (produk) => {
    const current = jumlahRef.current[produk] || 0
    jumlahRef.current[produk] = Math.max(current - 1, 0)
    syncJumlahState()
  }

  const handleKonfirmasi = () => {
    setOnKonfirmasi('konfirmasi')
    const hasil = datas.filter(item => jumlahRef.current[item.produk] > 0).map(item => ({
      nama: item.produk,
      jumlah: jumlahRef.current[item.produk],
      harga: item.harga
    }))
    setResult(hasil)
  }

  const handleSelesai = async () => {
    const updatePromises = result.map(async data => {
      return supabase.from('produk')
        .update({ stok: currStok[data.nama] - data.jumlah })
        .eq('produk', data.nama)
    })

    const insertTransaksi = async () => {
        const produkArray = []
        let totalPemasukan = 0

        for (const res of result) {
            const { data, error: fetchError } = await supabase
                .from('produk')
                .select()
                .eq('produk', res.nama)
                .single()

            if (fetchError || !data) {
                console.error("Gagal ambil data produk:", res.nama, fetchError)
                continue
            }

            produkArray.push({
                nama: res.nama,
                harga: data.harga,
                jumlah: res.jumlah,
                satuan: data.satuan
            })

            totalPemasukan += data.harga * res.jumlah
        }

        if (produkArray.length > 0) {
            const { error: insertError } = await supabase.from('transaksi').insert([
                {
                    produk: produkArray,
                    jenis_transaksi: "PEMASUKAN",
                    pemasukan: totalPemasukan,
                }
            ])

            if (insertError) {
                console.error("Gagal insert transaksi:", insertError)
                setStatus("Transaksi berhasil")
            } else {
                setStatus("Transaksi berhasil")
            }
        } else {
            alert("Tidak ada produk valid untuk disimpan")
        }
    }



    insertTransaksi()

    await Promise.all(updatePromises)
    setStateSelesai(!stateSelesai)
    setSearch('')
    setSearchData([])
    jumlahRef.current = {}
    setJumlah({})
    setResult([])
    setTotalHargaTampung(0)
    setTotalJumlahProduk(0)
  }

  useEffect(() => {
    fetchData()
  }, [stateSelesai, hiddenZ])

    return(
        <div className="flex justify-center pb-10">
            <div className="bg-white w-full h-full py-8 rounded-[8px] borded border-1 border-[#E0E0E0]">
                <div className="flex justify-between mx-7 mb-6">
                    {dataAlert == "ada" && (
                        <p className={`${interSB.className} text-[18px] flex justify-center text-[#F77171]`}>Stok menipis!</p>
                    )}
                </div>
                {dataAlert == "ada" && (
                    <div className="">
                        <table className="table-auto w-full mb-10 borded-b border-b-1 border-b-[#E0E0E0]">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PRODUK</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>HARGA</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>STOK</th>
                            </tr>
                            </thead>
                            <tbody>
                            {datas?.filter((data) => data.stok <= data.threshold).map((data) => 
                            (
                                <tr key={data.id}>
                                    <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.produk}</td>
                                    <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>Rp{data.harga}/{data.satuan}</td>
                                    <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.stok} {data.satuan}</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-between mx-7">
                    <p className={`${interSB.className} text-[18px]`}>Lakukan Transaksi</p>
                    <div className="flex justify-center gap-5 ">
                        <button onClick={handleKonfirmasi} className="cursor-pointer px-3 bg-[#00D4A0] text-white rounded-sm ">konfirmasi</button>
                        <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Jumlah: {totalJumlahProduk}</p>
                        <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Total harga: Rp. {totalHargaTampung}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mx-7 my-5">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Cari berdasarkan produk"/>
                    <button onClick={() => handleSearch(search)} className="px-3 bg-[#E0E0E0] rounded-sm cursor-pointer">cari</button>
                </div>
                <div className="">
                    <table className="table-auto w-full">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PRODUK</th>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>STOK</th>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>HARGA</th>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-center`}>JUMLAH</th>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>TOTAL HARGA</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchData != '' && search != ''? (
                            searchData?.map((data) => (
                            <tr key={data.id}>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk}</td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.stok} {data.satuan}</td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp.{data.harga}/{data.satuan}</td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>
                                    <div className="flex justify-between">
                                        <button className="cursor-pointer" onClick={() => handleAdd(data.produk, data.stok)}>+</button>
                                        <input type="text" value={jumlah[data.produk] || 0} onChange={(e) => handleChangeJumlah(data.produk, e.target.value, data.stok)} className="border border-1 border-gray-200 text-center w-[64px] px-2 rounded-sm"/>
                                        <button className="cursor-pointer" onClick={() => handleMinus(data.produk)}>-</button>
                                    </div>
                                </td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp.{data.harga * jumlah[data.produk]}</td>
                            </tr>
                            ))
                        ) : (
                            datas?.map(data => data.stok != 0 && (  
                            <tr key={data.id}>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.produk}</td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>{data.stok} {data.satuan}</td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp.{data.harga}/{data.satuan}</td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>
                                    <div className="flex justify-between">
                                        <button className="cursor-pointer" onClick={() => handleAdd(data.produk, data.stok)}>+</button>
                                        <input type="text" value={jumlah[data.produk] || 0} onChange={(e) => handleChangeJumlah(data.produk, e.target.value, data.stok)} className="border border-1 border-gray-200 text-center w-[64px] px-2 rounded-sm"/>
                                        <button className="cursor-pointer" onClick={() => handleMinus(data.produk)}>-</button>
                                    </div>
                                </td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px]`}>Rp.{data.harga * jumlah[data.produk]}</td>
                            </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            {onKonfirmasi == "konfirmasi" && (
                <div className="relative z-50">
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div>
                            <div className="bg-white w-[500px]">
                                {status ? (
                                    <div>
                                        <div className="flex justify-end px-5 pt-5">
                                            <button className="cursor-pointer" onClick={() => {setOnKonfirmasi("")
                                                setStatus("")
                                                setStateSelesai(!stateSelesai)
                                            }}>X</button>
                                        </div>
                                        <p className="flex justify-center py-5 pb-15">{status}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-between px-5 pt-5">
                                            <p>Detail Pembelian</p>
                                            <button className="cursor-pointer" onClick={() => {
                                                setOnKonfirmasi("")}}>X</button>
                                        </div>
                                        <div className="flex justify-between px-5 pt-7 mb-7">
                                            <p>Barang</p>
                                            <p>Harga</p>
                                        </div>
                                        {result?.map((data) => (
                                        <div key={data.nama} className="flex justify-between px-5">
                                            <p>{data.nama} -- {data.jumlah} x {data.harga}</p>
                                            <p>Rp.{data.harga * data.jumlah}</p>
                                        </div>
                                        ))}
                                        <div className="flex justify-between px-5 py-7">
                                            <p>Total Harga</p>
                                            <p>{totalHargaTampung}</p>
                                        </div>
                                        <div className="flex justify-center pb-5">
                                            <button onClick={handleSelesai} className="px-5 py-1 bg-[#4170FF] text-white rounded-sm">Selesaikan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}