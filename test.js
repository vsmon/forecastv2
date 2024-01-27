async function Sum(num1, num2) {
  return num1 + num2;
}

async function Mult(num1, num2) {
  return num1 * num2;
}

const resultSum = await Sum(2, 2);
//const resultMult = await Mult(resultSum, 2);

console.log('SUM===>', resultSum);
//console.log('Mult===>', resultMult);
