import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { useRef } from 'react'

const IntroPage = () => {
  const logoRef = useRef(null)

  useGSAP(() => {
    if (!logoRef.current) return
    const introTl = gsap.timeline()
    introTl
      .to('.left-div', {
        transform: 'scaleY(1)',
        duration: 1,
        ease: 'expo.in',
        transformOrigin: 'top'
      })
      .to(
        '.right-div',
        {
          transform: 'scaleY(1)',
          duration: 1,
          ease: 'expo.in',
          transformOrigin: 'bottom'
        },
        '<'
      )
      .to(
        logoRef.current,
        {
          transform: `translate(-50%, -50%) translateZ(0rem)`,
          duration: 1.2,
          ease: 'back.inOut'
        },
        'same'
      )
      .from(
        '.upper-S',
        {
          x: -100,
          delay: 0.2,
          scaleY: 5,
          scaleX: 5,
          clipPath: `polygon(
            49.5% 43.2%,
            55.2% 53.7%,
            64.7% 61.1%,
            34.6% 71.8%,
            34.6% 62%,
            17.9% 85.3%,
            85% 63.3%,
            49.5% 43.2%
            )`,
          duration: 1.2,
          ease: 'expo.inOut'
        },
        'same'
      )
      .from(
        '.lower-S',
        {
          x: 100,
          delay: 0.2,
          scaleY: 5,
          scaleX: 5,
          clipPath: `polygon(
        18.6% 42.8%,
        81.7% 16.8%,
        60.9% 35.2%,
        70.9% 35.5%,
        40.8% 40.2%,
        44% 50%,
        55.1% 60%,
        20.6% 45.8%
  )`,
          duration: 1.2,
          ease: 'expo.inOut'
        },
        'same'
      )
      .to(logoRef.current, {
        xPercent: -135,
        duration: 0.4,
        ease: 'elastic.out'
      })
      .from(
        '.rest-name',
        {
          display: 'none',
          opacity: 0,
          xPercent: 100,
          duration: 0.4,
          ease: 'elastic.out'
        },
        '<'
      )
      .from('.japanese-name h2', {
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.6,
        rotateX: -90,
        stagger: {
          from: 'center',
          each: 0.15
        },
        ease: 'expo.out'
      })
      .to('.intro-wrapper', {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut'
      })
  }, [])

  return (
    <div className='intro-wrapper'>
      <div className='left-div shower'></div>
      <div className='right-div shower'></div>
      <div ref={logoRef} className='name-logo'>
        <div className='upper-S'></div>
        <div className='lower-S'></div>
        <h1 className='rest-name'>anyukt</h1>
      </div>
      <div className='japanese-name'>
        <h2>サ</h2>
        <h2>ヌ</h2>
        <h2>ー</h2>
        <h2>ク</h2>
        <h2>ト</h2>
      </div>
    </div>
  )
}

export default IntroPage
