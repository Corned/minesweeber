import { useEffect, useState } from "react"

import "./SubmitScore.css"

function SubmitScore({ close }) {
  const [ name, setName ] = useState("")
  const [ fadeIn, setFadeIn ] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true)
    }, 1000)

    return
  }, [ ])

  const submit = () => {
    window.localStorage.setItem("username", name)
    close()
  }

  return (
    <div className="modal">
     
      <div className={`submitform ${fadeIn && "show"}`}>
        <h1>Your score: 0</h1>
        <input onChange={(event) => setName(event.target.value)} placeholder="Your name here :)"/>
        <button disabled={name.length < 3} className="submit" onClick={submit}>submit score</button>
        <p>or</p>
        <button className="reset" onClick={close}>close</button>
      </div>

    </div>
  )
}

export default SubmitScore
