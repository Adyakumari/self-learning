import { useState, useRef } from "react";

const Demo2 = () => {
    let x = 10;
    const [y, setY] = useState(null);
    const ref = useRef(null);
    //Using useRef will return a object (not a value only) 
    // {
    // current: {}
    // }
    //Hence we can access it using ref.current 
    // ref variable will persist the value between re-renders (unlike normal javascript )
    // and whenever state variable updates , it shows that current value on the UI 
    return(
        <div className="w-96 h-96 border border-black p-2 m-4">
            <div>
                <button className="bg-green-200 p-2 m-4" onClick={() => {
                    x =  x + 1;
                    console.log(x); 
                }}>
                    Increase x
                </button>
                <span className="font-bold text-xl"> Normal JS variable{x}</span>
            </div>

            <div>
                <button className="bg-green-200 p-2 m-4" onClick={() => {
                    setY(y+1)
                }}>
                    Increase y
                </button>
                <span className="font-bold text-xl"> State variable {y}</span>
            </div>

            <div>
                <button className="bg-green-200 p-2 m-4" onClick={() => {
                    ref.current = ref.current + 1
                    console.log(ref.current);
                }}>
                    Increase z
                </button>
                <span className="font-bold text-xl"> Ref variable {ref.current}</span>
            </div>
        </div>
    )
}

export default Demo2;