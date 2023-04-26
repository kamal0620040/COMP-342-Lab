const canvas = document.querySelector("#glcanvas");

// Initialize the GL context
const gl = canvas.getContext("webgl");

// Only continue if WebGL is available and working
if (gl === null) {
  alert(
    "Unable to initialize WebGL. Your browser or machine may not support it."
  );
}

let tempVertexData;

// Default BLA Line is drawn 
tempVertexData = midPointCircle(300, 0, 0);
draw();

// On any change on the radio button
document.querySelectorAll('input[name="field-radio"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    if (event.target.value === "field1") {
      console.log("Mid Point Circle");
      tempVertexData =  midPointCircle(300, 0, 0);
      draw();
    } else {
      console.log("DDA");
      tempVertexData = DDALine(500, 500, -200, -200);
      draw();
    }
  });
});

function draw(){
  const vertexData = [
    ...tempVertexData
  ];
  
  // console.log(vertexData);
  
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(
    vertexShader,
    `
      attribute vec3 position;
      void main() { 
          gl_Position = vec4(position, 1);
          gl_PointSize = 4.0;
      }
  `
  );
  gl.compileShader(vertexShader);
  
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, 
  `void main(){
      gl_FragColor = vec4(0, 0, 1, 1);
  }`
  );
  gl.compileShader(fragmentShader);
  
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  
  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);
  
  gl.drawArrays(gl.POINTS, 0, vertexData.length);
}

// for (let i = 0; i <= vertexData.length; i += 1) {
//     gl.drawArrays(gl.POINTS, i, 1);
// }