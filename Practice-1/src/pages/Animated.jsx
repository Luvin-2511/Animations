import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
gsap.registerPlugin(ScrollTrigger)

const Animated = () => {
  const images = [
    'https://plus.unsplash.com/premium_photo-1787242276166-dc57fce5104c?q=80&w=790&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1777927515662-a460bce161eb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1787505809072-1165c710f40e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1759060351261-3409133e9b87?q=80&w=786&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1786992442667-19b1be428af6?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1786801520790-3a72efea8509?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1773332611612-ffdaa753afb1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1786896621968-b4a9f3772d9c?q=80&w=830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1773332598289-ed0444ad1d6f?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]

  const positions = [
    { left: '5%', top: '10%', rotate: -6 },
    { left: '22%', top: '35%', rotate: 4 },
    { left: '40%', top: '5%', rotate: -3 },
    { left: '55%', top: '30%', rotate: 7 },
    { left: '15%', top: '55%', rotate: 5 },
    { left: '68%', top: '10%', rotate: -8 },
    { left: '35%', top: '60%', rotate: -4 },
    { left: '75%', top: '50%', rotate: 3 },
    { left: '50%', top: '65%', rotate: -5 }
  ]

  const deviationRef = useRef(null)
  const ContainerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ContainerRef.current,
        start: 'top top',
        end: 'top -200%',
        scrub: 4,
        pin: true
      }
    })

    tl.to(deviationRef.current, {
      attr: {
        stdDeviation: 0
      },
      runBackwards: false,
      ease: 'back.in'
    })
      .from('.wrapper', {
        x: -500,
        opacity: 0,
        borderRadius: '50%',
        stagger: {
          from: 'random',
          each: 0.1
        },
        scale: 0.1,
        ease: 'expo.inOut'
      })
      .to('.wrapper', {
        x: 500,
        opacity: 0,
        scale: 0.1,
        borderRadius: '50%',
        ease: 'expo.inOut'
      })
  })

  return (
    <div ref={ContainerRef} className='animated-container'>
      <svg height={0} width={0}>
        <defs>
          <filter id='blobber'>
            <feGaussianBlur
              ref={deviationRef}
              in='SourceGraphic'
              stdDeviation={100}
              result='blurred-text'
            />
            <feColorMatrix
              in='blurred-text'
              type='matrix'
              values='1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 18 -7'
              result='blob-effect'
            />
            <feComposite
              in='SourceGraphic'
              in2='blob-effect'
              operator={'atop'}
            />
          </filter>
        </defs>
      </svg>
      <h1 className='heading'>Animation Begins</h1>
      <div className='image-container'>
        {images.map((image, ind) => {
          const elem = positions[ind]
          return (
            <div
              style={{
                left: elem.left,
                top: elem.top,
                transform: `rotate(${elem.rotate}deg)`
              }}
              key={ind}
              className='wrapper'
            >
              <img src={image} alt='' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Animated
