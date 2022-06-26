///////////////////////////////////////////////////////// Library
var tools = require("./generalTools");

function ranKey(size) {
  var arrTemp = Array(size)
    .fill(0)
    .map(() => Math.round(Math.random() * 25));
  return tools.codesToString(arrTemp);
}
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

// Función que cifra (o descifra cuando cipher=false) un texto (clearText) usando el método de Vigenere con la clave (key).
function vigenere(clearText, key, cipher) {
  var normalTextCodes = tools.getCharCodes(tools.normalizeInput(clearText));
  var normalKeyCodes = tools.getCharCodes(tools.normalizeInput(key));
  var m = normalKeyCodes.length;
  var indexKey = 0;
  for (var i = 0; i < normalTextCodes.length; i++) {
    indexKey = i % m;
    if (cipher)
      normalTextCodes[i] = (normalTextCodes[i] + normalKeyCodes[indexKey]) % 26;
    else
      normalTextCodes[i] =
        (normalTextCodes[i] - normalKeyCodes[indexKey] + 26) % 26;
  }
  return tools.codesToString(normalTextCodes);
}

// Función que cifra un texto (clearText) con una clave (key) usando Vigenere.
function vigenereCipher(clearText, key) {
  return vigenere(clearText, key, true);
}

// Función que descifra un texto (cipherText) con una clave (key) usando Vigenere.
function vigenereDecipher(cipherText, key) {
  return vigenere(cipherText, key, false);
}
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
    this.hash = this.getBlockHash();
    this.text = "";
  }

  getBlockHash() {
    return SHA256(
      this.time + JSON.stringify(this.transactions) + this.previoushHash
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.blockChainSuperUser = "Cryptomato";
    this.chain = [this.createGenesisBlock()];
    this.height = 4;
    this.pendingTransactions = [];
    this.blocksToMine = []; //Arreglo de bloque y el texto cifrado
    this.miningReward = 0.4;
    this.keyLength = 10;
    this.texts = getTexts();
    this.users = ["Antonia", "Pedoro", "Linguini", "David"];
  }
  createGenesisBlock() {
    var genesis = new Block(new Date(Date.now()).toString(), [], "");
    var usuarios = ["Antonia", "Pedoro", "Linguini", "David"];
    var transactions = [];
    for (var i = 0; i < 4; ++i) {
      transactions.push(
        new Transaction(this.blockChainSuperUser, usuarios[i], 10)
      );
    }
    genesis.transactions = transactions;
    genesis.hash = genesis.getBlockHash();
    return genesis;
  }
  printPendingTransactions() {
    for (var i = 0; i < this.pendingTransactions.length; ++i) {
      console.log(
        "Transaction #" +
          (i + 1) +
          " " +
          this.pendingTransactions[i].from +
          " " +
          this.pendingTransactions[i].to +
          " " +
          this.pendingTransactions[i].amount
      );
    }
  }
  getBalanceOfUser(user) {
    var balance = 0;
    user = tools.normalizeInput(user);
    //console.log(user);
    for (var i = 0; i < this.chain.length; ++i) {
      var tempBlock = this.chain[i];
      for (var j = 0; j < tempBlock.transactions.length; ++j) {
        var tempTransaction = tempBlock.transactions[j];
        //console.log(normalizeInput(tempTransaction.from));
        if (normalizeInput(tempTransaction.from) == user) {
          balance -= tempTransaction.amount;
        }
        if (normalizeInput(tempTransaction.to) == user) {
          balance += tempTransaction.amount;
        }
      }
    }
    return balance;
  }

  getTotalBalance() {
    var usersBalance = [];
    for (var z = 0; z < this.users.length; ++z) {
      var userInfo = [];
      var tempUsuario = this.users[z];
      var historicBalance = 0;
      var pendingBalance = 0;

      tempUsuario = tools.normalizeInput(tempUsuario);
      for (var i = 0; i < this.chain.length; ++i) {
        var tempBlock = this.chain[i];
        for (var j = 0; j < tempBlock.transactions.length; ++j) {
          var tempTransaction = tempBlock.transactions[j];
          if (normalizeInput(tempTransaction.from) == tempUsuario) {
            historicBalance -= tempTransaction.amount;
          }
          if (normalizeInput(tempTransaction.to) == tempUsuario) {
            historicBalance += tempTransaction.amount;
          }
        }
      }
      for (var i = 0; i < this.pendingTransactions.length; ++i) {
        if (normalizeInput(this.pendingTransactions[i].from) == tempUsuario)
          pendingBalance -= this.pendingTransactions[i].amount;
      }
      for (var i = 0; i < this.blocksToMine.length; ++i) {
        var tempBlock = this.blocksToMine[i];
        for (var j = 0; j < tempBlock.transactions.length; ++j) {
          if (normalizeInput(tempBlock.transactions[j].from) == tempUsuario)
            pendingBalance -= tempBlock.transactions[j].amount;
        }
      }
      userInfo.push(tempUsuario);
      userInfo.push(historicBalance);
      userInfo.push(pendingBalance);
      usersBalance.push(userInfo);
    }
    return usersBalance;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
  mineBlock(guess, miningBlockNumber, minerName) {
    //add to this block the latest block address
    if (
      miningBlockNumber > this.blocksToMine.length ||
      this.blocksToMine.length == 0
    ) {
      return;
    }
    var clearGuess = vigenereDecipher(
      this.blocksToMine[miningBlockNumber].text,
      guess
    );
    for (var i = 0; i < this.texts.length; ++i) {
      if (clearGuess == this.texts[i]) {
        var reward = new Transaction(
          this.blockChainSuperUser,
          minerName,
          this.miningReward
        );
        this.blocksToMine[miningBlockNumber].transactions.push(reward);
        var lastHash = this.getLastBlock().getBlockHash();
        this.chain.push(this.blocksToMine[miningBlockNumber]);
        this.blocksToMine.splice(miningBlockNumber, 1);
        this.getLastBlock().time = new Date(Date.now()).toString();
        this.getLastBlock().previoushHash = lastHash;
        this.getLastBlock().hash = this.getLastBlock().getBlockHash();
        console.log("Block mined, the hash is: " + this.getLastBlock().hash);
        return;
      }
    }
    console.log("Incorrect guess mate");
  }
  isValid(transaction) {
    var userBalance = this.getBalanceOfUser(transaction.from);
    var user = normalizeInput(transaction.from);
    for (var i = 0; i < this.pendingTransactions.length; ++i) {
      if (normalizeInput(this.pendingTransactions[i].from) == user)
        userBalance -= this.pendingTransactions[i].amount;
    }
    for (var i = 0; i < this.blocksToMine.length; ++i) {
      var tempBlock = this.blocksToMine[i];
      for (var j = 0; j < tempBlock.transactions.length; ++j) {
        if (normalizeInput(tempBlock.transactions[j].from) == tempUsuario)
          userBalance -= tempBlock.transactions[j].amount;
      }
    }
    return userBalance >= transaction.amount;
  }

  addBlocksToMine() {
    if (this.pendingTransactions.length == this.height) {
      var block = new Block("", [], "");
      for (var i = 0; i < 4; ++i) {
        block.transactions.push(this.pendingTransactions[i]);
      }
      for (var i = 3; i >= 0; --i) {
        this.pendingTransactions.splice(i, 1);
      }
      var key = ranKey(this.keyLength);
      //var key = "aaaaaaaaaa";
      //console.log("KEY", key);
      var cleartext = this.texts[Math.floor(Math.random() * this.texts.length)];
      block.text = vigenereCipher(cleartext, key);
      this.blocksToMine.push(block);
    }
  }
  addTransaction(transaction) {
    if (!transaction.from || !transaction.to) {
      console.log("No user to send or receive the tomatoes");
      return;
    }
    if (transaction.from == transaction.to) {
      console.log(
        "You cannot send tomateos to yourself, they are meant to be shared"
      );
      return;
    }
    if (!this.isValid(transaction)) {
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
tomatoChain = new BlockChain();
console.log(tomatoChain.chain[0].transactions.length);

var usuarios = ["Antonia", "Pedoro", "Linguini", "David"];

console.log(tomatoChain.getBalanceOfUser("Antonia"));

transaction = new Transaction(usuarios[0], usuarios[1], 1);

tomatoChain.addTransaction(transaction);

tomatoChain.printPendingTransactions();

console.log(JSON.stringify(tomatoChain.pendingTransactions));

tomatoChain.addTransaction(transaction);
tomatoChain.addTransaction(transaction);
tomatoChain.addTransaction(transaction);

console.log(tomatoChain.getTotalBalance().toString());
