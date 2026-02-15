import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/userContext";
import { useContext } from "react";

// const About = () => {
//      return (
//         <div className="about-page">
//             <h1>About Us page</h1>
//             <h2>We are a team of passionate food lovers</h2>
//             <p>Our mission is to deliver delicious meals to your doorstep</p>
//             <User name={"Adya Kumari"} location={"Bengaluru"}/>
//             <UserClass name={"Adya Kumari"} location={"Bengaluru"} /> {/**Passing props is same as functional component in class based component */}
//         </div>
//      )
// }

//Class based parent Component 
//Lifecycle method flow:
// Parent constructor -> Parent render --> child constructor --> child render --> child componentDidUpdate --> Parent ComponentDidUpdate
class About extends React.Component{
    constructor(props){
        super(props);
        console.log("Parent Constructor");
    }

    //This componentDidMount will be called at the very end, once the render method is completed
    // (including child component lifecycle methods with its componentDidUpdate as well)
    // and component is fully mounted on the page successfully
    componentDidMount() {
        console.log("Parent componentDidMount")
        //API Call (because it will called after the initial render , hence we fetch the data after render and then once data is fetched, re-render with data)
        //Similar to useEffect hook in functional components
    }

/** This is how we consume components in class based components using UserContext.Consumer */

    render() {
        console.log("Parent render");
       return(
        <div className="about-page">
            <h1>About Us page</h1>
            <h2>We are a team of passionate food lovers</h2>
            <UserContext.Consumer> 
               {({loggedInUser}) => <h1 className="font-bold">{loggedInUser}</h1>}
            </UserContext.Consumer>
            <p>Our mission is to deliver delicious meals to your doorstep</p>
            <UserClass name={"First Child"} location={"Bengaluru"} /> {/**Passing props is same as functional component in class based component */}
            <UserClass name={"Second Child"} location={"Bengaluru"} />
            <UserClass name={"Third Child"} location={"Bengaluru"} />
        </div>
        )
    }

}

export default About;

/* 
LifeCycle method with multiple childs:
- Parent Constructor
- Parent render
//(Render Phase) of all child are batched together
     - First child constructor
     - First Child render

     - Second child constructor
     - Second child render 

     - Third child constructor 
     - Third child render 

     - DOM UPDATED - SINGLE BATCH 
//(Commit phase) of all childs batched together 
     - First child componentDidUpdate 
     - Second child componentDidUpdate 
     - Thrird Child componentDidUpdate
- Parent ComponentDidUpdate



*/