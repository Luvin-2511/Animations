import React, { useEffect, useState } from 'react'

const HackerText = ({ text = 'Nothing to see', classer }) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()'
  const [hackerText, sethackerText] = useState(text)
  useEffect(() => {
    let revealCount = 0
    let hackerInterval = setInterval(() => {
      if (revealCount >= text.length) {
        clearInterval(hackerInterval)
        return
      }
      sethackerText(
        text
          .split('')
          .map((letter, idx) => {
            if (idx <= revealCount) return letter
            return alpha[Math.floor(Math.random() * alpha.length)]
          })
          .join('')
      )
      revealCount++
    }, 200)
    return () => {
      clearInterval(hackerInterval)
    }
  }, [text])

  return (
    <div className='texter'>
      <h1 className={classer}>{hackerText}</h1>
    </div>
  )
}

export default HackerText
