import React, { Component } from 'react'
import SceneComponent from 'babylonjs-hook'
import {
  CannonJSPlugin,
  Color3,
  Engine,
  FreeCamera,
  HemisphericLight,
  SceneLoader,
  PhysicsImpostor,
  StandardMaterial,
  Vector3
} from 'babylonjs'
import 'babylonjs-loaders'

let scene

class BabylonLayer extends Component {
  componentDidMount () {
    const canvas = document.getElementById('machine-canvas')
    const engine = new Engine(canvas, true)
    SceneLoader.Load('/models/', 'test.glb', engine, function (scene) {
      scene.createDefaultCamera(true, true, true)
      scene.createDefaultEnvironment({
        createGround: false,
        createSkybox: false,
      })
      engine.runRenderLoop(function () {
        scene.render()
      })
      window.addEventListener('resize', function () {
        engine.resize()
      })
    })
  }

  render () {
    return (
      <div>
        <canvas style={{ width: '100vw', height: '100vh' }} id='machine-canvas'/>
      </div>
    )
  }
}

/*

const rng = (max) => Math.floor(Math.random() * max) + 1
  fillMachine = () => {
    let ballsToShow = this.state.available > 40 ? 40 : this.state.available
    const ballMaterial = new StandardMaterial('ball-material', scene)
    ballMaterial.diffuseColor = new Color3(1, 1, 1)
    ballMaterial.alpha = 0.32
    for (let i = 0; i < ballsToShow; i++) {
      const ball = MeshBuilder.CreateSphere('ball', { diameter: 1.2 }, scene)
      ball.material = ballMaterial
      ball.physicsImposter = new PhysicsImpostor(ball, PhysicsImpostor.SphereImpostor, {
        mass: 0.2,
        restitution: 0.3
      }, scene)
      ball.position.z = rng(200) * 0.01 - 0.5
      ball.position.x = rng(200) * 0.01 - 0.5
      ball.position.y = rng(200) * 0.02 - 1.5
    }
  }
 */

export default BabylonLayer
