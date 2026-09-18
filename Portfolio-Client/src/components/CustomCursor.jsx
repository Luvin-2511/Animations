import { useEffect, useRef } from 'react'
import gsap from '../lib/gsap'
import { allowedElem } from '../data/allowedCursor'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const innerCursorRef = useRef(null)
  // const actualCursorRef = useRef(null)

  const handleMouseMove = e => {
    const target = e.target
    const isAllowed = target.closest(allowedElem.join(','))
    console.log(isAllowed)

    if (isAllowed) {
      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.5,
        ease: 'power3.out'
      })

      gsap.to(innerCursorRef.current, {
        scale: 8,
        duration: 0.3,
        ease: 'power3.out'
      })
    } else {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'expo.out'
      })

      gsap.to(innerCursorRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'expo.out'
      })
    }

    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'sine.out'
    })

    // gsap.to(
    //   actualCursorRef.current,
    //   {
    //     x: e.clientX,
    //     y: e.clientY,
    //     duration: 0,
    //     ease: 'expo.inOut'
    //   },
    //   '<'
    // )

    gsap.to(
      innerCursorRef.current,
      {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        ease: 'expo.inOut'
      },
      '<'
    )
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className='outer-cursor'></div>
      <div ref={innerCursorRef} className='inner-cursor'></div>
      {/* <div ref={actualCursorRef} className='cursor'>
        <svg
        width='25'
        height='25'
          viewBox='-1 -1 23 23'
          fill='#FFFFFF'
          stroke='black'
          stroke-width='1'
          xmlns='http://www.w3.org/2000/svg'
          class='arrow-cursor  translate-3.5'
          size='25'
        >
          <path d='M19.4205 6.38638C20.9155 6.90234 20.84 9.04179 19.3124 9.45111L12.4293 11.2954C11.876 11.4437 11.4437 11.8759 11.2955 12.4293L9.45115 19.3124C9.04183 20.84 6.90239 20.9154 6.38643 19.4205L0.591713 2.63063C0.155493 1.36671 1.36676 0.155447 2.63068 0.591668L19.4205 6.38638Z'></path>
        </svg>
      </div> */}
    </>
  )
}

export default CustomCursor
