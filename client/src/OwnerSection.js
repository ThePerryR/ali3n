import React, { Component } from 'react'

class OwnerSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amountToMint: 0
    }
  }

  mint = () => {
    console.log(this.state.amountToMint)
    if (this.state.amountToMint) {
      this.props.mintAliens(this.state.amountToMint)
    }
  }

  render () {
    return (
      <div>
        <div>Admin:</div>
        <input
          value={this.state.amountToMint}
          onChange={e => this.setState({ amountToMint: Number(e.target.value) })}
        />
        <div style={{ cursor: 'pointer' }} onClick={this.mint}>Mint Aliens</div>
      </div>
    )
  }
}

export default OwnerSection
