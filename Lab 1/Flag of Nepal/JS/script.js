const canvas = document.querySelector("#glcanvas");

// Initialize the GL context
const gl = canvas.getContext("webgl");

// Only continue if WebGL is available and working
if (gl === null) {
  alert(
    "Unable to initialize WebGL. Your browser or machine may not support it."
  );
}

let sunVertexData = createVertex(0.15, -0.32, -0.45);
let moonVertexData = createVertex(0.09, -0.32, 0.25);
let moonLowerVertexData = createHalfVertex(0.18, -0.32, 0.25);

let sunSpikeData = createSpikeData(0.15, -0.32, -0.45);
let moonSpikeData = createSpikeData(0.09, -0.32, 0.25);

const vertexData = [
  // upper blue border
  -0.627, -0.05, 0,
  -0.627, 1, 0,
  0.62, -0.05, 0,

  // lower blue border
  -0.627, -1, 0,
  -0.627, 0.59, 0,
  0.57, -1, 0,

  // upper red
  -0.57, 0.03, 0,
  -0.57, 0.86, 0,
  0.43, 0.03, 0,

  // lower red
  -0.57, -0.92, 0,
  -0.57, 0.45, 0,
  0.43, -0.92, 0,

  ...sunVertexData,
  ...sunSpikeData,
  ...moonVertexData,
  ...moonSpikeData,
  ...moonLowerVertexData,
];

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
    }
`
);
gl.compileShader(vertexShader);

function drawTriangle(fragmentShaderGLSL, start, end) {
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderGLSL);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);

  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);

  gl.drawArrays(gl.TRIANGLES, start, end);
}

// upper blue border
drawTriangle(
  `void main(){
        gl_FragColor = vec4(0, 0, 1, 1);
    }`,
  0, // start positon of vertexData array
  3 // end position of vertexData Array
);

// lower blue border
drawTriangle(
  `void main(){
        gl_FragColor = vec4(0, 0, 1, 1); 
    }`, // for blue color triangle
  3, // start positon of vertexData array
  6 // end position of vertexData Array
);

// upper red
drawTriangle(
  `void main(){
        gl_FragColor = vec4(1, 0, 0, 1); 
    }`, // for red color triangle
  6, // start positon of vertexData array
  9 // end position of vertexData Array
);

// lower red
drawTriangle(
  `void main(){
        gl_FragColor = vec4(1, 0, 0, 1); 
    }`, // for red color triangle
  9, // start positon of vertexData array
  12 // end position of vertexData Array
);

// sun
drawTriangle(
  `void main() {
        gl_FragColor = vec4(1, 1, 1, 1);}
    `,
  12,
  81
);

// sun spike
drawTriangle(
  `void main() {
        gl_FragColor = vec4(1, 1, 1, 1);}
    `,
  81,
  117
);

// moon
drawTriangle(
  `void main() {
        gl_FragColor = vec4(1, 1, 1, 1);}
    `,
  117,
  189
);

// moon spike
drawTriangle(
  `void main() {
        gl_FragColor = vec4(1, 1, 1, 1);}
    `,
  189,
  225
);

// moon lower circle range from 175 to 360
drawTriangle(
  `void main() {
        gl_FragColor = vec4(1, 1, 1, 1);}
    `,
  225,
  264 // moonLoweVertex have 117 points so, 225 + 117/3 is the end point
);
