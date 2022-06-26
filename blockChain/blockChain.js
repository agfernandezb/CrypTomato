///////////////////////////////////////////////////////// Library
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
///////////////////////////////////////////////////////// Vigenere
var tools = require("./vigenere");
///////////////////////////////////////////////////////// Beginning of blockchain
//sha256
const SHA256 = require("crypto-js/sha256");

// console.log(SHA256("foertertreo").toString());
// console.log("foo");
/////////
function getTexts() {
  array = [
    "In the town where I was bornLived a man who sailed to seaAnd he told us of his lifeIn the land of submarinesSo we sailed on to the sunTil we found a sea of greenAnd we lived beneath the wavesIn our ye",
    "Here come old flat topHe come grooving up slowlyHe got joo joo eyeballHe one holy rollerHe got hair down to his kneeGot to be a joker he just do what he pleaseHe wear no shoe shineHe got toe jam footb",
    "I read the news today oh boyAbout a lucky man who made the gradeAnd though the news was rather sadWell I just had to laughI saw the photographHe blew his mind out in a carHe didnot notice that the lig",
    "Oh yeah Ill tell you somethingI think youll understandWhen I say that somethingI want to hold your handI want to hold your handI want to hold your handOh please say to meYoull let me be your manAnd pl",
    "When I find myself in times of troubleMother Mary comes to meSpeaking words of wisdomLet it beAnd in my hour of darknessShe is standing right in front of meSpeaking words of wisdomLet it beLet it be l",
  ];
  for (var i = 0; i < array.length; ++i) {
    array[i] = normalizeInput(array[i]);
  }
  return array;
}

// console.log(texts[0]);
// console.log(texts[1]);

class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
  calculateHash() {
    return SHA256(this.from + this.to + this.amount).toString();
  }
}

class Block {
  constructor(time, transactions, previoushHash = "") {
    this.time = time;
    this.transactions = transactions;
    this.previoushHash = previoushHash;
    this.hash = "";
  }

  getBlockHash() {
    return SHA256(
      this.time + JSON.stringify(this.transactions) + this.previoushHash
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
    this.height = 4;
    this.pendingTransactions = [];
    this.blocksToMine = []; //Arreglo de bloque y el texto cifrado
    this.miningReward = 0.4;
    this.texts = getTexts();
    this.blockChainSuperUser = "Cryptomato";
  }
  createGenesisBlock() {
    return new Block(Date.now(), [], "");
  }
  getLastBlock() {
    return this.chain[this.chain - 1];
  }
  mineBlock(guess, miningBlockNumber) {
    clearGuess = vigenere.vigenereCipher(
      this.blocksToMine[miningBlockNumber][1],
      guess
    );
    for (var i = 0; i < this.texts.length; ++i) {
      if (clearGuess == this.texts[i]) {
        console.log(
          "Block mined, the hash is: " + this.blocksToMine[0].getBlockHash()
        );
        //add money to the user from cryptomato
        break;
      }
    }
    console.log("Incorrect guess mate");
  }
  addBlocksToMine() {}
  addTransaction(transaction) {
    if (!transaction.from || !transaction.to) {
      console.log("No user to send or receive the tomatoes");
      return;
    }
    if (!transaction.isValid()) {
      console.log(
        "The transaction is not valid, the sender must have enough tomatoes to send in his available pool"
      );
      return;
    }
    this.pendingTransactions.push(transaction);
    this.addBlocksToMine();
  }
}

console.log("BEGINNING OF TESTS");
