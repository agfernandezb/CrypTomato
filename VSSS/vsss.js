var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
const image1 = new Image();           
image1.src = 'lena.png';              // Path de la imagen, o URL   ____INPUT____
image1.crossOrigin = 'anonymous';
const width_image = (image1.width)    // Tamaño de la imagen Ancho
const height_image = (image1.height)  // Tamaño de la imagen Alto
canvas.width = width_image ;
canvas.height = height_image;

function ConvertToBinary(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    return bin;
}
function ConvertToDecimal(num) {
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
       sum += +num[i] * 2 ** (num.length - 1 - i);}
    return sum;
}
function digits_bin(number){
    var num = number;
    var digits = num.toString().split('');
    var realDigits = digits.map(Number)
    return realDigits;
}
function xor_bin(v1,v2) {
    let xor_list = []
    for (let i = 0; i < v1.length ; i++) {
        val_mod = ((parseInt(v1[i],10)+parseInt(v2[i],10))%2);
        xor_list.push(val_mod.toString());}
    return xor_list; 
}
function key_generator1_2(key,P10,P8){
    let key_list = digits_bin(key);
    let P10Key = [];
    let CI1 = [];
    let CI2 = [];
    let Key_1 = [];
    let Key_2 = [];
    for(var i=0; i <= key_list.length -1 ; i++){
        P10Key.push(key_list[(P10[i]-1)]);}
    CI1 = [P10Key[1],P10Key[2],P10Key[3],P10Key[4],P10Key[0],P10Key[6],P10Key[7],P10Key[8],P10Key[9],P10Key[5]];
    for(var j=0; j <= P8.length -1 ; j++){
        Key_1.push(CI1[(P8[j]-1)]);}
    CI2 = [CI1[2],CI1[3],CI1[4],CI1[0],CI1[1],CI1[7],CI1[8],CI1[9],CI1[5],CI1[6]];
    for(var j=0; j <= P8.length -1 ; j++){
        Key_2.push(CI2[(P8[j]-1)]);}
    let Two_Keys = [Key_1,Key_2];
    return Two_Keys;
}
function functionX (Left ,Right, E_P, S_0, S_1, P4, KeyT){
    let EP_step = [];
    let P4_step = [];
    let S_part = [];
    let S_part2 = [];
    for(var i=0; i <= E_P.length-1 ; i++){
        EP_step.push(Right[(E_P[i]-1)]);}
    xor = xor_bin(EP_step,KeyT);
    let L1_xor = [xor[0],xor[3]];
    let L2_xor = [xor[1],xor[2]];
    L1_xor = L1_xor.join('');
    L2_xor = L2_xor.join('');
    let R1_xor = [xor[4],xor[7]];
    let R2_xor = [xor[5],xor[6]]
    R1_xor = R1_xor.join('');
    R2_xor = R2_xor.join('');
    S_part = [(S_0[ConvertToDecimal(L1_xor)][ConvertToDecimal(L2_xor)]),(S_1[ConvertToDecimal(R1_xor)][ConvertToDecimal(R2_xor)])];
    for (let i = 0; i < 3; i++) {
        at = S_part[i]
        if (at === 0) {
            S_part2.push(0);
            S_part2.push(0);
        } else if(at === 1){
            S_part2.push(0);
            S_part2.push(1);
        } else if(at === 2){
            S_part2.push(1);
            S_part2.push(0);
        } else{
            S_part2.push(1);
            S_part2.push(1);}}
    for(var i=0; i <= P4.length-1 ; i++){
        P4_step.push(S_part2[(P4[i]-1)]);}
    xor2 = xor_bin(P4_step,Left);
    return xor2;
}
function SDES_cipher(IP, E_P, S_0, S_1, P4, K_1, K_2, PlainText, IPI){
    let PlainTextDigits = digits_bin(PlainText);
    while (PlainTextDigits.length != 8){
        PlainTextDigits.unshift(0);
    }
    let stepIP = [];
    let cipherSDES = [];
    for(var i=0; i <= IP.length-1 ; i++){
        stepIP.push(PlainTextDigits[(IP[i]-1)]);}
    RightC = [stepIP[4],stepIP[5],stepIP[6],stepIP[7]];
    LeftC = [stepIP[0],stepIP[1],stepIP[2],stepIP[3]];
    NewRight = functionX(LeftC,RightC,E_P,S_0,S_1,P4,K_1);
    NewLeft = RightC;
    NewLeft = functionX(NewLeft,NewRight,E_P,S_0,S_1,P4,K_2);
    preIPinv = NewLeft.concat(NewRight);
    for(var i=0; i <= IPI.length-1 ; i++){
        cipherSDES.push(preIPinv[(IPI[i]-1)]);}
    cipherSDES = cipherSDES.join('');
    return cipherSDES;
}
function SDES_cipher_image(scannedData,IP, E_P, S_0, S_1, P4, K_1, K_2, IPI){ // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]
    for (let i = 0; i <= scannedData.length-4; i+=4) {
        I_0 = SDES_cipher(IP, E_P, S_0, S_1, P4, K_1, K_2, ConvertToBinary(scannedData[i]), IPI);
        I_1 = SDES_cipher(IP, E_P, S_0, S_1, P4, K_1, K_2, ConvertToBinary(scannedData[i+1]), IPI);
        I_2 = SDES_cipher(IP, E_P, S_0, S_1, P4, K_1, K_2, ConvertToBinary(scannedData[i+2]), IPI);
        scannedData[i] = ConvertToDecimal(I_0);
        scannedData[i+1] = ConvertToDecimal(I_1);
        scannedData[i+2] = ConvertToDecimal(I_2);
    }
    console.log(scannedData)
    return scannedData
};
function SDES_decipher_image(scannedData,IP, E_P, S_0, S_1, P4, K_1, K_2, IPI){ // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]
    for (let i = 0; i <= scannedData.length-4; i+=4) {
        I_0 = SDES_cipher(IP, E_P, S_0, S_1, P4, K_2, K_1, ConvertToBinary(scannedData[i]), IPI);
        I_1 = SDES_cipher(IP, E_P, S_0, S_1, P4, K_2, K_1, ConvertToBinary(scannedData[i+1]), IPI);
        I_2 = SDES_cipher(IP, E_P, S_0, S_1, P4, K_2, K_1, ConvertToBinary(scannedData[i+2]), IPI);
        scannedData[i] = ConvertToDecimal(I_0);
        scannedData[i+1] = ConvertToDecimal(I_1);
        scannedData[i+2] = ConvertToDecimal(I_2);
    }
    console.log(scannedData)
    return scannedData
};
let P10 = [3,5,2,7,4,10,1,9,8,6];
let P8  = [6,3,7,4,8,5,10,9];
let IP = [2,6,3,1,4,8,5,7];
let IPI = [4,1,3,5,7,2,8,6];
let E_P = [4,1,2,3,2,3,4,1];
let P4 = [2,4,3,1];
let S_0 = [[1,0,3,2],[3,2,1,0],[0,2,1,3],[3,1,3,2]];
let S_1 = [[0,1,2,3],[2,0,1,3],[3,0,1,0],[2,1,0,3]];



// --------------------- INPUT PARA IMAGEN -----------------------

let key_p = 1010000010;
// También recibe imagen (Linea 5 del código)


image1.addEventListener('load', function(){ // Imprime la imagen
    ctx.drawImage(image1,0,0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
    const scannedData = scannedImage.data; // Array de datos img
    console.log(scannedData);
    K_1 = (key_generator1_2(key_p, P10, P8))[0];
    K_2 = (key_generator1_2(key_p, P10, P8))[1];
    
    // CIFRA O DECIFRA IMAGEN

    SDES_cipher_image(scannedData,IP, E_P, S_0, S_1, P4, K_1, K_2, IPI); // FUNCIÓN QUE CIFRA IMAGEN
    
    //SDES_decipher_image(scannedData,IP, E_P, S_0, S_1, P4, K_1, K_2, IPI); // FUNCIÓN QUE DECIFRA IMAGEN
    
    console.log(scannedImage);
    ctx.putImageData(scannedImage,0,0);
})
