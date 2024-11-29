const highestOdd = (num) => {
  while (num > 0) {
    if (num % 2 !== 0) {
      return num;
    }
    num = Math.floor(num / 10);
  }
};

console.log(highestOdd(14545));
console.log(highestOdd(145488));
