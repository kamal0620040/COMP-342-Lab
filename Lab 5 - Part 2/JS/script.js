const canvas = document.querySelector("#glcanvas");

// Initialize the GL context
const gl = canvas.getContext("webgl");

// Only continue if WebGL is available and working
if (gl === null) {
  alert(
    "Unable to initialize WebGL. Your browser or machine may not support it."
  );
}


function displayAxis() {
  let tempVertexData = [];
  tempVertexData.push(1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0);
  draw(tempVertexData, 'line');
}

let Origin = [0.1, 0.1, 0];
let [Height, Width, Length] = [0.4, 0.4, 0.4];

function reUsedFunctionCalling(){
  displayAxis();
  draw3DObject(Origin, Height, Width, Length);
}

reUsedFunctionCalling();

// On any change on the radio button
document.querySelectorAll('input[name="field-radio"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    if (event.target.value === "rotate") {
      reUsedFunctionCalling();
      rotate3DObject(3*(Math.PI)/2);
    } else if (event.target.value === "scale"){
      reUsedFunctionCalling();
      translate3DObject(-0.6, -0.6);
      scale3DObject(1.5, 1.5);
    } else if (event.target.value === "translate"){
      reUsedFunctionCalling();
      translate3DObject(-0.7, -0.7);
    }
  });
});