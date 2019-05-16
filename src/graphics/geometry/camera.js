/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Camera {
   /**
    * Constructor for Camera.
    *
    * @constructor
    * @returns {Camera} Camera object created
    */
    constructor(shader) {
        this.speed = 0.1;
        this.ortho = false;

        // Camera view attributes
        this.eye     = new Vector3([-2, 2, 4]);  // origin   
        this.center  = new Vector3([0,  1, -1]); // look at
        this.up      = new Vector3([0,  1, 0]);

        this.viewMatrix = new Matrix4();
        this.updateView();

        this.projectionMatrix = new Matrix4();

        // Specify the viewing volume
        this.projectionMatrix.setPerspective(90, 1, 1, 100);
    }

    // Moves the camera left and right
    truck(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize();

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the u axis to the desired distance to move
        u = u.mul(dir * this.speed);

        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(u);
        this.center = this.center.add(u); 

        this.updateView();
    }

    // Rotates the camera’s view horizontally about the camera’s eye location. 
    // You can pan left or pan right. This rotates about a camera’s v axis (center)
    pan(dir) {
        this.center.elements[0] = this.center.elements[0]-dir;
        this.updateView();
    }

    // Tilt the camera vertically
    tilt(dir) {
        this.center.elements[1] =  this.center.elements[1]-dir;
        this.updateView();
    }

    // Dolly moves a camera closer to, or further from, the location it is 
    // looking at. You can dolly in and dolly out. translation a camera’s n axis.
    dolly(dir) {
        this.eye.elements[2] =  this.eye.elements[2]+dir;
        this.updateView();
    }

    // Zoom in/out based on mouse scroll
    zoom(amt) {
        this.eye.elements[2] =  this.eye.elements[2]+amt;
        this.updateView();
    }

    // Set the perspective camera when z is pressed
    setPersp() {
       this.projectionMatrix.setPerspective(90, 1, 1, 100);
       this.ortho = false;
    }

    // Set the orthogonal camera when z is pressed
    setOrthogonal() {
       this.projectionMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, 0.0, 100);
       this.ortho = true;
    }

    // Check if the camera is currently perspective or orthogonal
    getOrtho() {
        return this.ortho;
    }

    updateView() {
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.center.elements[0], this.center.elements[1], this.center.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }
}
