// Set the scene size
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var container;

// Set some camera attributes
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight;

// Set up the sphere vars
const RADIUS = 60;
const SEGMENTS = 16;
const RINGS = 16;

var sphere;

function setup()
{
	createScene();
    addMesh();
    addLight();
		animate();
    requestAnimationFrame(draw);
}

function createScene()
{
    // Set up all the 3D objects in the scene

	// Get the DOM element to attach to
    container = document.getElementById("#container");

    // Create a WebGL renderer, camera and a scene
    renderer = new THREE.WebGLRenderer();
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    scene = new THREE.Scene();

    // Add the camera to the scene
    scene.add(camera);

    // Start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // Attach the renderer-supplied DOM element.
    document.body.appendChild(renderer.domElement);
}

function addMesh()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);
    var material = new THREE.MeshPhongMaterial(
        {
          color: 0x66ffff
        });
    // Create a new mesh with sphere geometry
    sphere = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    sphere.position.z = -300;

    // Finally, add the sphere to the scene
    scene.add(sphere);
}

function addLight()
{
    // Create a point light
    pointLight =
      new THREE.PointLight(0xFFFFFF);

    // Set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // Add to the scene
    scene.add(pointLight);
}

function animate () {
	requestAnimationFrame( animate );
	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;

};



function draw()
{
    // Draw!
    renderer.render(scene, camera);

    // Schedule the next frame
    requestAnimationFrame(draw);
}
