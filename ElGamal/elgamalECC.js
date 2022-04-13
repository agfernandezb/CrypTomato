function verification_neg_mod(n, p) {
    // negative numbers to positive number in Z_p
    while (n < 0) {
        n = n + p;
    }
    return n % p
}
function getRandomInt(min, max) {
    // random int in (min, max)
    return Math.floor(Math.random() * (max - min)) + min;
}
function private_key_a(prime) {
    // Alice or Bob take a random key in [1,p-1]
    priv_key_a = getRandomInt(1, prime - 1);
    // console.log(priv_key_a);
    return priv_key_a;
}
function generateKey(primeNumber, primeArray, min) {
    var p;
    var minPrime = min;
    p = primeArray[Math.floor(Math.random() * primeNumber)];
    while (p <= minPrime) {
        p = primeArray[Math.floor(Math.random() * primeNumber)];
    }
    return p;
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
// Function to return gcd of a and b
function gcd(a, b) {
    if (a == 0)
        return b;
    return gcd(b % a, a);
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
// Print generators of n
function printGenerators(n) {
    // 1 is always a generator
    console.log("1 ");
    for (var i = 2; i < n; i++)
        // A number x is generator of
        // GCD is 1
        if (gcd(i, n) == 1)
            console.log(i + " ");
}
// var n = 29;
// printGenerators(n);
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
function inv_aditive(point, p) {
    //compute the aditive inverse of point mod p
    point = [(point[0]), verification_neg_mod(-point[1], p)];
    return point
}

function text_2_list_numbers(plaintext){
    var list = plaintext.split('');
    var array_cipher_list = [];
    for (let i = 0; i < list.length; i++) {
        array_cipher_list.push(plaintext[i].charCodeAt(0));
    }
    return array_cipher_list
}

function chipher_list_2_plaintext(cipher_list){
    var plaint_text_array = [];
    for (let i = 0; i < cipher_list.length; i++) {
        plaint_text_array.push(String.fromCharCode(cipher_list[i]));
    }
    plain_text = (plaint_text_array).join('');
    return plain_text
}

// ------------------------------------------------- INPUTS -------------------------------------------------------------------------

function generateRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function generateParams() {
    var primeArrayz = sieveOfEratosthenes(100000);
    var primeNumberz = primeArrayz.length;
    var prime_z = generateKey(primeNumberz, primeArrayz, 600);
    var primeArray = sieveOfEratosthenes(prime_z - 1);
    var primeNumber = primeArray.length;
    var arr = [];

    var alpha = generateKey(primeNumber, primeArray, 1);
    var M = getRandomInt(2, 100);
    arr.push(prime_z,alpha,M);
    return arr;
}

function cipher_Elgamal(plain_text, a_secret){
    var plain_text = text_2_list_numbers(plain_text);
    // var params = generateParams();
    var p = 24847;
    var alpha = 5119;
    var M = 39;
    var beta = power(alpha, a_secret,p);
    var y_1 = power(alpha, M ,p);
    var cipher_list = [];
    cipher_list.push(y_1);
    for (let i = 0; i < plain_text.length; i++) {
        var y_2 = (plain_text[i])*(power(beta,M,p))%p;
        cipher_list.push(y_2);
    }
    console.log(cipher_list);
    return(cipher_list);
}

function decipher_Elgamal(cipher_text, a_secret) {
    var inv_y_1 = modInverse(power(cipher_text[0],a_secret,24847),24847);
    var decipher_list = [];
    for (let i = 1; i < cipher_text.length; i++) {
        decipher_list.push((cipher_text[i]*inv_y_1)%24847);
    }    
    var plaint_text = chipher_list_2_plaintext(decipher_list);
    return plaint_text
}


//--------------------------------------------- Cipher & Decipher ------------------------------------------------------------------ 

Text_f = "Hola mi nombre es frailejon Ernesto Perez"

var cipher = cipher_Elgamal(Text_f,111);
console.log(decipher_Elgamal(cipher,111));