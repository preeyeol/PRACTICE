/*
multiple of 3 & 5 ==> [3,5,6,9,.......< 1000]

[3,5,6,9,.......< 1000].loop lagayera

add++


*/

const sumOfMultiples = (number) => {
  let sum = 0;
  for (let i = 1; i < number; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum = sum + i;
    }
  }
  return sum;
};

console.log(sumOfMultiples(1000));

console.log(sumOfMultiples(500));
