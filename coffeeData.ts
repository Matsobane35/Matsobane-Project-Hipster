import type { Coffee } from "../types/coffee";

export const dummyCoffee = {
    id: 0,
    beans: "",
    method: "",
    coffeeGrams: "",
    waterGrams: "",
    rating: 0,
    tastingNotes: ""
  }

export const exampleData: Coffee[] = [
    {
        id: 1,
        beans: "Zimbabwean highlands",
        method: "Aeropress",
        coffeeGrams: "15",
        waterGrams: "200",
        rating: 3,
        tastingNotes: ""
    },
    {
        id: 2,
        beans: "Nigerian dark roast",
        method: "Drip coffee",
        coffeeGrams: "10",
        waterGrams: "120",
        rating: 5,
        tastingNotes: ""
    },
    {
        id: 3,
        beans: "Italian decaf",
        method: "V60",
        coffeeGrams: "20",
        waterGrams: "180",
        rating: 1,
        tastingNotes: ""
    }
]