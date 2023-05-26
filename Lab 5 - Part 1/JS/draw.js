function draw(gl, vertexD, drawArraysMode, fragmentShaderGLSL = '' ){
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