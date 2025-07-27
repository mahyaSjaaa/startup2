import { interSB, inter } from "@/fonts/font";

export default function Terlaris() {
    return (
        <div className="bg-white rounded-[8px] borded border-1 border-[#E0E0E0] w-[525px] h-[370px]">
            <p className={`${interSB.className} text-[18px] px-8 py-5`}>Produk Terlaris</p>
            <div className="flex justify-between mx-8">
                <div className="flex justify-center  gap-4">
                    <p className="flex items-center">O</p>
                    <div>
                        <p className={`${interSB.className} text-[15px]`}>Kopi Arabica</p>
                        <p className={`${inter.className} text-gray-500 text-[14px]`}>25 terjual</p>
                    </div>
                </div>
                <p className="flex items-center text-[#00D4A0]">Rp. 75.000</p>
            </div>
        </div>
    )
}