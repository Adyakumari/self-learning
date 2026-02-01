import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    console.log(props); //Returns as an object containing all the props passed (here resData object is the prop passed)
    const {resData} = props; //Destructuring props to get resData object

    const {name, cuisines, avgRating, deliveryTime, costForTwo, cloudinaryImageId, sla} = resData?.info;
    return (
        <div className="res-card">
            <img className="res-logo" src={ CDN_URL + cloudinaryImageId} />
            <h3>{name}</h3>
            <h3>{cuisines.join(", ")}</h3>
            <h3>{avgRating} stars</h3>
            <h3>{sla.deliveryTime} mins</h3>
            <h3>{costForTwo}</h3>
        </div>
    )
}

export default RestaurantCard;