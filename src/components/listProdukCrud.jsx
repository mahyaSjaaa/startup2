'use client'
import { inter, interSB } from "@/fonts/font"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function ListProdukCrud({ onEdit, baru}) {
  const [datas, setData] = useState([])
  const [search, setSearch] = useState('')
  const [searcData, setSearchData] = useState([])
  const [dataAlert, setDataAlert] = useState("tidak")
  const [refresh, setRefresh] = useState(0)

  const handleEdit = async (id) => {
    const { data, error } = await supabase.from('produk').select().eq('id', id).single()
    if (data) onEdit(data)
  }

  const handleSearch = async(keyword) => {
    const {data, error} = await supabase.from('produk').select().like('produk', `%${keyword}%`)
    if (data) setSearchData(data)
    if(data.length == 0) alert('data tidak ditemukan')
  }

  const handleDelete = async (id)=> {
    await supabase
  .from('produk')
  .delete()
  .eq('id', id)

  setRefresh((prev) => prev + 1)
  
  }

  useEffect(() => {
    console.log("ini");
    
    const fetchData = async () => {
      const { data, error } = await supabase.from('produk').select()
      if (data) setData(data)
    const cekStok = data?.some((i) => i.stok <= i.threshold)
      if(cekStok){
        setDataAlert("ada");
        console.log("ada");
        
      }else{
        setDataAlert("tidak")
      }
    }

    fetchData()
  }, [refresh, baru])

  useEffect(() => {
    console.log("atau ini?");
    
    if(search == '') {
        setSearch('')
        setSearchData('')
    }
  }, [search])

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
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>ID</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PRODUK</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>HARGA</th>
                                <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>STOK</th>
                            </tr>
                            </thead>
                            <tbody>
                            {datas?.filter((data) => data.stok <= data.threshold).map((data) => 
                            (
                                <tr key={data.id}>
                                    <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.id}</td>
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
                <div className="flex justify-between mx-7 mb-6">
                    <p className={`${interSB.className} text-[18px] flex justify-center`}>List Produk</p>
                    <div className="flex justify-end gap-2 mx-7">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className={`${inter.className} text-[15px] border border-gray-400 rounded-sm border-1 w-[400px] px-3 py-1`} placeholder="Cari berdasarkan produk"/>
                        <button onClick={() => handleSearch(search)} className="px-3 bg-[#E0E0E0] rounded-sm ">cari</button>
                    </div>
                </div>
                <div className="">
                    <table className="table-auto w-full">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>ID</th>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>PRODUK</th>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>HARGA</th>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-left`}>STOK</th>
                            <th className={`${interSB.className} text-[14px] text-gray-500 px-4 py-2 text-right`}>AKSI</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searcData != '' && search != ''? (
                           searcData?.map((data) => (
                            <tr key={data.id}>
                                <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.id}</td>
                                <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.produk}</td>
                                <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>Rp{data.harga}/{data.satuan}</td>
                                <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.stok} {data.satuan}</td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px] text-end`}>
                                    <button className="px-3 py-1 bg-[#4170FF] mr-2 text-white rounded-sm " onClick={() => handleEdit(data.id)}>edit</button>
                                    <button onClick={() => handleDelete(data.id)} className="px-3 py-1 bg-[#F77171] text-white rounded-sm ">hapus</button>
                                </td>
                            </tr>
                        )) 
                        ): (
                           datas?.map((data) => (
                            <tr key={data.id}>
                                <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.id}</td>
                                <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.produk}</td>
                                <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>Rp{data.harga}/{data.satuan}</td>
                                <td className={`px-4 py-2 ${inter.className} ${data.stok <= data.threshold && "text-[#F77171]"} text-[15px]`}>{data.stok} {data.satuan}</td>
                                <td className={`px-4 py-2 ${inter.className} text-[15px] text-end`}>
                                    <button className="px-3 py-1 bg-[#4170FF] mr-2 text-white rounded-sm " onClick={() => handleEdit(data.id)}>edit</button>
                                    <button onClick={() => handleDelete(data.id)} className="px-3 py-1 bg-[#F77171] text-white rounded-sm ">hapus</button>
                                </td>
                            </tr>
                        )) 
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}