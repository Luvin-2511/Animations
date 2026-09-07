import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const App = () => {
  const cols = 8
  const rows = 10
  const IMG_URL =
    'https://framerusercontent.com/images/Bd8bBzzSSbT1JcgkTJPCOoID7U.jpg?width=1200&height=1800'

  useGSAP(() => {
    gsap.from('.img', {
      opacity: 0,
      duration: 2,
      ease: 'expo.inOut',
      stagger: {
        each: 0.02,
        from: 'random'
      }
    })
  }, [])
  return (
    <main>
      <div
        style={{
          gridTemplateColumns: `repeat(${cols},1fr)`,
          gridAutoRows: `repeat(${rows},1fr)`
        }}
        className='img-wrapper'
      >
        {Array(cols * rows)
          .fill(0)
          .map((_, i) => {
            const column = i % cols
            const row = Math.floor(i / cols)
            const x = column * (100 / (cols - 1))
            const y = row * (100 / (rows - 1))
            return (
              <div
                style={{
                  backgroundPosition: `${x}% ${y}%`,
                  backgroundSize: `${cols * 100}% ${rows * 100}%`,
                  backgroundImage:`url(${IMG_URL})`
                }}
                className='img'
              ></div>
            )
          })}
      </div>
    </main>
  )
}

export default App
