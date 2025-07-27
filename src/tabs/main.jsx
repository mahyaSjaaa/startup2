'use client'
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/Navbar";
import DashCard from "@/components/dashboardCard";
import Terlaris from "@/components/cardTerlairs";
import DashTransaction from "@/components/DashTransaction";
import ListProduk from "@/components/listProduk";
import ListTransaksi from "@/components/listTransaksi";
import CrudProduk from "@/components/crudProduk";
import ListProdukCrud from "@/components/listProdukCrud";
import SettingUsaha from "@/components/settingUsaha";
import { supabase } from "@/lib/supabase";

import { inter, interSB } from "@/fonts/font";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Senin', penjualan: 400, pengeluaran: 400 },
  { name: 'Selasa', penjualan: 600, pengeluaran: 500 },
  { name: 'Rabu', penjualan: 300, pengeluaran: 300 },
  { name: 'Kamis', penjualan: 250, pengeluaran: 600 },
  { name: 'Jumat', penjualan: 800, pengeluaran: 400 },
  { name: 'Sabtu', penjualan: 700, pengeluaran: 200 },
  { name: 'Minggu', penjualan: 900, pengeluaran: 400 },
];


export default function Main() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [editData, setEditData] = useState(null)
  const [newData, setNewData] = useState(false)
  const [stateSelesai, setStateSelesai] = useState(false)

  const handleEdit = (data) => {
    setEditData(data)
  }

  const handleSubmit = async (formData) => {
    const { id, ...payload } = formData
    console.log(formData);
    
    
    if (id) {
      const { error } = await supabase
      .from('produk')
      .update(payload)
      .eq('id', id)
      console.log(error);
      
    } else {
      console.log(formData);
      try {
        const {data, error2} = await supabase.from("produk").select().eq('produk', formData.produk)
        if(data.length != 0) {
          console.log("nemu data?");
          
          const updatedPayload = {
            ...payload,
            stok: parseFloat(formData.stok) + data[0].stok
          }
          
          const { error } = await supabase
          .from('produk')
          .update(updatedPayload)
          .eq('produk', formData.produk)
          console.log(error);

          const { error3 } = await supabase
          .from('transaksi')
          .insert([
            { ...payload, jenis_transaksi: "PENGELUARAN", pengeluaran: formData.hargaPartai == 0 ? formData.harga * formData.stok : formData.hargaPartai }
          ])
          console.log(error3);
          setNewData(!newData)
        }else{
          const {error} = await supabase.from("produk").insert(payload)
          console.log(error);

          const { error4 } = await supabase
          .from('transaksi')
          .insert([
            { ...payload, jenis_transaksi: "PENGELUARAN", pengeluaran: formData.hargaPartai == 0 ? formData.harga * formData.stok : formData.hargaPartai }
          ])
          console.log(error4);
          setNewData(!newData)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }

    setEditData(null)
  }

  return (
    <div>
      <Navbar />
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="w-[85%] ml-auto">
        {activeMenu === "dashboard" && (
          <>
            <div className="flex justify-between pt-25 mx-10 flex-wrap space-y-5">
              <DashCard />
              <DashCard />
              <DashCard />
              <DashCard />
            </div>
            <div className="mt-7 flex justify-between mx-10 flex-wrap space-y-4">
              <div className="bg-white rounded-[8px] border border-[#E0E0E0] px-5 py-3">
                <div className="flex justify-between py-2 pb-2">
                  <p className={`${interSB.className} text-[18px]`}>Penjualan Mingguan</p>
                  <div className="flex justify-center gap-2">
                    <select id="produk" name="produk">
                        <option value="">Filter rekap</option>
                        <option value="susu">7 Hari</option>
                        <option value="teh">30 Hari</option>
                        <option value="indomie">3 bulan</option>
                    </select>
                  </div>
                </div>
                <LineChart
                width={480}
                height={300}
                data={data}
                margin={{ top: 10, right: 50, bottom: 5, left: 0 }}
                >
                <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis width="auto" label={{ value: 'Total', position: 'insideLeft', angle: -90 }} />
                <Tooltip />
                <Legend align="right" />

                <Line type="monotone" dataKey="penjualan" stroke="blue" strokeWidth={2} />
                <Line type="monotone" dataKey="pengeluaran" stroke="red" strokeWidth={2} />
                </LineChart>
              </div>
              <Terlaris />
            </div>
            <div className="mx-10 py-7">
              <DashTransaction />
            </div>
          </>
        )}
        {activeMenu === "transaksi" && 
        <div className="pt-25 px-10">
            <ListProduk stateSelesai={stateSelesai} setStateSelesai={setStateSelesai}/>    
            <ListTransaksi stateSelesai={stateSelesai}/>  
        </div>}
        {activeMenu === "produk" && 
        <div className="pt-25 px-10">
            <CrudProduk onSubmit={handleSubmit} editData={editData} />
            <ListProdukCrud onEdit={handleEdit} baru={newData}/>
        </div>}
        {activeMenu === "pelanggan" && <div className="p-10">Pelanggan Page</div>}
        {activeMenu === "web" && <div className="p-10">Website Builder Page</div>}
        {activeMenu === "setting" &&
        <div className="pt-25 px-10">
            <SettingUsaha/>
        </div>}
      </div>
    </div>
  );
}
