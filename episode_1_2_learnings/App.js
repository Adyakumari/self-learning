// const heading = React.createElement("h1", {id: "heading", xyz:"abc"}, "Hello world from React");
// console.log(heading); //Returns a React element object

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading) //Renders the React element object to the DOM

/*
* <div id = "parent">
*     <div id = "child"> 
*         <h1>I'm a h1 tag</h1>
*         <h2>I'm a h2 tag</h2>
*     </div>
*     <div id = "child"> 
*         <h1>I'm a h1 tag</h1>
*         <h2>I'm a h2 tag</h2>
*     </div>
* </div>
*
*/
import React from "react"; //With using react package now
import ReactDOM from "react-dom/client";

const parent = React.createElement("div", {id:"parent"}, [React.createElement("div",
    {id:"child"}, [React.createElement("h1", {}, "I'm a h1 tag"), React.createElement("h2", {}, "I'm a h2 tag")
]), React.createElement("div",
    {id:"child2"}, [React.createElement("h1", {}, "I'm a h1 tag"), React.createElement("h2", {}, "I'm a h2 tag")
])]);

console.log(parent);


//Jsx is not HTML (It is HTML-like syntax or XML like syntax)
//Babel converts JSX to React.createElement() calls --> ReactElement --> Html Element(render)
const JSXElement = (<h1 id="heading" className="root" tabIndex="1">
    Hello world from JSX
    </h1>);
console.log(JSXElement);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(JSXElement);