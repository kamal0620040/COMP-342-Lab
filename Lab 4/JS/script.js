const canvas = document.querySelector("#glcanvas");

// Initialize the GL context
const gl = canvas.getContext("webgl");

// Only continue if WebGL is available and working
if (gl === null) {
  alert(
    "Unable to initialize WebGL. Your browser or machine may not support it."
  );
}

function draw(vertexD, drawArraysMode, fragmentShaderGLSL = '' ){
  const vertexData = [
    ...vertexD,
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
          gl_PointSize = 4.0;
      }
  `
  );
  gl.compileShader(vertexShader);
  
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if(fragmentShaderGLSL == ''){
    gl.shaderSource(fragmentShader, 
    `void main(){
        gl_FragColor = vec4(0, 0, 1, 1);
    }`
    );
  }else{
    gl.shaderSource(fragmentShader, fragmentShaderGLSL);
  }

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
  
  if(drawArraysMode == 'line'){
    gl.drawArrays(gl.LINES, 0, vertexData.length);
  }else if(drawArraysMode == 'triangle'){
    gl.drawArrays(gl.TRIANGLES, 0, vertexData.length);
  }
}

function displayAxis() {
  let tempVertexData = [];
  tempVertexData.push(1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0);
  draw(tempVertexData, 'line');
}

const triangleData = [
    0.2, 0.8, 1,
    0.2, 0.2, 1,
    0.8, 0.2, 1,
];

function drawInitialTriangle() {
  let vertexData = [
    ...triangleData,  
  ];
  draw(vertexData,'triangle');
}

function reUsedFunctionCalling(){
  displayAxis();
  drawInitialTriangle();
}

reUsedFunctionCalling();

function twoDTransformation(transformationMatrix, drawArrayMode, fragmentShaderGLSL){
  let tempVertexData = [];
  tempVertexData.push(...matrixMultiplication(transformationMatrix, triangleData.slice(0, 3)));
  tempVertexData.push(...matrixMultiplication(transformationMatrix, triangleData.slice(3, 6)));
  tempVertexData.push(...matrixMultiplication(transformationMatrix, triangleData.slice(6, 9)));
  draw(tempVertexData,drawArrayMode, fragmentShaderGLSL);
}

function matrixMultiplication(transformerMatrix, vertices) {
  let result = [];
  let [a11, a12, a13, a21, a22, a23, a31, a32, a33] = transformerMatrix; // 3 * 3
  let [b1, b2, b3] = vertices; // 3*1
  let c1 = a11*b1 + a12*b2 + a13*b3;
  let c2 = a21*b1 + a22*b2 + a23*b3;
  let c3 = a31*b1 + a32*b2 + a33*b3;
  result.push(...[c1, c2, c3]);
  return result;
}


// On any change on the radio button
document.querySelectorAll('input[name="field-radio"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    if (event.target.value === "rotate") {
      reUsedFunctionCalling();
      twoDTransformation(rotationMatrix, 'triangle', `void main(){gl_FragColor = vec4(0, 0, 0.1, 0.5);}`);
    } else if (event.target.value === "scale"){
      reUsedFunctionCalling();
      twoDTransformation(scalingMatrix,'triangle', `void main(){gl_FragColor = vec4(0, 0, 0.1, 0.5);}`);
    } else if (event.target.value === "reflect"){
      reUsedFunctionCalling();
      twoDTransformation(reflectionMatrixAboutYaxis,'triangle', `void main(){gl_FragColor = vec4(0, 0, 0.1, 0.5);}`);
    } else if (event.target.value === "shear"){
      reUsedFunctionCalling();
      twoDTransformation(shearingMatrix,'triangle', `void main(){gl_FragColor = vec4(0, 0, 0.1, 0.5);}`);
    } else if (event.target.value === "translate"){
      reUsedFunctionCalling();
      twoDTransformation(translationMatrix,'triangle', `void main(){gl_FragColor = vec4(0, 0, 0.1, 0.5);}`);
    }
  });
});