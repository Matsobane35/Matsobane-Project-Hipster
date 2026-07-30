import { X } from "lucide-react"
import type { AddOrEditProps } from "../types/addOrEditProps"
import icon_rating_active from "../assets/icon_rating_active.svg"
import icon_rating_inactive from "../assets/icon_rating_inactive.svg"
import { useState } from "react"
import DropdownMenu1 from "./dropdown/DropdownMenu1"

export default function AddOrEdit(
    { coffee, methodsData, setShowPopup, onAdded, onEdited, onDeleted } : AddOrEditProps
) {

    function updateRatingIcons(indexClicked: number) {
        setRatingIcons((previousIcons) => 
            previousIcons.filter(icon => icon === icon_rating_active).length === indexClicked + 1 ? previousIcons : [
            ...Array(indexClicked + 1).fill(icon_rating_active),
            ...Array(4 - indexClicked).fill(icon_rating_inactive)
        ])
    }

    const [expanded, setExpanded] = useState(false)

    const [beansInput, setBeansInput] = useState(coffee.beans)
    const [methodInput, setMethodInput] = useState(coffee.method)
    const [coffeeGramsInput, setCoffeeGramsInput] = useState(coffee.coffeeGrams)
    const [waterGramsInput, setWaterGramsInput] = useState(coffee.waterGrams)
    const [notesInput, setNotesInput] = useState(coffee.tastingNotes)
    const [ratingIcons, setRatingIcons] = useState([
            ...Array(coffee.rating).fill(icon_rating_active),
            ...Array(5 - coffee.rating).fill(icon_rating_inactive)
        ])

    const newCoffee = {
        id: coffee.id,
        beans: beansInput,
        method: methodInput,
        coffeeGrams: coffeeGramsInput,
        waterGrams: waterGramsInput,
        rating: ratingIcons.filter(icon => icon === icon_rating_active).length,
        tastingNotes: notesInput
    }

    function isInvalidEntry(): string {
        if (!beansInput.trim()) {
            return "Please enter a valid name for 'Beans'"
        }
        else if (!methodInput) {
            return "Please enter/select a valid name for 'Brewing method'"
        }
        else if (!coffeeGramsInput || 
            !(parseInt(coffeeGramsInput) >= parseInt(`${1}${"0".repeat(coffeeGramsInput.length-1)}`) && 
            parseInt(coffeeGramsInput) <= parseInt(`${9}${"9".repeat(coffeeGramsInput.length-1)}`))
        ) {
            return "Please enter a valid, positive whole number for 'Coffee (grams)'"
        }
        else if (!waterGramsInput || 
            !(parseInt(waterGramsInput) >= parseInt(`${1}${"0".repeat(waterGramsInput.length-1)}`) && 
            parseInt(waterGramsInput) <= parseInt(`${9}${"9".repeat(waterGramsInput.length-1)}`))
        ) {
            return "Please enter a valid, positive whole number for 'Water (grams)'"
        }
        return ""
    }

    return (
        <div onClick={() => setShowPopup(false)} className="flex items-center justify-center fixed bg-black/40 w-screen min-h-screen z-10">
            <div onClick={e => e.stopPropagation()} className="px-5 pb-5 h-fit w-screen max-w-125 flex flex-col rounded-xl bg-white shadow-lg">
                <div className="flex items-center justify-between py-5">
                    <p className="size-fit text-[#201711] text-[1.5rem]">{coffee.beans.trim() ? "Edit a brew" : "Add a brew"}</p>
                    <button onClick={() => setShowPopup(false)}>
                        <X size={32} className="text-black p-1.5 rounded-md hover:bg-gray-200 hover:cursor-pointer"/>
                    </button>
                </div>
                <div className="flex flex-col">
                    <p className="text-[0.9rem]">Beans<sup>*</sup></p>
                    <input onChange={e => setBeansInput(e.target.value)} value={beansInput} className="border border-gray-300 rounded-md text-[0.9rem] py-1 px-2 w-full hover:border-blue-500"/>
                    <p className="text-[0.9rem] mt-2">Brewing method<sup>*</sup></p>
                    <DropdownMenu1 
                    expanded = {expanded}
                    setExpanded={setExpanded}
                    brewingMethod={methodInput} 
                    methodsData={methodsData} 
                    onBrewingMethodSelected={setMethodInput}/>
                    <div className="flex items-center justify-between gap-3 mt-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-[0.9rem]">Coffee (grams)<sup>*</sup></p>
                            <input onChange={e => setCoffeeGramsInput(e.target.value.trim())} value={coffeeGramsInput} className="border border-gray-300 rounded-md text-[0.9rem] py-1 px-2 w-full hover:border-blue-500"/>
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-[0.9rem]">Water (grams)<sup>*</sup></p>
                            <input onChange={e => setWaterGramsInput(e.target.value.trim())} value={waterGramsInput} className="border border-gray-300 rounded-md text-[0.9rem] py-1 px-2 w-full hover:border-blue-500"/>
                        </div>
                    </div>
                    <p className="text-[0.9rem] mt-2">Tasting notes</p>
                    <input onChange={e => setNotesInput(e.target.value)} value={notesInput} type="text" className="border border-gray-300 rounded-md text-[0.9rem] py-1 px-2 w-full hover:border-blue-500"/>
                    <p className="text-[0.9rem] mt-4 place-self-center">Select a rating</p>
                    <div className="flex w-fit gap-2 place-self-center mt-0.5">
                        {ratingIcons.map((icon, index) => <img onClick={() => updateRatingIcons(index)} key={index} src={icon} className="size-8 hover:cursor-pointer hover:scale-[120%] transition-transform duration-150 ease-out"/>)}
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    {coffee.beans && <button onClick={() => {onDeleted(newCoffee); setShowPopup(false)}} className="px-8 py-1.5 text-[0.7rem] bg-red-800 rounded-[100px] text-white hover:bg-red-500 hover:cursor-pointer">
                        Delete
                    </button>}
                    <button onClick={() => {
                        isInvalidEntry() ? alert(isInvalidEntry()) : 
                        coffee.id ? 
                        onEdited({
                            id: newCoffee.id,
                            beans: newCoffee.beans.trim(),
                            method: newCoffee.method.trim(),
                            coffeeGrams: newCoffee.coffeeGrams.trim(),
                            waterGrams: newCoffee.waterGrams.trim(),
                            rating: newCoffee.rating,
                            tastingNotes: newCoffee.tastingNotes.trim()
                        }) : 
                        onAdded({
                            id: newCoffee.id,
                            beans: newCoffee.beans.trim(),
                            method: newCoffee.method.trim(),
                            coffeeGrams: newCoffee.coffeeGrams.trim(),
                            waterGrams: newCoffee.waterGrams.trim(),
                            rating: newCoffee.rating,
                            tastingNotes: newCoffee.tastingNotes.trim()
                        });
                        !isInvalidEntry() && setShowPopup(false)
                        }} className="px-8 py-1.5 text-[0.7rem] bg-black rounded-[100px] text-white hover:bg-gray-800 hover:cursor-pointer">
                        Save
                    </button>
                </div>
            </div>
            {expanded && <div onClick={e => {setExpanded(false); e.stopPropagation()}} className="h-screen w-screen fixed z-10"></div>}
        </div>
    )
}
