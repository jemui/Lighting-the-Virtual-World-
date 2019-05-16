/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z) {
      this.point = new Vector3([x, y, z]);

      // Set color and texture coordinates
      this.color  = [1, 0.2, 0.2, 1.0];
      this.texCoord = [0.0, 0.0];
      this.normal = new Vector3([0.0, 0.0, 0.0]);
      
      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
