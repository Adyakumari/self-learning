import { CDN_URL } from "../utils/constants";

const ItemList = ({itemCards}) => {
    return(
        <div>
        <ul>
            {itemCards.map((item) => (
                <div key={item?.card?.info?.id} className="p-2 m-2 border-gray-200 border-b-2 flex justify-between text-left">
                <div className="w-9/12">
                <div className="py-3">
                  <span className="px-2 text-lg font-bold">{item?.card?.info?.name}</span>
                  <span className="px-2"> ₹ {item?.card?.info?.price / 100}</span>
                </div>
                  <p className="text-[15px">{item?.card?.info?.description}</p>
                </div>
                <div className="p-2 w-4/12">
                    <div className="absolute">
                       <button className="p-2 shadow-lg bg-white rounded-2xl mx-16 ">Add + </button>
                    </div>
                    <img className="rounded-md" src={CDN_URL + item.card.info.imageId} />
                </div>
              
                </div>
            ))}
        </ul>
        </div>
    )
}

export default ItemList;