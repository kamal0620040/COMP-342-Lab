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

// View Port
let Xw_min = -0.6;
let Yw_min = -0.4;
let Xw_max = 0.6;
let Yw_max = 0.4;
viewPortVertexData = viewPortVertex(Xw_min, Yw_min, Xw_max, Yw_max);
draw(gl, viewPortVertexData, 'line',`void main(){ gl_FragColor = vec4(0, 0, 0, 1);}`);

// Default - Shown
let P1 = [0.6, -0.7, 0];
let P2 = [-0.9, 0.4, 0];
cohenSutherland(P1, P2, Xw_min, Yw_min, Xw_max, Yw_max);

// On any change on the radio button
document.querySelectorAll('input[name="field-radio"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    if (event.target.value === "cohen") {
      // Draw ViewPort
      draw(gl, viewPortVertexData, 'line',`void main(){ gl_FragColor = vec4(0, 0, 0, 1);}`);
      let P1 = [0.6, -0.7, 0];
      let P2 = [-0.9, 0.4, 0];
      cohenSutherland(P1, P2, Xw_min, Yw_min, Xw_max, Yw_max);
    } else {
      // Draw ViewPort
      draw(gl, viewPortVertexData, 'line',`void main(){ gl_FragColor = vec4(0, 0, 0, 1);}`);
      
      // Draw Polygon
      let P1 = [-0.6, -0.7, 0];
      let P2 = [0.5, 0.7, 0];
      let P3 = [0.5, 0.8, 0];
      let P4 = [-0.2, 0.6, 0];
      let P5 = [0.0, 0.2, 0];
      sutherLandHodgemann(P1, P2, P3, P4, P5, Xw_min, Yw_min, Xw_max, Yw_max);
    }
  });
});
