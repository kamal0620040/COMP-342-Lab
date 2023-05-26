function translateObject(objectData, Tx, Ty) {
  let vertexData = [];
  let translationMatrix = [...[1, 0, Tx], ...[0, 1, Ty], ...[0, 0, 1]];
  vertexData.push(...matrixMultiplication(translationMatrix, objectData, 3));
  return vertexData;
}

function rotateObject(angle, objectData) {
  let vertexData = [];
  let cos = Math.cos(angle);
  let sin = Math.sin(angle);
  let rotationMatrix = [...[cos, -sin, 0], ...[sin, cos, 0], ...[0, 0, 1]];
  vertexData.push(...matrixMultiplication(rotationMatrix, objectData, 3));
  return vertexData;
}

function scaleObject(objectData, Sx, Sy) {
  let vertexData = [];
  let scalingMatrix = [...[Sx, 0, 0], ...[0, Sy, 0], ...[0, 0, 1]];
  vertexData.push(...matrixMultiplication(scalingMatrix, objectData, 3));
  return vertexData;
}

function matrixMultiplication(Transformer, coordinates, numElements) {
  let result = [];
  for (let i = 0; i < coordinates.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      let sum = 0;
      for (let k = 0; k < numElements; k++) {
        sum += Transformer[j * 3 + k] * coordinates[i + k];
      }
      result.push(sum);
    }
  }
  return result;
}
