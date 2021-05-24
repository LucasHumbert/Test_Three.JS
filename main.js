import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh( geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xFFFFFFF);

scene.add(pointLight, ambientLight);
/*
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(gridHelper);

const controls = new OrbitControls( camera, renderer.domElement );
*/

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const star = new THREE.Mesh( geometry, material);

    const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const julTexture = new THREE.TextureLoader().load('jul3.jpg');
const jul = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: julTexture })
);
jul.position.set(10, 5, -35)
scene.add(jul);


const luneTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const lune = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: luneTexture, normalMap: normalTexture })
);
lune.position.setX(-10)
lune.position.setZ(30)
scene.add(lune);

var text = "";
var fontLoader = new THREE.FontLoader();
fontLoader.load("/helvetiker_regular.typeface.json",function(tex){ 
    var  textGeo = new THREE.TextGeometry('Lorem \n Ipsum', {
            size: 10,
            height: 5,
            curveSegments: 6,
            font: tex,
    });
    var  color = new THREE.Color();
    color.setRGB(255, 250, 250);
    var  textMaterial = new THREE.MeshBasicMaterial({ color: color });
    text = new THREE.Mesh(textGeo , textMaterial);
    text.position.set(35, -12, -100)
    text.rotation.y -= 0.5
    text.rotation.x -= 0.2    
    text.rotation.z -= 0.1 
    scene.add(text);
})

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

})

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

  
    lune.rotation.y += 0.075;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
    requestAnimationFrame( animate );
    jul.rotation.y += 0.01;
    jul.rotation.z += 0.01;
    //controls.update();
    renderer.render(scene, camera);
}

animate()