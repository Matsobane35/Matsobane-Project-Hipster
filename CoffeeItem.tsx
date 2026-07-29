import { Edit } from "lucide-react";
import type { CoffeeItemProps } from "../types/coffeeItemProps";
import image_coffee from "../assets/image_coffee.jpg";
import image_water from "../assets/image_water.png";
import icon_rating_active from "../assets/icon_rating_active.svg"

export default function CoffeeItem({ coffee, setShowPopup, setClickedItem }: CoffeeItemProps) {
    return (
        <li onClick={() => {setClickedItem(coffee.id); setShowPopup(true)}} key={coffee.id} className="flex border-b py-3 gap-3 items-center hover:cursor-pointer hover:bg-[#f0f0f0]">
            <div className="grid grid-cols-1 grid-rows-1 size-9">
                <img className="col-start-1 row-start-1 place-self-center" src={icon_rating_active}/>
                <p className="col-start-1 row-start-1 text-[0.8rem] place-self-center text-black font-semibold">{coffee.rating}</p>
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <p className="size-fit font-bold">{coffee.beans}</p>
                <div className="flex gap-2">
                    <p className="px-3 py-1 text-[0.7rem] flex border-2 border-gray-300 rounded-[100px]">{coffee.method}</p>
                    <div className="px-3 py-1 border-2 border-gray-300 rounded-[100px] flex justify-center gap-1 items-center">
                        <img src={image_coffee} className="size-3.5"/>
                        <p className="text-[0.7rem]">{coffee.coffeeGrams}<span>g</span></p>
                    </div>
                    <div className="px-3 py-1 border-2 border-gray-300 rounded-[100px] flex justify-center gap-1 items-center">
                        <img src={image_water} className="size-2.5"/>
                        <p className="text-[0.7rem]">{coffee.waterGrams}<span>g</span></p>
                    </div>
                </div>
            </div>
            <button className="hover:cursor-pointer">
                <Edit size={20} className="text-black"/>
            </button>
        </li>
    )
}