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


let P1 = [0.6, -0.7, 0];
let P2 = [-0.9, 0.4, 0];
cohenSutherland(P1, P2, Xw_min, Yw_min, Xw_max, Yw_max);

// On any change on the radio button
document.querySelectorAll('input[name="field-radio"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    if (event.target.value === "field1") {
      console.log("Mid Point Circle");
      tempVertexData =  midPointCircle(300, 0, 0);
      draw();
    } else {
      console.log("Mid Point Ellipse");
      tempVertexData = midPointEllipse(200, 160, 0, 0);;
      draw();
    }
  });
});


// for (let i = 0; i <= vertexData.length; i += 1) {
//     gl.drawArrays(gl.POINTS, i, 1);
// }