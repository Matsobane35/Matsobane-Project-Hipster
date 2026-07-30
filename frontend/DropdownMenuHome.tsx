import { ChevronDown, ChevronUp } from "lucide-react"

interface ContainerProps {
    methodsData: string[]
    brewingMethod: string
    expanded: boolean
    setExpanded: (expanded: boolean) => void
    onBrewingMethodSelected: (value: string) => void
}

export default function DropdownMenuHome(
    {methodsData, brewingMethod, expanded, setExpanded, onBrewingMethodSelected} : ContainerProps
) {

    return (
        <div className={expanded ? "flex flex-col relative z-20" : "flex flex-col relative"}>
            <div onClick={() => setExpanded(!expanded)} className="flex border-2 border-gray-300 rounded-[100px] items-center justify-between py-1 px-3 w-full hover:border-blue-500 hover:cursor-pointer">
                <p className="text-[0.95rem] text-black">
                    {brewingMethod ? brewingMethod : "-- All brewing methods --"}
                </p>
                <button className="hover:cursor-pointer">
                    {expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
            </div>
            {expanded && <ul className="bg-white border border-gray-100 absolute place-self-center min-w-[95%] flex flex-col p-3 gap-1 mt-10 rounded-lg shadow-md max-h-50 overflow-scroll [&::-webkit-scrollbar]:hidden">
                <li onClick={() => {onBrewingMethodSelected(""); setExpanded(false)}} className="py-1.5 px-1.5 text-[0.8rem] text-gray-500 w-full bg-[#f0f0f0] hover:bg-[#111d27] rounded-md hover:text-white hover:cursor-pointer">
                    -- All brewing methods --
                </li>
                {methodsData.map((method, index) => 
                <li key={index} onClick={() => {onBrewingMethodSelected(method); setExpanded(false)}} className="py-1.5 px-1.5 text-[0.8rem] w-full bg-[#f0f0f0] hover:bg-[#111d27] rounded-md hover:text-white hover:cursor-pointer">
                    {method}
                </li>)}
            </ul>}
        </div>
    )
}
