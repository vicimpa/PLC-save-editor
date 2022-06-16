export class Vector3 {
  x: number
  y: number
  z: number

  constructor(x = 0, y = x, z = y) {
    this.x = x
    this.y = y
    this.z = z
  }
}