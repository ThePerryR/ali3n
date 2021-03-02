import React, { Component } from 'react'

const getGW = (str) => str.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')

class AlienCard extends Component {
  constructor () {
    super()

    this.state = {
      loading: true
    }
  }

  async componentDidMount () {
    console.log(this.props.uri)
    const res = await fetch(getGW(this.props.uri))
    const json = await res.json()
    this.setState({ ...json, loading: false })
  }

  render () {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <div style={{ marginLeft: 8, marginRight: 8, marginBottom: 16 }}>
        <video loop alt={this.state.name} style={{ width: 80 }} src={getGW(this.state.image)}/>
        {this.props.open &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, background: 'white' }}>
          <div onClick={this.props.close}>Close</div>
          <div>{this.state.name}</div>
        </div>
        }
      </div>
    )
  }
}

export default AlienCard
