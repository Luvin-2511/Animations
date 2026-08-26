import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Intro = () => {
  useGSAP(() => {
    gsap.to('.stripes', {
      height: '0%',
      duration: 2,
      ease: 'elastic.in',
      stagger: {
        from: 'random',
        each: 0.05
      },
      delay:0.5
    },"a")
  })
  return (
    <>
      <div className='loader-wrapper'>
        <div className='stripes'></div>
        <div className='stripes'></div>
        <div className='stripes'></div>
        <div className='stripes'></div>
        <div className='stripes'></div>
      </div>
    </>
  )
}

export default Intro
