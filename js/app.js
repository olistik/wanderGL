(function() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, 1).normalize();
  scene.add(light);

  var geometry = new THREE.CubeGeometry(1, 1, 1);

  var rows = [];
  var rows_length = 3;
  var cubes_length = 10;
  var y_start = -6;
  var y_end = 6;
  var y_step = (y_end - y_start) / rows_length;
  var x_start = -15;
  var x_end = 15;
  var x_step = (x_end - x_start) / cubes_length;
  for (var row_index = 0; row_index < rows_length; ++row_index) {
    rows[row_index] = [];
    for (var index = 0; index < cubes_length; ++index) {
      var color = ((0x0000ff - 0x000000) / cubes_length) * (index);
      var material = new THREE.MeshLambertMaterial({
        color: color << (8 * row_index)
      });
      var cube = new THREE.Mesh(geometry, material);
      cube.position.y = y_start + y_step * row_index;
      cube.position.x = x_start + x_step * index;
      cube.position.z = -10;
      rows[row_index].push(cube);
      scene.add(cube);
    }
  }

  camera.position.z = 2;

  var render = function() {
    requestAnimationFrame(render);

    rows.forEach(function(row) {
      row.forEach(function(cube, index) {
        cube.rotation.x += 0.001 * index;
        cube.rotation.y += 0.005 * index;
      });
    });

    renderer.render(scene, camera);
  };

  render();

  var resizeScene = function() {
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);

    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', resizeScene);

  var requestFullscreen = function() {
    var elem = document.querySelector('canvas');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };
  window.addEventListener('click', requestFullscreen);
}());
