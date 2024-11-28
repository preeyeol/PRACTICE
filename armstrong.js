const isArmstrongNum = (num) => {
  let sum = 0;
  let originalNum = num;
  let digits = 0;

  if (num < 0) {
    return false;
  }

  while (num > 0) {
    num = Math.floor(num / 10);
    digits++;
  }
  num = originalNum;

  while (num > 0) {
    let digit = num % 10; // Get the last digit
    sum += Math.pow(digit, digits); // Add the powered digit to the sum
    num = Math.floor(num / 10); // Remove the last digit
  }

  return sum === originalNum;
};

console.log(isArmstrongNum(1));
console.log(isArmstrongNum(123));
console.log(isArmstrongNum(153));
