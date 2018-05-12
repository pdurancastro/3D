// GLOBAL VARIABLES

// Set the scene size
const WIDTH = 640;
const HEIGHT = 360;

var container;

// Set some camera attributes
const VIEW_ANGLE = 50;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight;

// Set up the sphere vars
const RADIUS = 5;
const SEGMENTS = 6;
const RINGS = 6;

var sphere;
var angle = 0.0;

//Set up the variable plane
const FIELD_WIDTH= 400,
      FIELD_HEIGTH= 200;
const PLANE_WIDTH = FIELD_WIDTH,
      PLANE_HEIGTH = FIELD_HEIGTH,
      PLANE_QUALITY= 10;

var fiel_width_colision = FIELD_WIDTH;
var fiel_height_colision = FIELD_HEIGTH;

//Set up the variable cube
const PADDLE_WIDTH= 10,
      PADDLE_HEIGTH = 30,
      PADDLE_DEPTH = 10,
      PADDLE_QUALITY = 1;

var paddlewith = PADDLE_WIDTH,
    paddleheigth = PADDLE_HEIGTH;


var playerPaddleDirY = 0,
    cpuPaddleDirY = 0,
    paddleSpeed = 3;

var playerPaddle,
    cpuPaddle;

var ballDirX = 1,
    ballDirY = 1,
    //Cambie la velocidad a 1
    ballSpeed = 2;


    //Asequible 0.07
    //Infernal 0.2
var difficulty = 0.0;

var score1 = 0,
    score2 = 0,
    maxScore = 3;

var StartGameVar = 0;
// GAME FUNCTIONS

function setup()
{
  createScene();
  addPlane();
  addSphere();
  addPaddle();
  addLight();

  draw();
}


function createScene()
{
    // Set up all the 3D objects in the scene

	// Get the DOM element to attach to
    container = document.getElementById("gameCanvas");

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
    container.appendChild(renderer.domElement);
    //container.appendChild
}

function addPlane(){
  var geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGTH, PLANE_QUALITY);
  var material = new THREE.MeshLambertMaterial(
      {
        color: 0xffffff, side: THREE.DoubleSide
      } );
  var plane = new THREE.Mesh( geometry, material );

  plane.position.z = -300;
  scene.add(plane);
}


function addScenary()
{
  //var geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGTH, PLANE_QUALITY);
  var geometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var cylinder = new THREE.Mesh( geometry, material );

  cylinder.position.x = ballDirX;
  cylinder.position.y = ballDirY;
  cylinder.position.z = -300;

  scene.add( cylinder );
};


function addSphere()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);
    var material = new THREE.MeshLambertMaterial(
        {
          color: 0xcc0099
        });
    // Create a new mesh with sphere geometry
    sphere = new THREE.Mesh(geometry, material);

    // Move the Sphere back in Z so we can see it
    sphere.position.x = ballDirX;
    sphere.position.y = ballDirY;
    sphere.position.z = -296;

    // Finally, add the sphere to the scene
    scene.add(sphere);
}

function addPaddle()
{
  var geometry = new THREE.BoxGeometry(PADDLE_WIDTH,PADDLE_HEIGTH,PADDLE_DEPTH,PADDLE_QUALITY);
  var geometry2 = new THREE.BoxGeometry(PADDLE_WIDTH,PADDLE_HEIGTH,PADDLE_DEPTH,PADDLE_QUALITY);

  var materialplayer = new THREE.MeshLambertMaterial(
    {
      color: 0x00ccff
    } );
  var material_CPU = new THREE.MeshLambertMaterial(
    {
      color: 0xff0000
    } );

  playerPaddle = new THREE.Mesh( geometry, materialplayer );
  cpuPaddle = new THREE.Mesh( geometry2, material_CPU );

  playerPaddle.position.x = -180;
  playerPaddle.position.y = playerPaddleDirY;
  playerPaddle.position.z = -300;


  cpuPaddle.position.x = 180;
  cpuPaddle.position.y = cpuPaddleDirY;
  cpuPaddle.position.z = -300;
  scene.add( playerPaddle );
  scene.add(cpuPaddle);


}

function addLight()
{
    // Create a point light
    PointLight =
      new THREE.PointLight(0xFFFFFF, 1.5);

    // Set its position
    PointLight.position.x = 10;
    PointLight.position.y = 50;
    PointLight.position.z = 130;

    // Add to the scene
    scene.add(PointLight);


}
function MovementPaddle(){
  if (Key.isDown(Key.A))
  {
    if (playerPaddle.position.y < fiel_height_colision * 0.42){
      playerPaddleDirY = paddleSpeed * 0.8;
    }else{
      playerPaddleDirY = 0.0;
    }
// code to move paddle left
  }else if (Key.isDown(Key.D)){
    if (playerPaddle.position.y > -fiel_height_colision * 0.42){
      playerPaddleDirY = - paddleSpeed * 0.8;
    }else{
     playerPaddleDirY = 0.0;
    }

  }else{
     playerPaddleDirY = 0.0;
  }
  playerPaddle.position.y += playerPaddleDirY;
};



function MovementSphere(){
  //Tratamiento de Colisiones
  if (sphere.position.y > fiel_height_colision * 0.45){
    //ballDirX = ballDirX
    ballDirY = -ballDirY;
  }else if (sphere.position.y < -fiel_height_colision * 0.45){
    //ballDirX = ballDirX;
    ballDirY = -ballDirY;
  }


}

function MovementEnemy(){
  cpuPaddleDirY = (sphere.position.y - cpuPaddle.position.y)*difficulty;
    if (cpuPaddleDirY <= paddleSpeed){
      cpuPaddle.position.y += cpuPaddleDirY;
    }else{
      if (cpuPaddleDirY > paddleSpeed)
      {
          cpuPaddle.position.y += paddleSpeed*1.65;
      }
    }

}


function ColisionPaddle(){
  if (sphere.position.x <= playerPaddle.position.x + paddlewith &&
      sphere.position.x >= playerPaddle.position.x )
      {
        if (sphere.position.y <= playerPaddle.position.y + paddleheigth * 0.8  &&
        sphere.position.y >= playerPaddle.position.y - paddleheigth * 0.8 )
        {
          if (ballDirX > 0 )
          {
            ballDirX = - ballDirX * 1.2;
            //Efecto de la pelota in testing2
            ballDirY -= ballDirX * 1.2;

            //ballSpeed =  ballSpeed * 2;

          }
        }

      }

  else if (sphere.position.x <= cpuPaddle.position.x + paddlewith &&
      sphere.position.x >= cpuPaddle.position.x )
      {
        if (sphere.position.y <= cpuPaddle.position.y + paddleheigth * 0.8 &&
            sphere.position.y >= cpuPaddle.position.y - paddleheigth * 0.8)
            {
              if (ballDirX < 0 )
              {
                ballDirX = -ballDirX *1.2;
                ballDirY -= ballDirX  * 1.2;

                //ballSpeed =  ballSpeed + 0.2;
                //Efecto de la pelota in testing
                //ballDirY = ballDirX;
              }
            }
       }


//Control ball speed
  if (ballDirY > ballSpeed *2)
  {
    ballDirY = ballSpeed *2 ;
  }else if(ballDirY < -ballSpeed *2)
  {
    ballDirY = -ballSpeed *2 ;
  }

  if (ballDirX > ballSpeed *2)
  {
    ballDirX = ballSpeed *2 ;
  }else if(ballDirX < -ballSpeed *2)
  {
    ballDirX = -ballSpeed *2 ;
  }

}




function score()
{
  //field colision * 0.45
  if(sphere.position.x <- fiel_width_colision)
  {

    sphere.position.x = 0.0;
    sphere.position.y = 0.0;

    sphere.position.x += -ballDirX;
    sphere.position.y += ballDirY;


    if (ballDirX = ballSpeed * 2){
      ballDirX = 1.0;
      ballDirY = 1.0;

    }else if(-ballDirX < ballSpeed *2) {
      ballDirX = 1.0;
      ballDirY = 1.0;
    }

    if (score2 < maxScore-1)
    {
      score2 = score2 + 1;
      document.getElementById("scores").innerHTML = score1 +"-"+ score2;
    }else{
      document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
      document.getElementById("scores").innerHTML = "CPU WINS";
      cancelAnimationFrame(Identificador);
      //stopAnimationFrame();
    }





  }else if(sphere.position.x > fiel_width_colision)
    {
      sphere.position.x = 0.0;
      sphere.position.y = 0.0;

      sphere.position.x += ballDirX;
      sphere.position.y += ballDirY;

      console.log(ballSpeed)

      //ballDirX = ballDirX*(ballSpeed/4);
      if (ballDirX = ballSpeed * 2){
        ballDirX = -1.0;
        ballDirY = 1.0 ;

      }else if(-ballDirX < ballSpeed *2) {
        ballDirX = -1.0;
        ballDirY = 1.0;
      }


      if (score1 < maxScore-1)
      {
        score1 = score1 + 1;
        document.getElementById("scores").innerHTML = score1 +"-"+ score2;
      }else{
        document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
        document.getElementById("scores").innerHTML = "Player WINS";
        cancelAnimationFrame(Identificador);
      }
  //  sphere.position.x += ballDirX * ballSpeed;
  //  sphere.position.y += ballDirY * ballSpeed;

  }

}


function SelectDifficult(){
  if (Key.isDown(Key.ONE)){
    difficulty = 0.1;
    StartGameVar = 1;
    paddleSpeed = 3;
    ballSpeed = 1.25;
    //console.log(StartGameVar + "Ahora vale 1")
  }else if (Key.isDown(Key.TWO)){
    difficulty = 0.2;
    StartGameVar = 2;
    paddleSpeed = 3;
    ballSpeed = 2;
   //console.log(StartGameVar + "Ahora vale 2")
 }else if(Key.isDown(Key.THREE)){
   difficulty = 0.2;
   StartGameVar = 3;
   paddleSpeed = 1;
    ballSpeed = 2;
 }else if(Key.isDown(Key.FOUR)){
    difficulty = 0.00;
    StartGameVar = 4;
    paddleSpeed = 3;
    ballSpeed = 2;
   //console.log(StartGameVar + "Ahora vale 3")
 }
};


function StartGame(){
  if(StartGameVar == 0){
  SelectDifficult();

  }else{
    //Mirar si es X o y

    if (ballDirY > ballSpeed *2)
    {
      ballDirY = ballSpeed *2 ;
    }else if(ballDirY < -ballSpeed *2)
    {
      ballDirY = -ballSpeed *2 ;
    }

    if (ballDirX > ballSpeed *2)
    {
      ballDirX = ballSpeed *2 ;
    }else if(ballDirX < -ballSpeed *2)
    {
      ballDirX = -ballSpeed *2 ;
    }
      sphere.position.x += -ballDirX * ballSpeed;
      sphere.position.y += ballDirY * ballSpeed;
      //Control ball speed


  //  Identificador = requestAnimationFrame(draw);
  }

}


function draw()
{
  //Establecer la posicion de la practica
  camera.rotation.z = -90 * Math.PI/180;
  camera.rotation.y = -60 * Math.PI/180;
  camera.position.x = playerPaddle.position.x -100;
  camera.position.z = playerPaddle.position.z +100;

  //animate();
  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame
  StartGame();
  Identificador = requestAnimationFrame(draw);
  ColisionPaddle();
  MovementSphere();
  MovementPaddle();
  SelectDifficult();
  MovementEnemy();
  score();
}
