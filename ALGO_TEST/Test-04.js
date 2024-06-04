// Aidil Febrian

const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

try {
  // fetch initial of matrix columns length
  let fromLeftDesc = [];
  let fromRightDesc = [];

  let resultFirst = 0;
  let resultSecond = 0;

  const lengthColumn = Matrix[0].length;
  let tmpLengthCol = lengthColumn - 1;
  for (let a = 0; a < Matrix.length; a += 1) {
    const firstVal = Matrix[a][lengthColumn - (tmpLengthCol + 1)];
    const secondVal = Matrix[a][tmpLengthCol];
    if (Matrix[a].length !== lengthColumn) throw new Error();

    fromLeftDesc.push(firstVal);
    fromRightDesc.push(secondVal);

    resultFirst += firstVal;
    resultSecond += secondVal;

    tmpLengthCol -= 1;
  }

  console.log(
    `Diagonal Pertama = ${fromLeftDesc.join(" + ")} = ${resultFirst}`
  );
  console.log(
    `Diagonal Kedua = ${fromRightDesc.join(" + ")} = ${resultSecond}`
  );
  console.log(
    `\nmaka hasilnya adalah ${resultFirst} - ${resultSecond} = ${
      resultFirst - resultSecond
    }`
  );
} catch (er) {
  console.error("Malformat matrix NxN");
}
