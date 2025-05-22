import { useState } from 'react'
import './App.css'
import GitHub from './GitHub'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <GitHub />
    </>
  )
}

export default App
