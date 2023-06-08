"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
  const maxLength: number = 10;
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<number>(0)
  const [isMaxLength, setIsMaxLength] = useState<boolean>(false);

  useEffect(() => {
    setIsMaxLength(input.toString().length >= maxLength);
  }, [input, maxLength]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let num: string = e.target.value;
    if (num.slice(-1) !== "0" && num.slice(-1) !== "1" && num !== "") {
      toast.error("Not a binary character", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        theme: "dark",
      });
    }
    num = num.replace(/[^0-1.]/g, '');
    setInput(num)
    let dec_value: number = 0;
    // Initializing base value to 1, i.e 2^0
    let base: number = 1;
 
    let temp: number = parseInt(num, 10);
    while (temp) {
        let last_digit: number = temp % 10;
        temp = Math.floor(temp / 10);
 
        dec_value += last_digit * base;
 
        base = base * 2;
    }
 
    return setOutput(dec_value);
  }

  return (
    <div>
      <div className='h-screen flex flex-col items-center justify-between'>
          <div className="mt-20 text-4xl h-40">
            Bin2Dec
          </div>
          <div className="flex flex-row h-20">
            <div className="flex flex-col text-black mr-4 justify-between pointer-events-none">
              <div className="p-2 mb-2 bg-white">
                Bin:
              </div>
              <div className="p-2 mt-2 bg-white">
                Dec:
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <input className="p-2 mb-2 w-32 text-white flex flex-col bg-black caret-red-600 accent-red-600 border border-1 border-white focus:outline-none focus:border focus:border-1 focus:border-red-600" value={input} placeholder="0" type="text" onChange={onChange} maxLength={maxLength}/>
              <div className="p-2 mt-2 pointer-events-none">
                {output}
              </div>
            </div>
          </div>
          <div className="h-40 mb-10 flex flex-col justify-end mb-20">
            {isMaxLength && <p className="text-red-600 text-lg">Character limit reached</p>}
          </div>
      </div>
      <ToastContainer pauseOnFocusLoss={false}/>
    </div>
  )
}

export default Home;
