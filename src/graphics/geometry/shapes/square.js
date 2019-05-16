/**
 * Specifies a Square. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader, x, y, image) {
      super(shader, x, y);

      this.vertices = this.generateSquareVertices();

      this.vertices[0].texCoord = [1.0, 1.0];
      this.vertices[1].texCoord = [0.0, 1.0];
      this.vertices[2].texCoord = [0.0, 0.0];
      this.vertices[3].texCoord = [0.0, 0.0];
      this.vertices[4].texCoord = [1.0, 0.0];
      this.vertices[5].texCoord = [1.0, 1.0];

      this.faces = {0: this.vertices};
      this.image = image;
      this.rot = 0;   

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices() {
      var vertices = []

      // convert to gl coordinates
      var x = this.x;
      var y = this.y;
      var z = 0.0;

      var size = 0.5;

      // Generate vertices on the xz axes
      var vertex1 = new Vertex(x+size,  0, y+size);
      var vertex2 = new Vertex(x-size,  0, y+size);
      var vertex3 = new Vertex(x-size,  0, y-size);
      var vertex4 = new Vertex(x-size,  0, y-size);
      var vertex5 = new Vertex(x+size,  0, y-size);
      var vertex6 = new Vertex(x+size,  0, y+size);

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      return vertices;
  }
}
