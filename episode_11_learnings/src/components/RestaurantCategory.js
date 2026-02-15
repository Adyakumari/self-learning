import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data, showItem, setShowItem}) => {
    // const[showItem, setShowItem] = useState(false); //Lift the state up (instead of handling the state for each children , give the control to the parent component)
    const clickHanlder = () => {
           setShowItem();  //Pass in showItem and setShowItem as props
           //onClick it will call setShowItem that will set the index to that category div index so that only that opens and other collapse
    }
    return(
        <div>
        <div className="w-6/12 bg-slate-100 shadow-lg rounded-sm p-4 mx-auto my-4  font-serif" onClick={clickHanlder}>
           <div className="flex justify-between">
            <span>{data.title}({data.itemCards.length})</span>
            <span>⬇️</span>
            </div>
            {showItem && <ItemList itemCards={data.itemCards} />} 
        </div>
        </div>
    )
}

export default RestaurantCategory;