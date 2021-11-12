import { useState } from "react"
import { RiMeteorLine } from "react-icons/ri";
import "./App.css"

const Mine = ({ handleClick, isMine, mineSelected}) => {
  const isFail = isMine || (mineSelected&&Math.random()<0.2)

  return (
    <div className={`cell ${isFail && "fail"}`} onClick={handleClick}>
      { isFail &&
        <RiMeteorLine/>
      }
    </div>
  )
}

function App() {
  const [ width ] = useState(10)
  const [ height ] = useState(10)
  const [ mine, setMine ] = useState(-1)

  const handleClick = (location) => {
    if (mine > 0) return

    setMine(location)
  }

  const restart = () => {
    setMine(-1)
  }

  return (
    <div className="App">
      
      <h1>Minesweeber</h1>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${width}, 50px)`, gridAutoRows: 50 }}>
        {
          Array.from({ length: width * height }).map((_, i) => (
            <Mine isMine={i === mine} mineSelected={mine > 0} handleClick={() => handleClick(i)}/>
          ))
        }
      </div>

      { mine > 0 &&
        <button className="reset" onClick={restart}>reset</button>
      }

      <footer>
        <a alt="lol" href="https://www.youtube.com/watch?v=M5V_IXMewl4">made with 💋 by Tempo</a>
      </footer>

    </div>
  )
}

export default App
