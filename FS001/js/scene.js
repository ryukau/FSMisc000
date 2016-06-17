var scene, camera, renderer;

var uniforms1;

var clock;

var mesh = [];

requirejs(
    ['three.min'],
    function(three) {
        clock = new THREE.Clock();
        
        init();
        animate();
    }
);

////////////////////////////////////////////////

function init()
{
    uniforms1 = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
    };
                
    scene = new THREE.Scene();

    var width = window.innerWidth;
    var height = window.innerHeight;
    //camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    //camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 1000 );
    camera.position.z = 1;

    //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var geometry = new THREE.PlaneGeometry( 2, 2, 1 );
    
    //var material = new THREE.MeshBasicMaterial( { color: 0x888888, wireframe: true } );
    var material = new THREE.ShaderMaterial(
        {
            uniforms: uniforms1,
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent
        });

    mesh.push(new THREE.Mesh( geometry, material ));
    scene.add( mesh[0] );

    renderer = new THREE.WebGLRenderer();// { preserveDrawingBuffer: true } );
    renderer.setClearColor(0xffffff, 1);
    //renderer.setSize( 512, 512 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    var canvas = renderer.domElement;
    uniforms1.resolution.value.x = canvas.width;
    uniforms1.resolution.value.y = canvas.height;

    document.body.appendChild( renderer.domElement );
}

function animate()
{
    requestAnimationFrame( animate );

    uniforms1.time.value += clock.getDelta();
    
    //mesh[0].rotation.z += 0.01;
    //mesh[0].rotation.x += 0.01;

    renderer.render( scene, camera );
}
