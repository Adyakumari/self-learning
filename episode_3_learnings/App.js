import React from "react";
import ReactDOM from "react-dom/client";

//Jsx is not HTML (It is HTML-like syntax or XML like syntax)
//Babel converts JSX to React.createElement() calls --> ReactElement --> Html Element(render)

//React element --> Object
// const heading = (<h1 id="heading" className="root" tabIndex="1">
//     Hello world from JSX
//     </h1>);
// console.log(heading);

//React Component 
//Class Based component --Old way of writing components
//Functional component --New way of writing components

//React Functional Component
//This is just a normal Javascript function which returns some peice of JSX 
// or we can say React Element 
//we write component name in PascalCase
//we can use arrow function to write functional component

//One way 
const HeadingComponent = () => {
    return <h1 id="heading">I am react functional component</h1>
}
//Second way , we can write without return keyword and curly braces as well 
const HeadingComponent2 = () => <h1>I am react functional component</h1>


//Let see some nested components (we can have nested components as well)
const Title = () => <h1 className="root" tabIndex={1}>Hello world from JSX</h1>
//Using Title component inside HeadingComponent3 (will replace <Title/> with Title component code) -done by babel
//This is also called functonal composition
const HeadingComponent3 = () => 
    (
        <div id="container">
            <Title /> 
            <h1 id="heading">I am a react functional component</h1>
        </div>
    )


//We can place javascript expressions/code inside JSX using {} (any javascript code)
//We see all possible combinations of React element, JSX, Functional Component and Javascript expressions (all are possible)
const ele = <span> This is span element </span>;
const heading = <h1> {ele} I am a JSX react element</h1> /* we can use react element inside jsx using {} */
const name = "Adya Kumari";
const HeadingComponent4 = () => 
(
     <div id="container">
        {name} {/* we can use javascript variable inside component using {} */}
        {100 + 300}
        <Title />
        {Title()} {/* we can also call component as a function instead of <Title/> */}
        <Title></Title> {/* this is also valid */}
        {heading} {/* we can also use react element inside component using {} */}
        <h1 id="heading">I am a react functional component</h1>
        </div>
)

//We can call functional component inside the React elemet as well(not recommended but possible)
//make sure parenthesis are used to wrap multiple elements and jsx fragment <> </> is used to avoid extra divs
const jsxElement = (
    <>
        <h1> I am a JSX react element</h1>
        {HeadingComponent4()}
        <HeadingComponent4 />
    </>
);

//we can use function keyword as well to define functional component(apart from arrow function but arrow function is recommended/better practices)
//Make sure to use return keyword here
const HeadingComponent5 = function(){
    return <h1> I am a functional component using function keyword</h1>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
//Now how to render a functional component
// root.render(HeadingComponent); //This will not work as we are trying to render a function

// we render it like withing angle brackets so that babel understands that it is a component
//root.render(<HeadingComponent />);
// root.render(<HeadingComponent4 />);
root.render(jsxElement);