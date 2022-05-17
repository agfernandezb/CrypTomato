function modInverse(a, mod) {
    // validate inputs
    [a, mod] = [Number(a), Number(mod)]
    if (Number.isNaN(a) || Number.isNaN(mod)) {
        return NaN // invalid input
    }
    a = (a % mod + mod) % mod
    if (!a || mod < 2) {
        return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = mod
    while (b) {
        [a, b] = [b, a % b]
        s.push({ a, b })
    }
    if (a !== 1) {
        return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % mod + mod) % mod
}

function power(x, y, p) {
    let res = 1;
    x = Number(BigInt(x) % BigInt(p));

    if (x == 0) return 0;

    while (y > 0) {
        if (y & 1) res = Number(BigInt(res * x) % BigInt(p));
        x = Number((BigInt(x) * BigInt(x)) % BigInt(p));
        y = y >> 1;
    }
    return res;
}

function prime_factors(num) {
    function is_prime(num) {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    const result = [];
    for (let i = 2; i <= num; i++) {
        while (is_prime(i) && num % i === 0) {
            if (!result.includes(i)) result.push(i);
            num /= i;
        }
    }
    return result;
}

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}
//// KEY MANAGEMENT
function sieveOfEratosthenes(n) {
    let array = [];
    let prime = Array.from({ length: n + 1 }, (_, i) => true);

    for (let p = 2; p * p <= n; p++) {
        if (prime[p] == true) {
            for (let i = p * p; i <= n; i += p) prime[i] = false;
        }
    }
    for (let i = 2; i <= n; i++) {
        if (prime[i] == true) array.push(i);
    }
    return array;
}

function getRandomInt(min, max) {
    // random int in (min, max)
    return Math.floor(Math.random() * (max - min)) + min;
}

//Base64 code
Base64 = {
    _Rixits: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",
    fromNumber: function (number, n) {
        if (
            isNaN(Number(number)) ||
            number === null ||
            number === Number.POSITIVE_INFINITY
        )
            throw "The input is not valid";
        if (number < 0) throw "Can't represent negative numbers now";

        let rixit; // like 'digit', only in some non-decimal radix
        let residual = Math.floor(number);
        let result = "";
        while (true) {
            rixit = residual % 64;
            // console.log("rixit : " + rixit);
            // console.log("result before : " + result);
            result = this._Rixits.charAt(rixit) + result;
            // console.log("result after : " + result);
            // console.log("residual before : " + residual);
            residual = Math.floor(residual / 64);
            // console.log("residual after : " + residual);

            if (residual == 0) break;
        }
        if (result.length < n) {
            var auxText = "";
            var need = n - result.length;
            for (var j = 0; j < need; ++j) {
                auxText += "0";
            }
            return auxText + result;
        }
        return result;
    },

    toNumber: function (rixits) {
        let result = 0;
        // console.log("rixits : " + rixits);
        // console.log("rixits.split('') : " + rixits.split(''));
        rixits = rixits.split("");
        for (let e = 0; e < rixits.length; e++) {
            // console.log("_Rixits.indexOf(" + rixits[e] + ") : " +
            // this._Rixits.indexOf(rixits[e]));
            // console.log("result before : " + result);
            result = result * 64 + this._Rixits.indexOf(rixits[e]);
            // console.log("result after : " + result);
        }
        return result;
    },
};

function sign(x, p, q, a) { // k entre 1 y q
    return power(x, a, p * q);
}

function verify(x, y, p, q, b) {
    return x % (p * q) == power(y, b, p * q);
}

function signSha(shaString, p, q, a) {
    let arr = [];
    let signArr = [];
    let jump = 4;
    let baseSep = 4;
    for (let i = 0; i < shaString.length / jump; i++) {
        arr.push(Number("0x" + shaString.slice(i * jump, (i + 1) * jump)));
    }
    for (let i = 0; i < arr.length; i++) {
        signArr.push(sign(arr[i], p, q, a));
    }
    //console.log(signArr);
    // Turn to base64
    var signText = "";
    for (let i = 0; i < signArr.length; i++) {
        signText += Base64.fromNumber(signArr[i], baseSep);
    }
    return signText;
}

function verifySha(shaString, signStr, p, q, b) {
    let arr = [];
    let jump = 4;
    let signArr = [];
    //let auxArr = [];
    let baseSep = 4;
    for (let i = 0; i < shaString.length / jump; i++) {
        arr.push(Number("0x" + shaString.slice(i * jump, (i + 1) * jump)));
    }
    for (var i = 0; i < signStr.length / baseSep; i ++) {
        signArr.push(Base64.toNumber(signStr.substring(baseSep * i, baseSep * (i + 1))));
    }
    console.log(signArr);
    for (let i = 0; i < arr.length; i++) {
        /*
        if (!verify(arr[i], signArr[i][0], signArr[i][1], p, q, alpha, beta)) {
          console.log('MUERE EN ' + arr[i])
        } else {
          console.log('CORRECTO PARA ' + arr[i])
        }
        */
        console.log(verify(arr[i], signArr[i], p, q, b));
        //if (!verify(arr[i], signArr[i][0], signArr[i][1], p, q, b)) return false;
    }
    return true;
}
function arrToBase64(numArr, sep) {
    var strOut = "";
    for (let i = 0; i < numArr.length; i++) {
        strOut += Base64.fromNumber(numArr[i], sep);
    }
    return strOut;
}
function base64ToArr(str, sep) {
    var arr = [];
    for (var i = 0; i < str.length / sep; i++) {
        arr.push(Base64.toNumber(str.substring(sep * i, sep * (i + 1))));
    }
    return arr;
}
const maxNumber = 7000;
const pArr = sieveOfEratosthenes(maxNumber).slice(50);
const pArrLen = pArr.length;

function generateKey() {
    let key = [];
    let p, q;
    let ranNum = 1, ranNum2 = 1;
    while (ranNum == ranNum2) {
        ranNum = getRandomInt(0, pArrLen);
        ranNum2 = getRandomInt(0, pArrLen);
    }
    p = pArr[ranNum];
    q = pArr[ranNum2];

    //p
    key.push(p);
    //q
    key.push(q);
    // Get generators of p
    /*
    let factorPm1 = prime_factors(p - 1);
    out:
    for (let g = 2; g < p - 2; g++) {
      for (let i = 0; i < factorPm1.length; i++) {
        if (power(g, (p - 1) / factorPm1[i], p) == 1) {
          continue out;
        }
      }
      gen.push(g);
    }
    */
    let tot = (p - 1) * (q - 1);
    ranNum = getRandomInt(3, tot);
    while (gcd(ranNum, tot) != 1) {
        ranNum = getRandomInt(3, tot);
    }
    let a = ranNum;
    let b = modInverse(a, tot);
    key.push(b);
    key.push(a);
    return key;
}

let text = '50137ab0be5e0c73ee0cd747f457e71822d6d5dcf00a7e807ed283467e42ffff';
let text2 = '50137ab0be5e0c73ee0cd747f457e71822d6d5dcf00a7e801ed283467e42ffff';
let llave = generateKey(); // [p, q, b, a]
console.log(llave);
//console.log(arrToBase64(llave, 4));
//console.log(base64ToArr(arrToBase64(llave, 4), 4));
//let llave = [17, 6007, 5, 12, 9]; //el q está mal
let firma = signSha(text, llave[0], llave[1], llave[3]);
console.log(firma);
console.log(verifySha(text, firma, llave[0], llave[1], llave[2]));

/*
let llave = generateKey();
console.log(llave);
let test = getRandomInt(0, 255);
let ranK = getRandomInt(1, llave[1] - 1);
let firma = sign(test, llave[0], llave[1], llave[2], llave[4]);
console.log(firma);
console.log(verify(test+1, firma[0], firma[1], llave[0], llave[1], llave[2], llave[3]));
*/