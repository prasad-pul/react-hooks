// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage (key, defaultValue='', {serialize=JSON.stringify, deserialize=JSON.parse}={})  {
  const [state, setState] = React.useState(() => {
    const localStorageValue = window.localStorage.getItem(key)
    if (localStorageValue) {
      return deserialize(localStorageValue)
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  
  React.useEffect(() => {

    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]

}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = useLocalStorage('name', initialName)
  
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <>
    <button onClick={() => setCount(prevCount => prevCount+1)}>{count}</button>
  <Greeting />
  </>
  )
}

export default App
