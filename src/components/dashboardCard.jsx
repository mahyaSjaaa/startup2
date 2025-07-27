'use client'
import { inter, interSB } from "@/fonts/font"

export default function DashCard() {
    return (
        <div className="bg-white rounded-[8px] borded border-1 border-[#E0E0E0] w-[250px] h-[130px]">
            <div className="mx-7 my-4">
                <div className="flex justify-between">
                    <div>
                        <p className={`${inter.className} text-gray-500 text-[14px]`}>Penjualan Hari Ini</p>
                        <p className={`${interSB.className} text-[22px]`}>Rp. 2,455,000</p>
                    </div>
                    <p className="flex items-center">O</p>
                </div>
                <p className={`${inter.className} text-gray-500 text-[14px] mt-4`}> <span className="text-[#00D4A0]">+12%</span> dari kemarin</p>
            </div>
        </div>
    )
}