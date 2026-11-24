import { useState } from "react";

const App = () => {
  
  let a = 10
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  return (
    <main>
      <div className="text">{a}</div>
      <div className="text">{count}</div>
      <button onClick={() => {
        setCount(prev => prev + 1)
        a++
      }}>CLICK ME</button>
    </main>

  )
}

export default App