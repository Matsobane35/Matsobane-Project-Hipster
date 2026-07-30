import { useEffect, useState } from "react"
import { dummyCoffee } from "./data/coffeeData"
import CoffeeItem from "./components/CoffeeItem"
import AddOrEdit from "./components/AddOrEdit"
import type { Coffee } from "./types/coffee"
import DropdownMenuHome from "./components/dropdown/DropdownMenuHome"

function App() {

  const [coffeeData, setCoffeeData] = useState<Coffee[]>([])

  useEffect(() => { async function getCoffeeData() {
    const response = await fetch("http://localhost:8080/brews", {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'}
    })
    const retrievedCoffeeData = await response.json()
    const newCoffeeList: Coffee[] = []
    const newMethodsList: string[] = []
    for (let i = 0; i <= retrievedCoffeeData.length - 1; i++) {
      newCoffeeList.push({...dummyCoffee,
        id: retrievedCoffeeData[i].coffee_id,
        beans: retrievedCoffeeData[i].beans_used,
        method: retrievedCoffeeData[i].brewing_method,
        coffeeGrams: retrievedCoffeeData[i].coffee_content,
        waterGrams: retrievedCoffeeData[i].water_content,
        rating: retrievedCoffeeData[i].preference_rating,
        tastingNotes: retrievedCoffeeData[i].tasting_notes
      })
    }
    for (let i = 0; i <= retrievedCoffeeData.length - 1; i++) {
      newMethodsList.push(retrievedCoffeeData[i].brewing_method)
    }
    setMethodsData(newMethodsList)
    setCoffeeData(newCoffeeList)
    setNextId(newCoffeeList.length + 1)
  }
  getCoffeeData()
  }, [])

  const [clickedItem, setClickedItem] = useState(dummyCoffee)
  const [showPopup, setShowPopup] = useState(false)
  const [nextId, setNextId] = useState(Math.max(...coffeeData.map(coffee => coffee.id), 0) + 1)
  const [methodsData, setMethodsData] = useState(coffeeData.map(coffee => coffee.method))
  const [methodToFilter, setMethodToFilter] = useState("")
  const [dropdownExpanded, setDropdownExpanded] = useState(false)

  const [itemToDelete, setItemToDelete] = useState(dummyCoffee)
  const [itemToUpdate, setItemToUpdate] = useState(dummyCoffee)
  const [itemToInsert, setItemToInsert] = useState(dummyCoffee)

  const [trackInsertChanges, setTrackInsertChanges] = useState(false)
  const [trackUpdateChanges, setTrackUpdateChanges] = useState(false)
  const [trackDeleteChanges, setTrackDeleteChanges] = useState(false)

  useEffect(() => {
    if (trackInsertChanges) {
      async function insertIntoDB() {
        await fetch(`http://localhost:8080/brews/:${itemToInsert.id}`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(itemToInsert)})
      }
      insertIntoDB()
    }
    else { setTrackInsertChanges(true) }
  }, [itemToInsert])

  useEffect(() => {
    if (trackUpdateChanges) {
      async function updateInDB() {
        await fetch(`http://localhost:8080/brews/:${itemToUpdate.id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(itemToUpdate)})
      }
      updateInDB()
    }
    else { setTrackUpdateChanges(true) }
  }, [itemToUpdate])

  useEffect(() => {
    if (trackDeleteChanges) {
      async function deleteFromDB() {
        await fetch(`http://localhost:8080/brews/:${itemToDelete.id}`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(itemToDelete.id)})
      }
      deleteFromDB()
    }
    else { setTrackDeleteChanges(true) }
  }, [itemToDelete])

  function alterDataAfterAdding(newCoffee: Coffee) {
    setCoffeeData(previousData => [{...newCoffee, id: nextId}, ...previousData])
    setItemToInsert({...newCoffee, id: nextId})
    setMethodsData(previousData => [newCoffee.method, ...previousData])
    setNextId(previousId => previousId + 1)
  }

  function alterDataAfterEditing(newCoffee: Coffee) {
    setCoffeeData(previousData => 
      previousData.map(coffee => coffee.id === newCoffee.id ? newCoffee : coffee)
    )
    setMethodsData(previousData => 
      previousData.toSpliced(previousData.indexOf(clickedItem.method), 1, newCoffee.method)
    )
    setItemToUpdate(newCoffee)
  }

  function alterDataAfterDeleting(deletedCoffee: Coffee) {
    setCoffeeData(previousData => previousData.filter(coffee => coffee.id !== deletedCoffee.id))
    setMethodsData(previousData => 
      previousData.toSpliced(previousData.indexOf(deletedCoffee.method), 1)
    )
    setItemToDelete(deletedCoffee)
  }

  function setNewClickedItem(itemId: number) {
    setClickedItem(coffeeData.filter(coffee => coffee.id === itemId)[0])
  }

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      <div className="flex flex-col gap-4 px-3 py-6">
        <div className="flex items-center justify-between">
          <p className="size-fit text-[#201711] text-[1.5rem]">Brew log</p>
          <button onClick={() => {setShowPopup(true), setClickedItem(dummyCoffee)}} className="px-8 py-1.5 text-[0.7rem] bg-black rounded-[100px] text-white hover:bg-gray-800 hover:cursor-pointer">
            Add
          </button>
        </div>
        <DropdownMenuHome 
        expanded = {dropdownExpanded}
        setExpanded={setDropdownExpanded}
        brewingMethod={methodToFilter}
        methodsData={[...new Set(methodsData)]}
        onBrewingMethodSelected={setMethodToFilter}/>
      </div>
      <div className="flex-1 px-3">
        <ul className="border-t">
          {(methodToFilter ? coffeeData.filter(coffee => coffee.method === methodToFilter) : coffeeData).map(coffee => (
            <CoffeeItem 
            key={coffee.id}
            coffee={coffee} 
            setShowPopup={setShowPopup} 
            setClickedItem={setNewClickedItem} />
        ) )}
        </ul>
      </div>
      {dropdownExpanded && <div onClick={() => setDropdownExpanded(false)} className="h-screen w-screen fixed z-10"></div>}
      {showPopup && 
      <AddOrEdit 
      methodsData={[...new Set(methodsData)]}
      coffee={clickedItem} 
      setShowPopup={setShowPopup} 
      onAdded={alterDataAfterAdding} 
      onEdited={alterDataAfterEditing} 
      onDeleted={alterDataAfterDeleting}/> }
    </div>
  )
}

export default App
