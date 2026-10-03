import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

gsap.registerPlugin(Physics2DPlugin)

const TextPhysics = ({ text }) => {

    useGSAP(()=>{
        gsap.to('.text-letter',{
            physics2D: {
                gravity:800
            },
            stagger:{
                each:0.1,
                from:"random"
            },
            duration:2
        })
    },[])

  return (
    <div className='text-wrapper'>
      <h1>{text.split("").map((letter,idx)=>{
        return <span key={idx} className='text-letter'>{letter}</span>
      })}</h1>
    </div>
  )
}

export default TextPhysics
