import React, { useState } from 'react'

import AlienCard from './AlienCard'

function Overlay ({ myAliens, buyTokens }) {
  const [amount, setAmount] = useState(0)
  const [selectedAlien, setSelectedAlien] = useState(null)
  return (
    <div
      style={{
        position: 'absolute', width: '100%', height: '100%', top: 0, left: 0,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      <div>
        <div>Your inventory:</div>
        <div style={{ width: 320, display: 'flex', flexWrap: 'wrap' }}>
          {myAliens.map(token => (
            <div key={token.id} onClick={() => setSelectedAlien(token.id)}>
              <AlienCard
                {...token} open={selectedAlien === token.id}
                close={() => setSelectedAlien(null)}
              />
            </div>
          ))}
        </div>
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
