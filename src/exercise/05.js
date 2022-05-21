// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {

  const tiltRef = React.useRef(100)
  console.log("Ref: ", tiltRef.current)
  
  React.useEffect(() => {
    
    const tiltNode = tiltRef.current
    
    console.log("Inside UseRef Ref: ", tiltRef.current)
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })
    return () => tiltNode.vanillaTilt.destroy()
  },[])


  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">Prasad</div>
    </Tilt>
  )
}

export default App
