function soma(num1, num2) {
  let result = 0;
  result = num1 === 2 ? num1 + num2 : null;
  return result;
}

console.log(soma(3, 3));

let regionNames = new Intl.DisplayNames(['pt-BR'], {type: 'region'});
regionNames.of('US'); // "United States"
console.log(regionNames.of('GB'));
