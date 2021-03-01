import React, { Component } from 'react'
import SceneComponent from 'babylonjs-hook'
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  DirectionalLight,
  MeshBuilder,
  Color3,
  StandardMaterial,
  CannonJSPlugin,
  PhysicsImpostor
} from '@babylonjs/core'

import AlienOwnershipContract from './contracts/AlienOwnership.json'
import getWeb3 from './getWeb3'

import './App.css'

let scene
const onSceneReady = (s) => {
  scene = s

  scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin())

  scene.clearColor = new Color3(0.671, 0.796, 0.945)

  const camera = new FreeCamera('camera', new Vector3(0, 2, -10), scene)
  camera.setTarget(Vector3.Zero())
  const canvas = scene.getEngine().getRenderingCanvas()

  const dLight = new DirectionalLight('dlight', new Vector3(0, -1, 0), scene)
  const light = new HemisphericLight('light', new Vector3(-5, 2, -5), scene)
  light.intensity = 0.5
  dLight.intensity = 1
  light.diffuse = new Color3(0.5, 0.5, 1)
  //light.groundColor = new Color3(0.514, 0.373, 0.847)

  const holder = MeshBuilder.CreateSphere('holder', { diameter: 5 }, scene)
  holder.position.y = 1
  const holderMaterial = new StandardMaterial('holder-material', scene)
  holderMaterial.diffuseColor = new Color3(1, 1, 1)
  holderMaterial.alpha = 0.1
  holderMaterial.specularColor = new Color3(1, 1, 1) // highlight given my light
  holderMaterial.ambientColor = new Color3(1, 0, 0) // color lit by environmental bg lighting
  holder.material = holderMaterial
  //holder.physicsImposter = new PhysicsImpostor(holder, PhysicsImpostor.SphereImpostor, {mass: 0, restitution: 0.9}, scene)


  // MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
}
/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
}

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, owner: false }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = AlienOwnershipContract.networks[networkId]
      const instance = new web3.eth.Contract(
        AlienOwnershipContract.abi,
        deployedNetwork && deployedNetwork.address
      )
      //instance.options.address = accounts[0]
      console.log(111, accounts[0])
      instance.options.from = accounts[0]

      console.log({ accounts, dn: deployedNetwork && deployedNetwork.address })
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        contract: instance,
        contractAddress: deployedNetwork && deployedNetwork.address
      }, this.initApp)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.error(error)
    }
  }

  initApp = async () => {
    const { accounts, contract } = this.state

    // Stores a given value, 5 by default.
    const owner = await contract.methods.owner().call()
    const balance = await contract.methods.balanceOf(this.state.contractAddress).call()
    console.log({ owner, balance })

    for (let i = 0; i < balance; i++) {
      console.log('Fetching', i)
      const token = await contract.methods.tokenOfOwnerByIndex(this.state.contractAddress, i).call()
      // const owner = await contract.methods.ownerOf(token).call()
      console.log('token', token)
    }
    console.log(this.state.contractAddress, accounts[0])

    this.setState({ owner: owner === accounts[0], available: balance }, this.fillMachine)

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  }

  fillMachine = () => {
    let ballsToShow = this.state.available > 10 ? 10 : this.state.available
    const ballMaterial = new StandardMaterial('ball-material', scene)
    ballMaterial.diffuseColor = new Color3(1, 1, 1)
    ballMaterial.alpha = 0.32
    for (let i = 0; i < ballsToShow; i++) {
      const ball = MeshBuilder.CreateSphere('ball', { diameter: 1 }, scene)
      ball.material = ballMaterial
      ball.physicsImposter = new PhysicsImpostor(ball, PhysicsImpostor.SphereImpostor, {mass: 0, restitution: 0.9}, scene)
    }
  }

  _buyAlien = async () => {
    const x = await this.state.contract.methods.purchaseAliens(1).send({ value: this.state.web3.utils.toWei((0.0005).toString(), 'ether') })
    console.log('purchased', x)
  }

  render () {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="machine-canvas"/>
      </div>
    )
  }
}

export default App
