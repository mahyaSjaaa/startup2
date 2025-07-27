'use client'
import { inter, interSB } from "@/fonts/font"
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"

export default function CrudProduk({onSubmit, editData}) {
  const [produk, setProduk] = useState(editData?.produk || '')
  const [harga, setHarga] = useState(editData?.harga || '')
  const [hargaPartai, setHargaPartai] = useState(editData?.harga || 0)
  const [satuan, setSatuan] = useState(editData?.satuan || '')
  const [satuanPartai, setSatuanPartai] = useState(editData?.satuan || '')
  const [jumSatPar, setJumSatPar] = useState(editData?.satuan || 0)
  const [threshold, setThreshold] = useState(editData?.satuan || '')
  const [stok, setStok] = useState(editData?.stok || 0)
  const [stokPartai, setStokPartai] = useState(editData?.stok || 0)
  const [onActive, setOnActive] = useState('partai')
  const [onActiveTambah, setOnActiveTambah] = useState('restok')
  const [dataRestok, setDataRestok] = useState([])
  const [selectRestok, setSelectRestok] = useState('')
  const [daatSelectRestok, setDataSelectRestok] = useState('')

  const handleSubmit = async () => {
    console.log(stok);
    console.log(stokPartai);
    
    await onSubmit({ produk, harga, hargaPartai, satuan, satuanPartai, threshold, stok, stokPartai, jumSatPar, id: editData?.id })
    setProduk('')
    setHarga('')
    setSatuan('')
    setThreshold('')
    setStok(0)
    setHargaPartai(0)
    setSatuanPartai('')
    setJumSatPar(0)
    setStokPartai(0)
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

    useEffect(() => {
    setStok(jumSatPar * stokPartai)
    }, [jumSatPar, stokPartai])

    useEffect(() => {
        const fetchRestok = async () => {
            const {data, error} = await supabase.from('produk').select('produk')
            if(data.length != 0) setDataRestok(data)
        }
    fetchRestok()
    },[])

    const handleOptRestok = async (e) => {
        const value = e.target.value
        setSelectRestok(value)
    }

    useEffect(() => {
        const fetchRestok = async () => {
            console.log(selectRestok);
            
            const {data, error} = await supabase.from('produk').select().eq('produk', selectRestok)
            if(data.length != 0){
                setSatuan(data[0].satuan)
                setSatuanPartai(data[0].satuanPartai)
            }
        }
    fetchRestok()
    },[selectRestok])

    return (
        <div className="flex justify-center pb-10">
            <div className="bg-white w-full h-full py-8 rounded-[8px] borded border-1 border-[#E0E0E0]">
                <div className="px-8 pb-8 flex justify-between">
                    <p className={`${interSB.className} text-[18px]`}>{onActiveTambah == "restok" ? "restok produk" : "tambah produk"}</p>
                    <div className="flex justify-center gap-5">
                        <select name="" id="" value={onActiveTambah} onChange={(e) => setOnActiveTambah(e.target.value)}>
                            <option className="text-center" value="restok">restok</option>
                            <option value="tambah produk">tambah produk</option>
                        </select>
                        <select name="" id="" value={onActive} onChange={(e) => setOnActive(e.target.value)}>
                            <option value="partai">partai</option>
                            <option value="satuan">satuan</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <div>
                        <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`} >Nama produk</p>
                        {onActiveTambah == "restok" ? (
                            <select value={selectRestok} onChange={handleOptRestok} className="border border-gray-400 rounded-sm border-1 px-3 w-[400px] py-[5.8px]" name="" id="">
                                {dataRestok.map((data) => (
                                    <option key={data.produk} value={data.produk}>{data.produk}</option>
                                ))}
                            </select>
                        ):(
                            <input value={produk} onChange={(e) => setProduk(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: Beras sintanola, Ayam goreng, dll"/>
                        )}
                    </div>
                </div>
                {onActive == "partai" && (
                    <div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Satuan partai</p>
                                <input value={satuanPartai} onChange={(e) => setSatuanPartai(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: lusin, dus, karton, dll"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Jumlah stok {satuanPartai == '' ? "partai" : satuanPartai}</p>
                                <input value={stokPartai} onChange={(e) => setStokPartai(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 80"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Harga {satuanPartai == '' ? "keseluruhan (peti/dus/karton, dll)" : `${stokPartai} ${satuanPartai}`}</p>
                                <input value={hargaPartai} onChange={(e) => setHargaPartai(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 800000"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Berat/jumlah/isi per {satuanPartai}</p>
                                <input value={jumSatPar} onChange={(e) => setJumSatPar(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 12"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} pt-2 text-gray-500 text-[15px] flex items-center`}>Satuan</p>
                                <input value={satuan} onChange={(e) => setSatuan(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: pcs, kg, gr, lusin, dus, dll"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Jumlah stok berapa {satuan}</p>
                                <input value={jumSatPar * stokPartai} onChange={() => setStok(jumSatPar * stokPartai)} type="text" className={`${inter.className} text-[15px] border border-gray-400 bg-gray-200 cursor-not-allowed rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 80"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Harga produk per {satuan}</p>
                                <input value={harga} onChange={(e) => setHarga(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 8000"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Batas pengingat restok</p>
                                <input value={threshold} onChange={(e) => setThreshold(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 20 (jika stok < 20pcs maka akan ada pengingat)"/>
                            </div>
                        </div>
                    </div>
                )}
                {onActive == "satuan" && (
                    <div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Satuan partai</p>
                                <input value={satuanPartai} onChange={(e) => setSatuanPartai(e.target.value)} disabled type="text" className={`${inter.className} bg-gray-200 cursor-not-allowed text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: lusin, dus, karton, dll"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Jumlah stok {satuanPartai == '' ? "partai" : satuanPartai}</p>
                                <input value={stokPartai} onChange={(e) => setStokPartai(e.target.value)} type="text" disabled className={`${inter.className} bg-gray-200 cursor-not-allowed text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 80"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Harga {satuanPartai == '' ? "keseluruhan (peti/dus/karton, dll)" : `${stokPartai} ${satuanPartai}`}</p>
                                <input value={hargaPartai} onChange={(e) => setHargaPartai(e.target.value)} type="text" disabled className={`${inter.className} bg-gray-200 cursor-not-allowed text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 800000"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Berat/jumlah/isi per {satuanPartai}</p>
                                <input value={jumSatPar} onChange={(e) => setJumSatPar(e.target.value)} type="text" disabled className={`${inter.className} bg-gray-200 cursor-not-allowed text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 12"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} pt-2 text-gray-500 text-[15px] flex items-center`}>Satuan</p>
                                <input value={satuan} onChange={(e) => setSatuan(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: pcs, kg, gr, lusin, dus, dll"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Jumlah stok berapa {satuan}</p>
                                <input value={stok} onChange={(e) => setStok(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 80"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Harga produk per {satuan}</p>
                                <input value={harga} onChange={(e) => setHarga(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 8000"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div>
                                <p className={`${inter.className} text-gray-500 text-[15px] flex items-center`}>Batas pengingat restok</p>
                                <input value={threshold} onChange={(e) => setThreshold(e.target.value)} type="text" className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Contoh: 20 (jika stok < 20pcs maka akan ada pengingat)"/>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center mb-4">
                    <button onClick={handleSubmit} className="px-20 py-1 bg-[#4170FF] text-white rounded-sm ">Simpan</button>
                </div>
            </div>
        </div>
    )
}