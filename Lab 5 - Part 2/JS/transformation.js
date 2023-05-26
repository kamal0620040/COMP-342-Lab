function translate3DObject(Tx, Ty) {
  frontFace = translateObject(frontFace, Tx, Ty);
  backFace = translateObject(backFace, Tx, Ty);
  topFace = translateObject(topFace, Tx, Ty);
  bottomFace = translateObject(bottomFace, Tx, Ty);
  rightFace = translateObject(rightFace, Tx, Ty);
  leftFace = translateObject(leftFace, Tx, Ty);
  DrawCube();
}

function rotate3DObject(angle) {
  frontFace = rotateObject(angle, frontFace);
  backFace = rotateObject(angle, backFace);
  topFace = rotateObject(angle, topFace);
  bottomFace = rotateObject(angle, bottomFace);
  rightFace = rotateObject(angle, rightFace);
  leftFace = rotateObject(angle, leftFace);
  DrawCube();
}

function scale3DObject(Sx, Sy) {
  frontFace = scaleObject(frontFace, Sx, Sy);
  backFace = scaleObject(backFace, Sx, Sy);
  topFace = scaleObject(topFace, Sx, Sy);
  bottomFace = scaleObject(bottomFace, Sx, Sy);
  rightFace = scaleObject(rightFace, Sx, Sy);
  leftFace = scaleObject(leftFace, Sx, Sy);
  DrawCube();
}
