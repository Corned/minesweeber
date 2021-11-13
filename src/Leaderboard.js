import "./Leaderboard.css"

const scores = [
  { name: "Gio", score: 1147 },
  { name: "Nico", score: 964 },
  { name: "Tempo", score: 810 },
  { name: "Timsterino", score: 521 },
]

const Score = ({ name, score }) => {
  return (
    <div className="score">
      <p className="name">{name}</p>
      <p className="score_">{score}</p>
    </div>
  )
}

function Leaderboard() {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="leaderboard__list">
        { 
          scores.map(({ name, score }) => 
            <Score name={name} score={score}/>
          )
        }

        {
          window.localStorage.getItem("username") &&
          <Score name={window.localStorage.getItem("username")} score={0}/>
        }
      </div>
    </div>
  )
}

export default Leaderboard
