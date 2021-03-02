import React, { Component } from 'react'

class AlienCard extends Component {
  constructor () {
    super()

    this.state = {
      loading: true
    }
  }

  async componentDidMount () {
    const res = await fetch(this.props.uri)
    const json = await res.json()
    console.log(111, json)
    this.setState({ ...json, loading: false })
  }

  render () {
    console.log('ppp', this.props)
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <div>{this.state.name}</div>
        <img alt={this.state.name} style={{ width: 200 }} src={this.state.image}/>
      </div>
    )
  }
}

export default AlienCard
