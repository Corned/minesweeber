import { useState } from "react"
import { RiMeteorLine } from "react-icons/ri";
import "./Minesweeber.css"
import SubmitScore from "./SubmitScore";

const Mine = ({ handleClick, isMine, bombNeighbors}) => {
  let color = "transparent"

  if (bombNeighbors === 8) {
    color = "gray"
  } else if (bombNeighbors === 7) {
    color = "black"
  } else if (bombNeighbors === 6) {
    color = "turqoise"
  } else if (bombNeighbors === 5) {
    color = "crimson"
  } else if (bombNeighbors === 4) {
    color = "purple"
  } else if (bombNeighbors === 3) {
    color = "red"
  } else if (bombNeighbors === 2) {
    color = "green"
  } else if (bombNeighbors === 1) {
    color = "blue"
  }


  return (
    <div className={`cell ${isMine && "fail"} ${bombNeighbors === 0 && "hide"}`} onClick={handleClick}>
      { isMine
        ? <RiMeteorLine/>
        : <p style={{ color }}>{ bombNeighbors }</p>
      }
    </div>
  )
}

const A = 10

function Minesweeber() {
  const [ cellState, setCellState ] = useState(
    Array.from({ length: A * A })
    .map(() => ({
      bombNeighbors: -1,
      isBomb: false
    }))
  )

  const [ gameover, setGameover ] = useState(false)
  const [ name, setName ] = useState("")
  const [ showPopup, setShowPopup ] = useState(false)

  const handleClick = (location) => {
    if (gameover) return
    let newState = [ ...cellState ].map((cell, index) => ({
      bombNeighbors: cell.bombNeighbors,
      isBomb: (location === index) || Math.random() < 0.2,
    }))

    newState = newState.map((cell, index) => {
      const x = index % A
      const y = Math.floor(index / A)
      let neighbors = 0

      if (cell.isBomb) return cell

      for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
          const newX = x + dx
          const newY = y + dy
          const newLoc = newY * A + newX

          if (Math.abs(newX - x) > 1 || Math.abs(newY - y) > 1) continue
          if (newX < 0 || newY < 0) continue
          if (newLoc < 0 || newLoc > A*A) continue
          if (newLoc === index) continue

          try {
            const c = newState[newLoc]
            if (c.isBomb) neighbors++
          } catch (error) {

          }
        }
      }

      return {
        bombNeighbors: neighbors,
        isBomb: cell.isBomb
      }
    })

    setGameover(true)
    setCellState(newState)
    setShowPopup(true)
  }

  const restart = () => {
    setGameover(false)
    setCellState(
      Array.from({ length: A * A })
      .map(() => ({
        bombNeighbors: -1,
        isBomb: false
      }))
    )
  }

  const closepopup = () => {

  }

  return (
    <div className="minesweeber">
      
      <h1>Minesweeber</h1>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${A}, 50px)`}}>
        {
          cellState.map(({ bombNeighbors, isBomb }, index) => (
            <Mine
              isMine={isBomb}
              bombNeighbors={bombNeighbors}
              handleClick={() => handleClick(index)}
            />
          ))
        }
      </div>

      { showPopup &&
        <SubmitScore close={() => setShowPopup(false)}/>
      }

      { gameover &&
        <button className="restart" onClick={restart}>Play again!</button>
      }


    </div>
  )
}

export default Minesweeber
