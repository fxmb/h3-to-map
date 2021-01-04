import {useState} from 'react'

export default function Home() {

  const [currentHex, setCurrentHex] = useState("");

  const changeInput = (input)  => {

    setCurrentHex(input.target.value)
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      alert("Input is " + currentHex);
    }
    

  }

  return (
    <>
    <input
      class="search"
      className="px-5 outline-none border-b-10"
      placeholder="Enter H3 Code"
      onChange={(e) => changeInput(e)}
      value={currentHex}
      onKeyDown={handleKeyDown}>
    </input>
    <p>{currentHex}</p>
  </>
  )
}
