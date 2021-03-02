import React, { useState } from 'react'

import AlienCard from './AlienCard'

function Overlay ({ myTokens, buyTokens }) {
  const [amount, setAmount] = useState(0)
  return (
    <div
      style={{
        position: 'absolute', width: '100%', height: '100%', top: 0, left: 0,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      <div>
        <div>Your inventory:</div>
        {myTokens.map(token => (
          <AlienCard {...token}/>
        ))}
      </div>
      <div>
        <div>Buy a Capsule</div>
        <input value={amount.toString()} onChange={e => setAmount(Number(e.target.value))}/>
        <div style={{ cursor: 'pointer' }} onClick={() => buyTokens(amount)}>Buy!</div>
      </div>
    </div>
  )
}

export default Overlay
