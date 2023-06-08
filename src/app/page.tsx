"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const maxLength = 10;
  const [input, setInput] = useState(0)
  const [output, setOutput] = useState(0)
  const [isMaxLength, setIsMaxLength] = useState(false);

  useEffect(() => {
    setIsMaxLength(input.toString().length >= maxLength);
  }, [input, maxLength]);

  const onChange = (e) => {
    let num = e.target.value;
    num = num.replace(/[^0-1.]/g, '');
    setInput(num)
    let dec_value = 0;
 
    // Initializing base value to 1, i.e 2^0
    let base = 1;
 
    let temp = num;
    while (temp) {
        let last_digit = temp % 10;
        temp = Math.floor(temp / 10);
 
        dec_value += last_digit * base;
 
        base = base * 2;
    }
 
    return setOutput(dec_value);
  }

  return (
    <div className='h-screen flex flex-col items-center justify-between'>
        <div className="mt-10 text-4xl h-40">
          Bin2Dec
        </div>
        <div className="flex flex-row h-20">
          <div className="flex flex-col text-black mr-4 justify-between">
            <div className="p-2 mb-2 bg-white">
              Bin:
            </div>
            <div className="p-2 mt-2 bg-white">
              Dec:
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <input className="p-2 mb-2 w-32 text-white flex flex-col bg-black caret-red-600 accent-red-600 border border-1 border-transparent focus:outline-none focus:border focus:border-1 focus:border-red-600" value={input} placeholder="0" type="text" onChange={onChange} maxLength={maxLength}/>
            <div className="p-2 mt-2">
              {output}
            </div>
          </div>
        </div>
        <div className="h-40 mb-10">
          {isMaxLength && <p className="text-red-600 text-lg">Character limit reached</p>}
        </div>
    </div>
  )
}
