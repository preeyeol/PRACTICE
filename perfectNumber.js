const isPerfectNumber = (num) => {
  result = 0;
  for (let i = 1; i <= num / 2; i++) {
    if (num % i === 0) result += i;
  }
  return result === num;
};

console.log(isPerfectNumber(6));
console.log(isPerfectNumber(28));
