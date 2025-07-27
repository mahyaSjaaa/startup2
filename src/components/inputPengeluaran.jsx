'use client'
import { inter, interSB } from "@/fonts/font"
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"

export default function CrudProduk({onSubmit, editData}) {
  const [produk, setProduk] = useState(editData?.produk || '')
  const [harga, setHarga] = useState(editData?.harga || '')
  const [satuan, setSatuan] = useState(editData?.satuan || '')
  const [threshold, setThreshold] = useState(editData?.satuan || '')
  const [stok, setStok] = useState(editData?.stok || '')

  const handleSubmit = async () => {
    await onSubmit({ produk, harga, satuan, threshold, stok, id: editData?.id })
    setProduk('')
    setHarga('')
    setSatuan('')
    setThreshold('')
    setStok('')
  }

  useEffect(() => {
    if (editData) {
      setProduk(editData.produk)
      setHarga(editData.harga)
      setSatuan(editData.satuan)
      setStok(editData.stok)
      setThreshold(editData.threshold)
    }
  }, [editData])



    return (
        <div className="flex justify-center pb-10">
            <div className="bg-white w-full h-full py-8 rounded-[8px] borded border-1 border-[#E0E0E0]">
                <p className={`${interSB.className} text-[18px] px-8 pb-8`}>Tambah Produk</p>
                <div className="flex justify-center mb-4">
                    <div>
                        <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Nama Produk</p>
                        <input value={produk} onChange={(e) => setProduk(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: Beras sintanola, Ayam goreng, dll"/>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <div>
                        <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Harga Produk</p>
                        <input value={harga} onChange={(e) => setHarga(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 8000"/>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <div>
                        <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Jumlah stok</p>
                        <input value={stok} onChange={(e) => setStok(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 80"/>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <div>
                        <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Batas pengingat restok</p>
                        <input value={threshold} onChange={(e) => setThreshold(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 20 (jika stok < 20 maka akan ada pengingat)"/>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <div>
                        <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Satuan</p>
                        <input value={satuan} onChange={(e) => setSatuan(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: pcs, kg, gr, lusin, dus, dll"/>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <button onClick={handleSubmit} className="px-20 py-1 bg-[#4170FF] text-white rounded-sm ">Simpan</button>
                </div>
            </div>
        </div>
    )
}