import React from 'react'
import { blockData } from '../data/blockData'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const PageTransition = () => {
  const blocks = blockData.height * blockData.width
  const blockArray = Array(blocks).fill(1)

  useGSAP(() => {
    gsap.set('.wrapper', {
      display: 'grid'
    })
    let tl = gsap.timeline()

    tl.to('.block', {
      background: '#eaff00',
      stagger: {
        from: 'random',
        each: 0.01
      },
      ease: 'expo.out'
    }).to('.block', {
      height: 0,
      stagger: {
        from: 'random',
        each: 0.001
      },
      ease: 'expo.out'
    })
  }, [])
  return (
    <div className='wrapper'>
      {blockArray.map((_, idx) => {
        return <div className={`block${idx} block`}></div>
      })}
    </div>
  )
}

export default PageTransition
