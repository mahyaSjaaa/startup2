'use client'
import { inter, interSB } from "@/fonts/font"

export default function Navbar () {
    return(
        <div className="relative z-40">
            <div className="fixed top-0 right-0 border-b border-b-[#E0E0E0] w-[85%] py-3 bg-white">
                <div className="flex justify-between mx-10">
                    <div>
                        <p className={`${interSB.className}`}>Dashboard</p>
                        <p className={`${inter.className} text-gray-500 text-[14px]`}>Selamat datang kembali! Berikut ringkasan bisnis anda hari ini</p>
                    </div>
                    <p className="flex justify-center items-center">O</p>
                </div>
            </div>
        </div>
    )
}