import type { Coffee } from "./coffee";

export interface CoffeeItemProps {
    coffee: Coffee
    setShowPopup: (showPopup: boolean) => void
    setClickedItem: (itemId: number) => void
}