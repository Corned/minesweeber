import { useState } from "react"
import Minesweeber from "./Minesweeber"
import Leaderboard from "./Leaderboard"

import "./App.css"

function App() {
  const [ route, setRoute ] = useState("minesweeber")

  const handleClick = (newRoute) => {
    return () => {
      setRoute(newRoute)
    }
  }

  return (
    <div className="App">

      <nav>
        <button onClick={handleClick("minesweeber")}>Minesweeber</button>
        <button onClick={handleClick("leaderboard")}>Leaderboard</button>
      </nav>
      
      { route === "minesweeber" &&
        <Minesweeber/>
      }

      { route === "leaderboard" &&
        <Leaderboard/>
      }
      
      <footer>
        <a alt="lol" href="https://www.youtube.com/watch?v=M5V_IXMewl4">made with 💋 by Tempo</a>
      </footer>
    </div>
  )
}

export default App
