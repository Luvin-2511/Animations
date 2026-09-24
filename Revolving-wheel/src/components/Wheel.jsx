import { useEffect, useRef, useState } from 'react'

const Wheel = ({ title = 'Home Page' }) => {
  const aliens = [
    'Four Arms',
    'Heatblast',
    'Diamondhead',
    'XLR8',
    'Cannonbolt',
    'Upgrade',
    'Ghostfreak',
    'Wildmutt'
  ]
  const dialerWheel = Array(4).fill(0)
  const dialerRef = useRef(null)
  const outerRef = useRef(null)
  const angleToSkip = (Math.PI*2)/aliens.length
  console.log('angle->',angleToSkip);
  
  let offset = 16
  let [radius, setRadius] = useState(0)
  let [outerRadius, setOuterRadius] = useState(0)
  useEffect(() => {
    setOuterRadius(outerRef.current.clientHeight / 2)
    setRadius(dialerRef.current.clientHeight / 2 - offset)
  }, [offset])

  return (
    <div>
      <div ref={outerRef} style={{
  transform: `translate(-50%,-50%) rotate(${angleToSkip}rad)`
      }} className='elements'>
        {aliens.map((alien, idx) => {
          const angle = ((idx / aliens.length) - 1) * Math.PI * 2
          const x = Math.cos(angle) * outerRadius
          const y = Math.sin(angle) * outerRadius
          return (
            <h3
              style={{
                transform: `translate(${x-70}px,${y-20}px) rotate(-${angleToSkip}rad)`,
                left: '50%',
                top: '50%'
              }}
              className='tags'
            >
              {alien}
            </h3>
          )
        })}
      </div>
      <div className='outer-circle'>
        <div className='center-info'>
          <div className='text-content'>
            <p className='browse-text'>Now browsing</p>
            <h3 className='title'>{title}</h3>
            <div className='navigators'>
              <div className='left'>
                <i className='ri-arrow-left-line'></i>
              </div>
              <div className='right'>
                <i className='ri-arrow-right-line'></i>
              </div>
            </div>
          </div>
        </div>
        <div ref={dialerRef} className='dialer'>
          {dialerWheel.map((_, idx) => {
            const angle = (idx / dialerWheel.length - 1) * Math.PI * 2
            const x = Math.cos(angle) * radius - offset
            const y = Math.sin(angle) * radius - offset

            return (
              <div
                style={{
                  transform: `translate(${x}px,${y}px)`,
                  left: '50%',
                  top: '50%'
                }}
                key={idx}
                className='wheel'
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Wheel
