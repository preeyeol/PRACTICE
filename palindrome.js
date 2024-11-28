function isPalindrome(number) {
  if (number < 0) {
    return false;
  }
  let original = number;
  let reversed = 0;

  while (number > 0) {
    let digit = number % 10;
    reversed = reversed * 10 + digit;
    number = Math.floor(number / 10);
  }

  return original === reversed;
}

console.log(isPalindrome(9));
console.log(isPalindrome(121));
console.log(isPalindrome(2323));
console.log(isPalindrome(12345));
console.log(isPalindrome(1010101));
console.log(isPalindrome(1234567890));
