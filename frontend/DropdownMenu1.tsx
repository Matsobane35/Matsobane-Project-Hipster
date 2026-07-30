import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ContainerProps {
    methodsData: string[]
    brewingMethod: string
    expanded: boolean
    setExpanded: (expanded: boolean) => void
    onBrewingMethodSelected: (value: string) => void
}

export default function DropdownMenu1(
    {methodsData, brewingMethod, expanded, setExpanded, onBrewingMethodSelected} : ContainerProps
) {

    const [newMethodInput, setNewMethodInput] = useState("")

    return (
        <div className="flex flex-col relative z-30">
            <div onClick={() => setExpanded(!expanded)} className="flex border border-gray-300 rounded-md items-center justify-between py-1 px-2 w-full hover:border-blue-500 hover:cursor-pointer">
                <p className={brewingMethod ? "text-[0.95rem] text-black" : "text-[0.95rem] text-gray-400"}>
                    {brewingMethod ? brewingMethod : "Select brewing method"}
                </p>
                <button className="hover:cursor-pointer">
                    {expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
            </div>
            {expanded && <ul className="bg-white border border-gray-100 absolute place-self-center min-w-[95%] flex flex-col p-3 gap-1 mt-10 rounded-lg shadow-md max-h-50 overflow-scroll [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-1">
                    <input onChange={e => setNewMethodInput(e.target.value.trim())} placeholder="Add new method" type="text" className="flex-1 py-1.5 px-1.5 text-[0.8rem] bg-white border border-gray-300 hover:border-blue-500 rounded-md"/>
                    <button onClick={() => {onBrewingMethodSelected(newMethodInput); setExpanded(false)}} className="text-[0.8rem] bg-[#111d27] rounded-md px-2.5 hover:bg-[#343d44] hover:cursor-pointer text-white">
                        OK
                    </button>
                </div>
                {methodsData.map((method, index) => 
                <li key={index} onClick={() => {onBrewingMethodSelected(method); setExpanded(false)}} className="py-1.5 px-1.5 text-[0.8rem] w-full bg-[#f0f0f0] hover:bg-[#111d27] rounded-md hover:text-white hover:cursor-pointer">
                    {method}
                </li>)}
            </ul>}
        </div>
    )

}
