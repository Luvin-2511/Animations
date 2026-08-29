import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import HackerText from './HackerText'

const Intro = () => {
  useGSAP(() => {
    gsap.to(
      '.stripes',
      {
        height: '0%',
        duration: 2,
        ease: 'elastic.in',
        stagger: {
          from: 'random',
          each: 0.05
        },
        delay: 0.5
      },
      'a'
    )
    gsap.to(
      '.hackerClass',
      {
        skewY:-10,
        opacity: 0,
        duration: 1,
        ease: 'expo.in',
        delay: 0.5
      },
      'a'
    )
  })
  return (
    <>
      <HackerText classer='hackerClass' text={'Welcome'} />
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
