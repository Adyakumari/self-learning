import { useMemo, useState } from "react";
import findNthPrime from "../utils/findPrime";

const Demo = () => {
    const[darkTheme , setDarkTheme] = useState(false);

    const [text, setText] = useState("");

    //heavy operation that is freezing the page even if the darktheme stated is updated it takes time to update. as soon as we have text like 1234567
    // const prime = findNthPrime(text);

    //Lets use useMemo hook that will return the cached value of the heavy operation until the text is updated.
    //Now we will see we can now toggle our theme without any delay or freezing behaviour as now it is using the cached
    // value of findPrime heavy operation between re-renders. (hence optimizing the user experiences)
    //useMemo hook accepts the calculated value (return value of function) as first parameter and second one is dependency array.
    const prime = useMemo(() => findNthPrime(text), [text])
    return(
    <div className= {"w-96 h-96 m-4 p-2 border border-black" +  (darkTheme && " bg-amber-400 text-white")}>
        <div>
            <button className="bg-green-400 rounded-lg m-10 p-2" onClick={() => setDarkTheme(!darkTheme)}>Toggle</button>
        </div>
        <div>
        <input className= "border border-black w-72 px-2"type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
            <h1>FindNthPrime: {prime}</h1>
        </div>
    </div>
    );
}

export default Demo;