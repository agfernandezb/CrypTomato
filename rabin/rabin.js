var rmAccents = function (inputText) {
  var accents = "ÁÄáäÓÖóöÉËéÇçÍÏíïÚÜúüÑñ";
  var noAccents = "AAaaOOooEEeeCcIIiiUUuuNn";
  return inputText
    .split("")
    .map(function (chr) {
      const accentIndex = accents.indexOf(chr);
      return accentIndex !== -1 ? noAccents[accentIndex] : chr;
    })
    .join("");
};
var normalizeInput = function (inputText) {
  return rmAccents(inputText)
    .replaceAll(/[^a-zA-Z]/g, "")
    .replaceAll(" ", "")
    .toLowerCase();
};
const dict1 = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
  8: "i",
  9: "j",
  10: "k",
  11: "l",
  12: "m",
  13: "n",
  14: "o",
  15: "p",
  16: "q",
  17: "r",
  18: "s",
  19: "t",
  20: "u",
  21: "v",
  22: "w",
  23: "x",
  24: "y",
  25: "z",
};
const dict = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
};

class Pair {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
function power(x, y, p) {
  let res = 1;
  x = x % p;

  if (x == 0) return 0;

  while (y > 0) {
    if (y & 1) res = (res * x) % p;
    y = y >> 1;
    x = (x * x) % p;
  }
  return res;
}

function gcdExtended(a, b, pair = new Pair(0, 0)) {
  if (a == 0) {
    pair.x = 0;
    pair.y = 1;
    return b;
  }
  let gcd = gcdExtended(b % a, a, pair);

  var temp = pair.x;
  pair.x = pair.y - Math.floor(b / a) * pair.x;
  pair.y = temp;

  return gcd;
}
function sieveOfEratosthenes(n) {
  var array = [];
  prime = Array.from({ length: n + 1 }, (_, i) => true);

  for (p = 2; p * p <= n; p++) {
    if (prime[p] == true) {
      for (i = p * p; i <= n; i += p) prime[i] = false;
    }
  }
  for (i = 2; i <= n; i++) {
    if (prime[i] == true && i % 4 == 3) array.push(i);
  }
  return array;
}

function findSquareRoots(y, p, q) {
  var mp = power(y, (p + 1) / 4, p);
  var mq = power(y, (q + 1) / 4, q);
  //console.log(mp, mq);
  var pair = new Pair(0, 0);
  var n = p * q;
  gcdExtended(p, q, pair);
  var yp = pair.x;
  var yq = pair.y;
  var r1 = (yp * p * mq + yq * q * mp) % n;
  while (r1 < 0) {
    r1 += n;
    r1 %= n;
  }
  var r2 = n - r1;
  var r3 = (yp * p * mq - yq * q * mp) % n;
  while (r3 < 0) {
    r3 += n;
    r3 %= n;
  }
  var r4 = n - r3;
  var array = [];
  array.push(r1, r2, r3, r4);
  return array;
}

function tupleToBase26(array) {
  var pow = 1;
  var num = 0;
  for (var i = array.length - 1; i >= 0; --i) {
    num += pow * array[i];
    pow *= 26;
  }
  return num;
}

function base26ToTriple(num) {
  var array = [];
  array.push(num % 26);
  num -= num % 26;
  num /= 26;
  array.push(num % 26);
  num -= num % 26;
  num /= 26;
  array.push(num);
  return array.reverse();
}

//Beginning of cipher and decipher functions, variables to use
var blockSize = 3;
var maxNumber = 10000;
var minValueN = 18279;
var primeArray = sieveOfEratosthenes(maxNumber);
var primeNumber = primeArray.length;
const alphSize = 26;

function cipher(clearText, n, B) {
  var text = normalizeInput(clearText);

  if (text.length % blockSize != 0) {
    var mod = blockSize - (text.length % blockSize);
    while (mod > 0) {
      text += "x";
      mod--;
    }
  }
  var cipheredText = [];

  if (n < minValueN) {
    console.log("n debe ser mayor o igual a 18279 para poder cifrar");
    return cipheredText;
  }

  for (var i = 0; i < text.length / 3; ++i) {
    var array = [];
    array.push(dict[text[i * 3]]);
    array.push(dict[text[i * 3 + 1]]);
    array.push(dict[text[i * 3 + 2]]);
    var x = tupleToBase26(array, n);
    var number1 = x + B;
    number1 %= n;
    var number = x * number1;
    number %= n;
    cipheredText.push(number);
  }
  return cipheredText;
}

//Decipher function
function decipher(array, p, q, B) {
  var pp = p;
  var qq = q;
  if (p * q <= minValueN) {
    console.log(
      "n es algo pequeño por lo que pueden haber problemas en el descifrado"
    );
  }
  var pair = new Pair(0, 0);
  var n = p * q;
  gcdExtended(4, p * q, pair);
  var invFour = pair.x;
  pair.x = 0;
  pair.y = 0;
  gcdExtended(2, p * q, pair);
  var invTwo = pair.x;
  while (invFour < 0) {
    invFour += n;
    invFour %= n;
  }
  while (invTwo < 0) {
    invTwo += n;
    invTwo %= n;
  }
  var toFind = ((B * B) % n) * invFour;
  toFind %= n;
  var clearText = [];

  for (var i = 0; i < array.length; ++i) {
    var root = toFind + array[i];
    // console.log("ale", root);
    // console.log("ale2", pp, qq);
    var roots = findSquareRoots(root, pp, qq);
    console.log(i, roots);
    var minus = B * invTwo;
    minus %= n;
    for (var j = 0; j < roots.length; ++j) {
      roots[j] -= minus;
      while (roots[j] < 0) {
        roots[j] += n;
        roots[j] %= n;
      }
    }
    var toPush = [];
    toPush.push(array[i]);
    for (var j = 0; j < roots.length; ++j) {
      var diff = true;
      for (var k = j + 1; k < roots.length; ++k) {
        if (roots[j] == roots[k]) {
          diff = false;
          break;
        }
      }
      if (diff) {
        if (roots[j] < minValueN) {
          var arr = base26ToTriple(roots[j]);
          var toArr = [];
          toArr.push(roots[j]);
          var p = [];
          toArr.push(arr[0]);
          toArr.push(arr[1]);
          toArr.push(arr[2]);
          toPush.push(toArr);
        }
      }
    }
    clearText.push(toPush);
  }
  return clearText;
}

function generateKey() {
  var p, q;
  var minPrime = 150;
  p = primeArray[Math.floor(Math.random() * primeNumber)];
  while (p <= minPrime) {
    p = primeArray[Math.floor(Math.random() * primeNumber)];
  }
  q = primeArray[Math.floor(Math.random() * primeNumber)];
  while (q <= minPrime || q == p) {
    q = primeArray[Math.floor(Math.random() * primeNumber)];
  }
  var array = [];
  var b = Math.floor(Math.random() * (p * q - 1));
  array.push(p * q);
  array.push(b);
  array.push(p);
  array.push(q);
  return array;
}
// var pair = new Pair(0, 0);
// var a = 28;
// var b = 75;
// var g = gcdExtended(a, b, pair);
// console.log(g);
// console.log(pair.x, pair.y);
var array = generateKey();
console.log(array);
//console.log(cipher("abcd", array[0], array[1]));
console.log(cipher("abcd", array[0], array[1]));
console.log(
  decipher(
    cipher("abcdefghiabc", array[0], array[1]),
    array[2],
    array[3],
    array[1]
  )
);
//
//
