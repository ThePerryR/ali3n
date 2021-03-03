import React, { Component } from 'react'
import AlienOwnershipContract from '../contracts/AlienOwnership.json'
import getWeb3 from '../getWeb3'

import './App.css'
import BabylonLayer from './sections/BabylonLayer'
import Overlay from '../Overlay'

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, owner: false, myTokens: [] }

  componentDidMount = async () => {
    try {
      // get an instance of the contract
      console.log(1)
      const web3 = await getWeb3()
      console.log(2)
      const networkId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      console.log(3)
      const deployedNetwork = AlienOwnershipContract.networks[networkId]
      const contractAddress = deployedNetwork && deployedNetwork.address
      const contract = new web3.eth.Contract(AlienOwnershipContract.abi, contractAddress, { from: accounts[0] })

      // fetch the users aliens
      const availableBalance = await contract.methods.balanceOf(contractAddress).call()

      this.setState({ web3, contractAddress, contract, availableBalance, accounts }, this.fetchMyData)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.error(error)
    }
  }

  fetchMyData = async () => {
    const myBalance = await this.state.contract.methods.balanceOf(this.state.accounts[0]).call()
    let myAliens = []
    for (let i = 0; i < myBalance; i++) {
      const token = await this.state.contract.methods.tokenOfOwnerByIndex(this.state.accounts[0], i).call()
      const uri = await this.state.contract.methods.tokenURI(token).call()
      myAliens.push({ id: token, uri })
    }
    this.setState({ myAliens, myBalance })
  }

  render () {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <BabylonLayer/>
        <Overlay
          myAliens={this.state.myAliens || []}
          buyTokens={async (amount) => {
            await this.state.contract.methods.purchaseAliens(amount).send({ value: this.state.web3.utils.toWei((0.0005 * amount).toString(), 'ether') })
            return this.fetchMyData()
          }}
        />
      </div>
    )
  }
}

export default App
