var shader = null;
var cycle = 0;
// 32x32x4 map
var map = [
    // [4, 4, 4, 4, 4, 4, 4, 4 ],
    // [4, 0, 3, 0, 0, 0, 0, 4 ],
    // [4, 0, 2, 2, 2, 0, 0, 4 ],
    // [4, 0, 2, 0, 0, 0, 0, 4 ],
    // [4, 0, 1, 0, 0, 0, 0, 4 ],
    // [4, 0, 0, 1, 1, 0, 0, 4 ],
    // [4, 0, 0, 0, 0, 0, 0, 4 ],
    // [4, 3, 0, 0, 0, 0, 0, 4 ],
    // [4, 4, 4, 4, 4, 4, 4, 4 ],

];

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the light to pass into scene
  // Change z for day and light
  var light = new Light(-50, 50, -50);

  // Initialize the scene
  var scene = new Scene();
  scene.setLight(light);

  // Initialize the camera
  var camera = new Camera();
  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");
  shader.addAttribute("a_Normal");

  // Add uniforms
  shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);

  // Add uniforms for phong shader
  shader.addUniform("u_LightPosition", "vec3", new Vector3().elements);
  shader.addUniform("u_LightColor", "vec3", new Vector3().elements);
  shader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);

  shader.addUniform("u_Sampler", "sampler2D", 0);

  // Creates the skybox
  inputHandler.readTexture("objs/sky.png", function(image) {
      var shape = new Cube(shader, 0, 0, image, 32);
      scene.addGeometry(shape);
  })

  // Creates the ground
  inputHandler.readTexture("objs/grass3.png", function(image) {
      var shape;

      // Creates the plane out of squares
      for(var i = -8; i < 0; i+= 1) {
        for(var j = 0; j < 8; j += 1) {
          shape = new Square(shader, i, j, image);
          scene.addGeometry(shape);
        }
      }
  })
 
  // Creates the walls based on the values 0-4 in map array
  inputHandler.readTexture("objs/dirt.jpg", function(image) {
      var shape;

      // position for x val will be updated per j val 
      var posX = -8;
      var posZ = 0; 
      var size = 0.5;

      // Creates the 32x32x4 world based on the 2D array map
      for(var i = 0; i < map.length; i++) {
          for(var j = 0; j < map.length; j++) {
              posX += size*2;

              // Draws walls based on height
              if(map[i][j] == 1) {
                  shape = new Cube(shader, posX, posZ, image, size);
                  scene.addGeometry(shape);
              } 
              else if(map[i][j] == 2) {
                  shape = new Cube(shader, posX, posZ, image, size);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posZ, image, size, 2);
                  scene.addGeometry(shape);
              }
              else if(map[i][j] == 3) {
                  shape = new Cube(shader, posX, posZ, image, size);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posZ, image, size, 2);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posZ, image, size, 3);
                  scene.addGeometry(shape);
              }
              else if(map[i][j] == 4) {
                  shape = new Cube(shader, posX, posZ, image, size);
                  scene.addGeometry(shape);
                  
                  shape = new Cube(shader, posX, posZ, image, size, 2);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posZ, image, size, 3);
                  scene.addGeometry(shape);

                  shape = new Cube(shader, posX, posZ, image, size, 4);
                  scene.addGeometry(shape);
              }

          }

          // reset positon x and move along z
          posX = -8;
          posZ += size*2;
      }

  })

  // Add the end and start sphere
  var shape = new Sphere(shader, 13);
  scene.addGeometry(shape);

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();

  // Update global counter for fluctuating triangles and moving circles
  var tick = function() {
  //-y, +z for night 
     
    if(cycle > 450)  
        cycle = 0; 
    else if(cycle > 300)
        light.rotateLight(0, 1, 0);
    else if(cycle > 150)
        light.rotateLight(-1, -1, -1);
    else if(cycle <= 150) 
        light.rotateLight(1, 0, 1);
    cycle++;
    
    console.log(cycle);
    
    requestAnimationFrame(tick);
  }
  tick();
}


