import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    // use ref hook 

    const passwordRef = useRef(null);

    const copyPasswordToClipboard = useCallback(() =>{
      passwordRef.current.setSelectionRange(0 ,5) 
      window.navigator.clipboard.writeText(password)
    } , [password])

    const passwordGenerator = useCallback(()=>{
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed) str += "0123456789";
      if(charAllowed) str += "@#$";

      for (let i = 0; i <= length; i++) {
        let char = Math.floor(Math.random()*str.length +1);     
        pass += str.charAt(char); 
      }
      setPassword(pass);

    } , [length , numberAllowed , charAllowed , setPassword])

    useEffect(() =>{
      passwordGenerator();
    } , [length , numberAllowed , charAllowed , passwordGenerator])

  return (
    <>
      <div
        className="flex flex-col justify-center items-center gap-6"
      >
        <h1 className="text-4xl text-gray-500 font-medium">
          Password Generator
        </h1>
        <div className="flex flex-col gap-4 max-w-md border border-gray-600 rounded-lg p-6 text-gray-500">
          <div className="flex">
            <input type="text" name="pass" id="password" readOnly  value={password} className="w-full rounded-l-md p-2 bg-white" ref={passwordRef} />
            <button className="px-4  py-2 text-white text-md font-semibold bg-[#4f46e5] hover:bg-opacity-90 rounded-r-md" onChange={copyPasswordToClipboard}>
              Copy
            </button>
          </div>
          <h2 className="text-2xl">Features</h2>
          <div id="features" className="flex flex-col gap-2 mt-6">
            <div id="length" className="flex gap-2 justify-center items-center">
              <span className="flex-1">Length ({length}) : </span>
              <input
                style={{ accentColor: "#4f46e5" }}
                type="range"
                id="length"
                min={8}
                max={24}
                step={1}
                value={length}
                onChange={(e)=> setLength(e.target.value)}
                className="flex-1"
              />
            </div>
            <div id="length" className="flex gap-2 justify-center items-center">
              <span className="flex-1"> Numbers : </span>
              <input
                style={{ accentColor: "#4f46e5" }}
                type="checkbox"
                name="check-box"
                id="numbers"
                onChange={()=> {
                  setNumberAllowed((prev) => !prev)
                }}
                className="w-5 h-5 flex-1 justify-start"
              />
            </div>
            <div id="length" className="flex gap-2 justify-center items-center">
              <span className="flex-1 whitespace-nowrap"> Characters : </span>
              <input
                style={{ accentColor: "#4f46e5" }}
                type="checkbox"
                name="check-box"
                id="numbers"
                onChange={()=> {
                  setCharAllowed((prev) => !prev)
                }}
                className="w-5 h-5 flex-1 justify-start"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
