function fibonanciSeries(num) {
  let fibNum = [0, 1];
  for (let i = 2; i < num; i++) {
    let sum = fibNum[i - 1] + fibNum[i - 2];

    if (sum >= num) {
      break;
    }
    fibNum.push(sum);
  }
  return {
    number: fibNum,
    length: fibNum.length,
  };
}
console.log(fibonanciSeries(5));
console.log(fibonanciSeries(3));
console.log(fibonanciSeries(783));
