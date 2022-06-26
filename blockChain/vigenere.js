// Importar funciones de generalTools.
const { normalizeInput, codesToString } = require("./generalTools");
var tools = require("./generalTools");

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

//Ejemplo para vigenereCipher y vigenereDecipher
console.log("CIPHER");
console.log(
  vigenereCipher(
    "From Zanzibar to Zambia to Zaire, ozone zones make zebras run zany zigzags",
    "zone"
  )
);
console.log("DECIPHER");
console.log(
  vigenereDecipher(
    "efbqyoadhpnvscmelpvescmehfrsycaiycairanodnrfqofvtbmemmmmfnnkr",
    "zone"
  )
);

// Función que retorna una palabra aleatoria de longitud m, puede ser usada como clave.
function ranKey(size) {
  var arrTemp = Array(size)
    .fill(0)
    .map(() => Math.round(Math.random() * 25));
  return tools.codesToString(arrTemp);
}

console.log(ranKey(10));

// Función que retorna la frecuencia de todas las subpalabras de longitud lenChar de un texto (text)
function charFrecuency(text, lenChar) {
  var text = tools.normalizeInput(text);
  var frecuencyMap = {};
  for (var i = 0; i < text.length - (lenChar - 1); i++) {
    if (frecuencyMap[text.substring(i, i + lenChar)])
      frecuencyMap[text.substring(i, i + lenChar)] +=
        1 / (text.length - (lenChar - 1));
    else
      frecuencyMap[text.substring(i, i + lenChar)] =
        1 / (text.length - (lenChar - 1));
  }
  return frecuencyMap;
}

//Ejemplo para charFrecuency
/* console.log(
    charFrecuency(
        "efbqyoadhpnvscmelpvescmehfrsycaiycairanodnrfqofvtbmemmmmfnnkr",
        3
    )
); */

// Función que retorna los índices de las councidencias de una palabra (searchStr) en un texto (str)
function getIndicesOf(str, searchStr) {
  str = tools.normalizeInput(str);
  searchStr = tools.normalizeInput(searchStr);
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}

// Función que retorna el máximo común divisor de un arreglo de números (numList)
Math.gcd = function (numList) {
  if (numList.length == 2) {
    if (numList[1] == 0) return numList[0];
    else return Math.gcd(new Array(numList[1], numList[0] % numList[1]));
  } else if (numList.length > 2) {
    var result = Math.gcd(new Array(numList[0], numList[1]));
    for (var i = 2; i < numList.length; i++)
      result = Math.gcd(new Array(result, numList[i]));
    return result;
  }
};

// Función que retorna una posible longitud de la clave del cifrado Vigenere recibiendo el texto cifrado (cipherText)
// y una de las subpalabras de longitud > 3 que más se repita.
function kasiskiTest(cipherText, searchStr) {
  cipherText = tools.normalizeInput(str);
  searchStr = tools.normalizeInput(searchStr);
  var indices = getIndicesOf(cipherText, searchStr);
  if (indices.length == 0) {
    return 0;
  }
  var indexDiff = [];
  for (var i = 1; i < indices.length; i++) {
    indexDiff.push(indices[i] - indices[0]);
  }
  return Math.gcd(indexDiff);
}

// Ejemplo para kasiskiTest
/* console.log(
    kasiskiTest(
        normalizeInput(
            `CHREEVOAHMAERATBIAXXWTNXBEEOPHBSBQMQEQERBW
            RVXUOAKXAOSXXWEAHBWGJMMQMNKGRFVGXWTRZXWIAK
            LXFPSKAUTEMNDCMGTSXMXBTUIADNGMGPSRELXNJELX
            VRVPRTULHDNQWTWDTYGBPHXTFALJHASVBFXNGLLCHR
            ZBWELEKMSJIKNBHWRJGNMGJSGLXFEYPHAGNRBIEQJT
            AMRVLCRREMNDGLXRRIMGNSNRWCHRQHAEYEVTAQEBBI
            PEEWEVKAKOEWADREMXMTBHHCHRTKDNVRZCHRCLQOHP
            WQAIIWXNRMGWOIIFKEE`
        ),
        "chr"
    )
); */

// Función que retorna el índice de coincidencias de un texto (strText)
function coinciIndex(strText) {
  strText = tools.normalizeInput(strText);
  var text = tools.normalizeInput(strText);
  var frecuencies = {};
  for (var i = 0; i < text.length; i++) {
    if (frecuencies[text.charAt(i)]) {
      frecuencies[text.charAt(i)] += 1;
    } else {
      frecuencies[text.charAt(i)] = 1;
    }
  }
  var coincidence = 0;
  for (const [key, value] of Object.entries(frecuencies)) {
    coincidence += value * (value - 1);
  }
  var n = strText.length;

  return coincidence / (n * (n - 1));
}

// Función que divide un texto (strText) en m subpalabras y arma nuevas palabras tomando todos los caractesres que estén en
// la misma posición de la subpalabra
function splitStr(strText, m) {
  strText = tools.normalizeInput(strText);
  var strToSend = [];
  for (var i = 0; i < m; i++) {
    strToSend.push("");
  }
  for (var i = 0; i < strText.length; i++) {
    strToSend[i % m] += strText.charAt(i);
  }
  return strToSend;
}

// Función que retorna todos los m índices de coincidencia de un texto.
// Es buen m si los índices de coincidencia son cercanos a 0.065. Es un mal m si son cercanos a 0.038, así se escoge el m
function getAllCoincidenceIndex(strText, m) {
  strText = tools.normalizeInput(strText);
  var out = [];
  if (m <= 0) {
    return out;
  }
  var strToSend = splitStr(strText, m);
  //console.log(strToSend)
  for (var i = 0; i < m; i++) {
    out.push(coinciIndex(strToSend[i]));
  }
  return out;
}

// Ejemplo getAllCoincidenceIndex
/* console.log(
    getAllCoincidenceIndex(
        normalizeInput(
            `CHREEVOAHMAERATBIAXXWTNXBEEOPHBSBQMQEQERBW
            RVXUOAKXAOSXXWEAHBWGJMMQMNKGRFVGXWTRZXWIAK
            LXFPSKAUTEMNDCMGTSXMXBTUIADNGMGPSRELXNJELX
            VRVPRTULHDNQWTWDTYGBPHXTFALJHASVBFXNGLLCHR
            ZBWELEKMSJIKNBHWRJGNMGJSGLXFEYPHAGNRBIEQJT
            AMRVLCRREMNDGLXRRIMGNSNRWCHRQHAEYEVTAQEBBI
            PEEWEVKAKOEWADREMXMTBHHCHRTKDNVRZCHRCLQOHP
            WQAIIWXNRMGWOIIFKEE`
        ), 
        5
    )
); */

// Función de que retorna la M_g(strText): la suma de para cada letra del alfabeto
// (probabilidad estándar de una letra en inglés)*(probabilidad de la letra corrida g posisciones en el texto).
// Lo que, entre más cercano a 0.065, significa que esa letra se corrió k posiciones en el texto.
function funM_g(strText, g) {
  strText = tools.normalizeInput(strText);
  // Probabilidades estandar de encontrarse la i-ésima letra de un texto en inglés.
  var standardProbabilities = [
    0.082, 0.015, 0.028, 0.043, 0.127, 0.022, 0.02, 0.061, 0.07, 0.002, 0.008,
    0.04, 0.024, 0.067, 0.075, 0.019, 0.001, 0.06, 0.063, 0.091, 0.028, 0.01,
    0.023, 0.001, 0.02, 0.001,
  ];
  var text = tools.normalizeInput(strText);
  var frecuencies = {};
  for (var i = 0; i < text.length; i++) {
    if (frecuencies[text.charAt(i)]) frecuencies[text.charAt(i)] += 1;
    else frecuencies[text.charAt(i)] = 1;
  }
  var t = [];
  for (var i = 0; i < standardProbabilities.length; i++) {
    t = [(i + g) % 26];
    if (frecuencies[codesToString(t)]) {
      standardProbabilities[i] *= frecuencies[codesToString(t)];
    } else {
      standardProbabilities[i] = 0;
    }
  }
  var sum = 0;
  for (var i = 0; i < standardProbabilities.length; i++) {
    sum += standardProbabilities[i];
  }
  return sum / strText.length;
}

// Función que retorna la posible clave del texto cifrado con Vigenere (cipherText) suponinedo que la clave es de longitud m
function vigenereCryptanalysis(cipherText, m) {
  cipherText = tools.normalizeInput(cipherText);
  var possibleKey = splitStr(cipherText, m);
  const expectedCI = 0.065;
  var minDiff = -1;
  var indexMinDiff = -1;
  var testDiff = 0;
  for (var i = 0; i < m; i++) {
    minDiff = 100;
    indexMinDiff = 0;
    for (var j = 0; j < 26; j++) {
      testDiff = Math.abs(funM_g(possibleKey[i], j) - expectedCI);
      if (testDiff < minDiff) {
        minDiff = testDiff;
        indexMinDiff = j;
      }
    }
    possibleKey[i] = codesToString([indexMinDiff]);
  }
  console.log(vigenereDecipher(cipherText, possibleKey.join("")));
  return possibleKey.join("");
}

// Ejemplo para vigenereCryptanalysis
console.log(
  vigenereCryptanalysis(
    normalizeInput(
      `CHREEVOAHMAERATBIAXXWTNXBEEOPHBSBQMQEQERBW
            RVXUOAKXAOSXXWEAHBWGJMMQMNKGRFVGXWTRZXWIAK
            LXFPSKAUTEMNDCMGTSXMXBTUIADNGMGPSRELXNJELX
            VRVPRTULHDNQWTWDTYGBPHXTFALJHASVBFXNGLLCHR
            ZBWELEKMSJIKNBHWRJGNMGJSGLXFEYPHAGNRBIEQJT
            AMRVLCRREMNDGLXRRIMGNSNRWCHRQHAEYEVTAQEBBI
            PEEWEVKAKOEWADREMXMTBHHCHRTKDNVRZCHRCLQOHP
            WQAIIWXNRMGWOIIFKEE`
    ),
    5
  )
);
