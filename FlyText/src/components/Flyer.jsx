import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Flyer = ({
  text = 'Animation begins !',
  type = 'flyIn',
  ease = 'expo'
}) => {
  const textArray = text.split('')
  const letterRef = useRef([])
  const containerRef = useRef(null)

  //🚩 Gsap For moving Gsap made by Luvin
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: 'bottom 50%',
        scrub: true,
        markers: true,
        pin: true
      }
    })
    letterRef.current.forEach(target => {
      const targetX = Math.random() * 100 + 200
      const targetY = Math.random() * 100 - 200
      const rotateX = Math.random() * 360 - 180
      const rotateY = Math.random() * 360 - 180
      const rotateZ = Math.random() * 360 - 180
      if (type == 'flyIn') {
        tl.from(
          target,
          {
            x: targetX,
            y: targetY,
            rotationX: rotateX,
            rotationY: rotateY,
            rotationZ: rotateZ,
            opacity: 0,
            delay: Math.random(),
            ease: ease == 'expo' ? 'expo.inOut' : 'elastic.inOut'
          },
          `0`
        )
      } else if (type == 'flyOut') {
        tl.to(
          target,
          {
            x: targetX,
            y: targetY,
            rotationX: rotateX,
            rotationY: rotateY,
            rotationZ: rotateZ,
            opacity: 0,
            delay: Math.random(),
            ease: ease == 'expo' ? 'expo.inOut' : 'elastic.inOut'
          },
          `0`
        )
      }
    })
  }, [])

  return (
    <div ref={containerRef} className='text-container'>
      <h1 className='flyer-text'>
        {textArray.map((letter, idx) => {
          return letter === ' ' ? (
            <span key={idx}>&nbsp;&nbsp;</span>
          ) : (
            <span
              key={idx}
              ref={elem => (letterRef.current[idx] = elem)}
              className='text-letter'
            >
              {letter}
            </span>
          )
        })}
      </h1>
    </div>
  )
}

export default Flyer
