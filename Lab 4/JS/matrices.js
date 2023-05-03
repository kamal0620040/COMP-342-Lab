// For reflection
const reflectionMatrixAboutYaxis = [
    -1, 0, 0,
    0, 1, 0,
    0, 0, 1
];

// For rotation
const angle = -75;
const radianAngle = angle * Math.PI/180;
const rotationMatrix = [
    Math.cos(radianAngle), -Math.sin(radianAngle), 0,
    Math.sin(radianAngle), Math.cos(radianAngle), 0,
    0, 0, 1,
]
  
// For scaling
const scalingMatrix = [
  0.5, 0, 0,
  0, 0.5, 0,
  0, 0, 1
];
  
// For translationM
const translationMatrix = [
  1, 0, 1,
  0, 1, 1,
  0, 0, 1
];
  
// For shearing
const shearingMatrix = [
  1, -0.5, 0,
  0, 1, 0,
  0, 0, 1
];
  