import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { useRef } from 'react'

const SvgText = ({
  text = 'Animation',
  fontSize,
  fontWeight,}) => {
  const deviationRef = useRef(null)
  
  useGSAP(() => {
      gsap.from(deviationRef.current, {
        attr: {
          stdDeviation: 50
        },
        duration: 10,
        ease: 'expo.inOut'
      })
  }, [])

  return (
    <>
      <svg>
        <defs>
          <filter id='text-effect'>
            <feGaussianBlur
              ref={deviationRef}
              in='SourceGraphic'
              stdDeviation={0}
              result='blurred-text'
            />
            <feColorMatrix
              in='blurred-text'
              mode='matrix'
              values='1 0 0 0 0
            0 1 0 0 0 
            0 0 1 0 0
            0 0 0 18 -7'
              result='matrix-output'
            />
            <feComposite
              in='SourceGraphic'
              in2='matrix-output'
              operator='atop'
            />
          </filter>
        </defs>
      </svg>
      <h1
        style={{
          fontSize: `clamp(8vw,${fontSize}rem,12vw)`,
          fontWeight: fontWeight
        }}
        className='svg-text'
      >
        {text}
      </h1>
    </>
  )
}

export default SvgText
