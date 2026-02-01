import {useState} from "react";
const User = (props) => {
    const {name, location} = props  //all props(like name, location) passed to User component will come in props object which we can destructure
    const [count, setCount ] = useState(0)
    return(
        <div className="user-card">
            <h1>Counter : {count}</h1>
            <h2>{name}</h2>
            <h3>Location:{location}</h3>
            <h4>Contact @Adyakumari</h4>
        </div>
    )
}

export default User;