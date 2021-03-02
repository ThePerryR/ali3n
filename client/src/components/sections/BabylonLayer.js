import React, { Component } from 'react'
import SceneComponent from 'babylonjs-hook'
import { CannonJSPlugin, Color3, DirectionalLight, FreeCamera, HemisphericLight, MeshBuilder, PhysicsImpostor, StandardMaterial, Vector3 } from '@babylonjs/core'

let scene
const onSceneReady = (s) => {
  scene = s

  scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin())

  scene.clearColor = new Color3(0.671, 0.796, 0.945)

  const camera = new FreeCamera('camera', new Vector3(0, 0, -15), scene)
  camera.setTarget(Vector3.Zero())

  const canvas = scene.getEngine().getRenderingCanvas()
  camera.attachControl(canvas, true)

  const dLight = new DirectionalLight('dlight', new Vector3(0, -1, 0), scene)
  const light = new HemisphericLight('light', new Vector3(-5, 2, -5), scene)
  light.intensity = 0.5
  dLight.intensity = 1
  light.diffuse = new Color3(0.5, 0.5, 1)
  //light.groundColor = new Color3(0.514, 0.373, 0.847)

  const wallMaterial = new StandardMaterial('wall-material', scene)
  wallMaterial.diffuseColor = new Color3(1, 1, 1)
  wallMaterial.alpha = 0.02
  const bottom = MeshBuilder.CreateBox('bottom', { width: 4, height: 0.2, depth: 4 })
  bottom.position.x = 0
  bottom.position.y = -3
  bottom.physicsImposter = new PhysicsImpostor(bottom, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1 }, scene)
  bottom.material = wallMaterial
  const top = MeshBuilder.CreateBox('top', { width: 4, height: 0.2, depth: 4 })
  top.position.x = 0
  top.position.y = 3
  top.physicsImposter = new PhysicsImpostor(top, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1 }, scene)
  top.material = wallMaterial
  const back = MeshBuilder.CreateBox('back', { width: 4, height: 6, depth: 0.2 })
  back.position.z = 2
  back.position.y = 0
  back.physicsImposter = new PhysicsImpostor(back, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1 }, scene)
  back.material = wallMaterial
  const front = MeshBuilder.CreateBox('back', { width: 4, height: 6, depth: 0.2 })
  front.position.z = -2
  front.position.y = 0
  front.physicsImposter = new PhysicsImpostor(front, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1 }, scene)
  front.material = wallMaterial
  const left = MeshBuilder.CreateBox('left', { width: 0.2, height: 6, depth: 4 })
  left.position.z = 0
  left.position.x = -2
  left.physicsImposter = new PhysicsImpostor(left, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1 }, scene)
  left.material = wallMaterial
  const right = MeshBuilder.CreateBox('right', { width: 0.2, height: 6, depth: 4 })
  right.position.z = 0
  right.position.x = 2
  right.physicsImposter = new PhysicsImpostor(right, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1 }, scene)
  right.material = wallMaterial

  // MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
}
/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
}

class BabylonLayer extends Component {
  render () {
    return (
      <div>
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender}
                        id="machine-canvas"/>
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
