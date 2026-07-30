import type { Coffee } from "./coffee"

export interface AddOrEditProps {
    coffee: Coffee
    methodsData: string[]
    setShowPopup: (showPopup: boolean) => void
    onAdded: (coffee: Coffee) => void
    onEdited: (coffee: Coffee) => void
    onDeleted: (coffee: Coffee) => void
}
