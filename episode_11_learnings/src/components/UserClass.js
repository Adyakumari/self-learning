import React from "react";
import User from "./User";

class UserClass extends React.Component{
    //We nee to use contructor to recieve the props, all props passed to UserClass will be present inside props object.
    constructor(props){
        super(props); //Must to be there as we use this.props to access props
        console.log(props);
        console.log(this.props.name + "Child constructor");
        //this is how we write our state variables, all state variables can be written inside this.state object inside constructor method s
        this.state = {
            count: 0,
            count2: 0,
            userInfo:{
                name: "dummy", 
                location: "xyz"
            }
        }
    }
//Called only once after initial render in mounting phase 
    async componentDidMount() {
        console.log(this.props.name + "Child componentDidMount")
        const data = await fetch("https://api.github.com/users/Adyakumari");
        const json = await data.json();
        this.setState({
            userInfo: json
        })
        this.timer = setInterval(() => {
            console.log("SetInterval is running in UserClass(in About)")
        }, 1000);
    }
//Called after every update in state variable in update phase (after every re-render)
    componentDidUpdate(){
        console.log("componentDidUpdate is called")
    }

//Called when we move out of the page or component is no longer on the page
    componentWillUnmount(){
        // We need to clear all the mess we created like setInterval otherwise it will go on running and effect performance
        //Will be called when component will unmount
        clearInterval(this.timer);
        console.log("componentWillUnmount is called ")
    }

    
    render() {
        console.log(this.props.name + "Child render");
        // const {name, location} = this.props;
        // const {count, count2 } = this.state;
        const { name, avatar_url, bio, location, login} = this.state.userInfo;
        //this.setState will update the state variable and only update the required portion of the object,
        // basically updates only those variables which we provide inside the object , like count (will not update count2, or count3)
        // we can batch the state variables to update inside same this.setState method (no need to create another)
        //Keeps varaiables inside object isolated 
        //Will re-render the component on every state update. (like how many times we increment counter, it will re-render and 
        // behind the scenes apply diffing algorithm and update that node only which changed)
        return (
            <div className="user-class">
                <h2>Member </h2>
                <div className="logo-container">
                    <img className="logo" src={avatar_url} />
                </div>
                {/* <h1>Counter: {count}</h1>
                <button onClick={() => {this.setState({
                    //NEVER UPDATE STATE VARIABLES DIRECTLY (USE this.setState() method)
                    count: this.state.count + 1
                })}}>Increment counter</button> */}
                {/* <h1>Counter 2: {count2}</h1> */}
                <h2>Name: {name}</h2>
                <h3>Bio: {bio}</h3>
                <h3>Location: {location}</h3>
                <h4>Github: {login}</h4>
            </div>
        )
    }
}

export default UserClass;


/* LifeCycle method
-------Mounting ...-------


* Constructor called(dummy data)
* Render(dummy data) --so that we have something to show on page on initial render 
        <HTML> rendered with dummy data 
* ComponentDidMount called
        <API CALL> 
        <this.setState> state variable is update with the fetched data 

------UPDATING -----
        render(with API data now)
        <HTML> rendered with new API data 
        componentDidUpdate is called (after every update)

----UNMOUNTING -----
    when we move out of the page, componentWillUnmount will be called


*/