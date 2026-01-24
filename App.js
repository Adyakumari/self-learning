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

const parent = React.createElement("div", {id:"parent"}, [React.createElement("div",
    {id:"child"}, [React.createElement("h1", {}, "I'm a h1 tag"), React.createElement("h2", {}, "I'm a h2 tag")
]), React.createElement("div",
    {id:"child2"}, [React.createElement("h1", {}, "I'm a h1 tag"), React.createElement("h2", {}, "I'm a h2 tag")
])]);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);