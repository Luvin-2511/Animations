import { useEffect, useRef, useState } from 'react'
import gsap from '../lib/gsap'
import { useGSAP } from '@gsap/react'
import { getGrid } from '../utils/getGrid'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [grid, setGrid] = useState(getGrid)
  const menuRef = useRef(null)
  useEffect(() => {
    const handleResize = () => {
      setGrid(getGrid())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { COLUMNS, ROWS } = grid
  useGSAP(() => {
    gsap.set('.menu-wrapper', {
      xPercent: -100
    })
  }, [])

  const animateHam = () => {
    let navTimeline = gsap.timeline()
    const flag = !isMenuOpen
    setIsMenuOpen(flag)
    if (flag) {
      gsap.set('.menu-wrapper', {
        xPercent: 0
      })
      navTimeline
        .to('.line-one', {
          rotate: 45,
          y: 10,
          duration: 0.1,
          ease: 'circ.out'
        })
        .to(
          '.line-two',
          {
            rotate: -45,
            y: -10,
            duration: 0.1,
            ease: 'circ.out'
          },
          '<'
        )
        .to(
          '.menu-grid',
          {
            scaleY: 1,
            transformOrigin:"bottom",
            ease: 'expo.inOut',
            stagger: {
              from: 'random',
              each: 0.004,
            }
          },
          '<'
        )
    } else {
      navTimeline
        .to('.line-one', {
          rotate: 0,
          y: 0,
          duration: 0.1,
          ease: 'expo.inOut'
        })
        .to(
          '.line-two',
          {
            rotate: 0,
            y: 0,
            duration: 0.1,
            ease: 'expo.inOut'
          },
          '<'
        )
        .to(
          '.menu-grid',
          {
            scaleY: 0,
            transformOrigin:"top",
            ease: 'expo.inOut',
            stagger: {
              from: 'random',
              each: 0.004
            }
          },
          '<'
        )
        .to(menuRef.current, {
          xPercent: -100,
          duration: 0.1
        })
    }
  }
  
  return (
    <nav>
      <div className="logo">
        
      </div>
      <button onClick={animateHam} className='ham-menu'>
        <div className='line-one'></div>
        <div className='line-two'></div>
      </button>
      <div
        style={{
          gridTemplateColumns: `repeat(${COLUMNS},1fr)`,
          gridTemplateRows: `repeat(${ROWS},1fr)`
        }}
        ref={menuRef}
        className='menu-wrapper'
      >
        {Array(COLUMNS * ROWS)
          .fill(null)
          .map((_, idx) => {
            return <div key={idx} className='menu-grid'></div>
          })}
      </div>
    </nav>
  )
}

export default Navbar
