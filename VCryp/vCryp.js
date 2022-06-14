function array_zeros_new_image(height_image, width_image) {
    var index_cant = height_image * width_image * 4 * 16;
    //console.log("h & w cipher", height_image, width_image, index_cant);
    var array_zeros_total = Array(index_cant).fill(0);
    //console.log("height_image", height_image, "width_image", width_image, array_zeros_total.length);
    return array_zeros_total;
}

function array_zeros_new_image_d(height_image, width_image) {
    var index_cant = height_image * width_image;
    //console.log("h & w decipher", height_image, width_image, index_cant);
    var array_zeros_total = Array(index_cant).fill(0);
    return array_zeros_total;
}

function arrayMax(arr) { // Max of array
    return arr.reduce(function (p, v) {
        return (p > v ? p : v);
    });
}

function prod_lattice(arr1, arr2, arr3) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] == arr2[i] && arr1[i] == 255) {
            arr3[i] = 255;
        }
        else {
            arr3[i] = 0;
        }
    }
    return arr3
}

function random_array(array) {
    // array_n = array;
    var array_n = array.sort(function () { return Math.random() - 0.5 });
    return array_n;
}

// ---------------- CONFIGURATION COLORS -----------

function transformation_m16(R, G, B, i_g, width_image, scannedData_new1, scannedData_new2) {
    const black = [0, 0, 0];
    const red = [255, 0, 0];
    const green = [0, 255, 0];
    const blue = [0, 0, 255];
    const yellow = [255, 255, 0];
    const magenta = [255, 0, 255];
    const cyan = [0, 255, 255];
    const white = [255, 255, 255];

    var K_col = [[black, white], [cyan, black], [black, cyan], [white, black], [black, yellow], [white, black], [black, white], [yellow, black], [black, yellow], [yellow, black], [black, white], [white, black], [magenta, cyan], [yellow, magenta], [magenta, yellow], [cyan, magenta]];

    var R_col = [[yellow, magenta], [magenta, yellow], [yellow, magenta], [magenta, yellow], [yellow, white], [white, black], [black, cyan], [cyan, black], [black, cyan], [cyan, black], [black, yellow], [black, white], [black, white], [white, black], [white, black], [black, black]];
    var G_col = [[yellow, cyan], [yellow, cyan], [cyan, yellow], [cyan, yellow], [yellow, yellow], [white, black], [white, black], [white, black], [black, white], [black, white], [black, white], [magenta, black], [magenta, black], [black, magenta], [black, magenta], [black, black]];
    var B_col = [[magenta, cyan], [magenta, cyan], [cyan, magenta], [cyan, magenta], [white, yellow], [yellow, black], [yellow, black], [black, yellow], [black, yellow], [yellow, black], [black, white], [black, white], [black, white], [white, black], [white, black], [black, black]];

    var Y_col = [[yellow, white], [yellow, white], [yellow, white], [white, yellow], [white, yellow], [white, yellow], [black, cyan], [black, cyan], [cyan, black], [cyan, black], [black, magenta], [black, magenta], [magenta, black], [magenta, black], [black, black], [black, black]];
    var M_col = [[magenta, white], [magenta, white], [white, magenta], [white, magenta], [white, white], [black, yellow], [black, yellow], [yellow, black], [yellow, black], [yellow, black], [black, cyan], [black, cyan], [cyan, black], [cyan, black], [black, black], [black, yellow]];
    var C_col = [[cyan, white], [cyan, white], [white, cyan], [white, cyan], [white, white], [yellow, black], [yellow, black], [yellow, black], [black, yellow], [black, yellow], [black, magenta], [black, magenta], [magenta, black], [magenta, black], [black, yellow], [black, black]];

    var W_col = [[white, white], [white, white], [white, white], [magenta, magenta], [magenta, magenta], [yellow, yellow], [yellow, yellow], [yellow, yellow], [cyan, cyan], [cyan, cyan], [black, black], [black, black], [black, black], [black, black], [black, black], [black, black]];

    var color_array = [];
    if (R == 255 && G == 255 && B == 255) {
        color_array = random_array(W_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g, scannedData_new1, width_image, 0, color_array);
        scannedData_new2 = agregation_array(i_g, scannedData_new2, width_image, 1, color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if (R == 255 && G == 255 && B == 0) {
        color_array = random_array(Y_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g, scannedData_new1, width_image, 0, color_array);
        scannedData_new2 = agregation_array(i_g, scannedData_new2, width_image, 1, color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if (R == 255 && G == 0 && B == 255) {
        color_array = random_array(M_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g, scannedData_new1, width_image, 0, color_array);
        scannedData_new2 = agregation_array(i_g, scannedData_new2, width_image, 1, color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if (R == 0 && G == 255 && B == 255) {
        color_array = random_array(C_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g, scannedData_new1, width_image, 0, color_array);
        scannedData_new2 = agregation_array(i_g, scannedData_new2, width_image, 1, color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if (R == 255 && G == 0 && B == 0) {
        color_array = random_array(R_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g, scannedData_new1, width_image, 0, color_array);
        scannedData_new2 = agregation_array(i_g, scannedData_new2, width_image, 1, color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if (R == 0 && G == 255 && B == 0) {
        color_array = random_array(G_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g, scannedData_new1, width_image, 0, color_array);
        scannedData_new2 = agregation_array(i_g, scannedData_new2, width_image, 1, color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if (R == 0 && G == 0 && B == 255) {
        color_array = random_array(B_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g, scannedData_new1, width_image, 0, color_array);
        scannedData_new2 = agregation_array(i_g, scannedData_new2, width_image, 1, color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if (R == 0 && G == 0 && B == 0) {
        color_array = random_array(K_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g, scannedData_new1, width_image, 0, color_array);
        scannedData_new2 = agregation_array(i_g, scannedData_new2, width_image, 1, color_array);
        return [scannedData_new1, scannedData_new2];
    }

}

// [[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]]]

function agregation_array(i_g, scannedData_new, width_image, img_0_or_1, color_array) {
    var i = i_g;
    var k = 16 * width_image;
    var k2 = 32 * width_image;
    var k3 = 48 * width_image;

    scannedData_new[i] = color_array[0][img_0_or_1][0];
    scannedData_new[i + 1] = color_array[0][img_0_or_1][1];
    scannedData_new[i + 2] = color_array[0][img_0_or_1][2];
    scannedData_new[i + 3] = 255;
    //3 -> 255
    scannedData_new[i + 4] = color_array[1][img_0_or_1][0];
    scannedData_new[i + 5] = color_array[1][img_0_or_1][1];
    scannedData_new[i + 6] = color_array[1][img_0_or_1][2];
    scannedData_new[i + 7] = 255;
    //7 -> 255
    scannedData_new[i + 8] = color_array[2][img_0_or_1][0];
    scannedData_new[i + 9] = color_array[2][img_0_or_1][1];
    scannedData_new[i + 10] = color_array[2][img_0_or_1][2];
    scannedData_new[i + 11] = 255;
    //11 -> 255
    scannedData_new[i + 12] = color_array[3][img_0_or_1][0];
    scannedData_new[i + 13] = color_array[3][img_0_or_1][1];
    scannedData_new[i + 14] = color_array[3][img_0_or_1][2];
    scannedData_new[i + 15] = 255;
    //15 -> 255

    scannedData_new[i + k] = color_array[4][img_0_or_1][0];
    scannedData_new[i + 1 + k] = color_array[4][img_0_or_1][1];
    scannedData_new[i + 2 + k] = color_array[4][img_0_or_1][2];
    scannedData_new[i + 3 + k] = 255;

    scannedData_new[i + 4 + k] = color_array[5][img_0_or_1][0];
    scannedData_new[i + 5 + k] = color_array[5][img_0_or_1][1];
    scannedData_new[i + 6 + k] = color_array[5][img_0_or_1][2];
    scannedData_new[i + 7 + k] = 255;

    scannedData_new[i + 8 + k] = color_array[6][img_0_or_1][0];
    scannedData_new[i + 9 + k] = color_array[6][img_0_or_1][1];
    scannedData_new[i + 10 + k] = color_array[6][img_0_or_1][2];
    scannedData_new[i + 11 + k] = 255;

    scannedData_new[i + 12 + k] = color_array[7][img_0_or_1][0];
    scannedData_new[i + 13 + k] = color_array[7][img_0_or_1][1];
    scannedData_new[i + 14 + k] = color_array[7][img_0_or_1][2];
    scannedData_new[i + 15 + k] = 255;


    scannedData_new[i + k2] = color_array[8][img_0_or_1][0];
    scannedData_new[i + 1 + k2] = color_array[8][img_0_or_1][1];
    scannedData_new[i + 2 + k2] = color_array[8][img_0_or_1][2];
    scannedData_new[i + 3 + k2] = 255;

    scannedData_new[i + 4 + k2] = color_array[9][img_0_or_1][0];
    scannedData_new[i + 5 + k2] = color_array[9][img_0_or_1][1];
    scannedData_new[i + 6 + k2] = color_array[9][img_0_or_1][2];
    scannedData_new[i + 7 + k2] = 255;

    scannedData_new[i + 8 + k2] = color_array[10][img_0_or_1][0];
    scannedData_new[i + 9 + k2] = color_array[10][img_0_or_1][1];
    scannedData_new[i + 10 + k2] = color_array[10][img_0_or_1][2];
    scannedData_new[i + 11 + k2] = 255;

    scannedData_new[i + 12 + k2] = color_array[11][img_0_or_1][0];
    scannedData_new[i + 13 + k2] = color_array[11][img_0_or_1][1];
    scannedData_new[i + 14 + k2] = color_array[11][img_0_or_1][2];
    scannedData_new[i + 15 + k2] = 255;


    scannedData_new[i + k3] = color_array[12][img_0_or_1][0];
    scannedData_new[i + 1 + k3] = color_array[12][img_0_or_1][1];
    scannedData_new[i + 2 + k3] = color_array[12][img_0_or_1][2];
    scannedData_new[i + 3 + k3] = 255;

    scannedData_new[i + 4 + k3] = color_array[13][img_0_or_1][0];
    scannedData_new[i + 5 + k3] = color_array[13][img_0_or_1][1];
    scannedData_new[i + 6 + k3] = color_array[13][img_0_or_1][2];
    scannedData_new[i + 7 + k3] = 255;

    scannedData_new[i + 8 + k3] = color_array[14][img_0_or_1][0];
    scannedData_new[i + 9 + k3] = color_array[14][img_0_or_1][1];
    scannedData_new[i + 10 + k3] = color_array[14][img_0_or_1][2];
    scannedData_new[i + 11 + k3] = 255;

    scannedData_new[i + 12 + k3] = color_array[15][img_0_or_1][0];
    scannedData_new[i + 13 + k3] = color_array[15][img_0_or_1][1];
    scannedData_new[i + 14 + k3] = color_array[15][img_0_or_1][2];
    scannedData_new[i + 15 + k3] = 255;

    return scannedData_new;
}

//----------------------------------------------------------------------------------------------------------------
//                                         CIPHER FUNCTION
//----------------------------------------------------------------------------------------------------------------

function VSSS_cipher_image(scannedData, height_image, width_image) { // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]
    var scannedData_new1 = array_zeros_new_image(height_image, width_image); //
    var scannedData_new2 = array_zeros_new_image(height_image, width_image);
    //console.log("scannedData_new1", scannedData_new1.length, "scannedData_new1", scannedData_new2.length);
    // Imagen normalizada
    var count = 0;
    var count_z = 0;
    // var flag = false;
    var i_g = 0;
    for (let i = 0; i <= scannedData.length - 1; i += 4) { //scannedData.length
        if (Number.isInteger(count / width_image)) {
            i_g = i * 16;
        }
        else {
            i_g = i_g + 16;
        }
        var full_2_array = transformation_m16(scannedData[i], scannedData[i + 1], scannedData[i + 2], i_g, width_image, scannedData_new1, scannedData_new2);
        scannedData_new1 = full_2_array[0];
        scannedData_new2 = full_2_array[1];
        count = count + 1;
        count_z = Math.trunc(count / width_image);
    }
    // console.log("22222", "scannedData_new1", scannedData_new1.length, "scannedData_new1", scannedData_new2.length);
    return [scannedData_new1, scannedData_new2];
};

//----------------------------------------------------------------------------------------------------------------
//                                         DECIPHER FUNCTION
//----------------------------------------------------------------------------------------------------------------

function VSSS_decipher_image(scannedData1, scannedData2, height_image, width_image) { // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]

    var scannedData_new1 = array_zeros_new_image_d(height_image, width_image); //
    //console.log("wtf", scannedData1.length, scannedData2.length, scannedData_new1.length)
    scannedData_new1 = prod_lattice(scannedData1, scannedData2, scannedData_new1)

    return scannedData_new1;
};
// NORMALIZE IMAGE INPUT FOR ENCRYPTION
function normaliceImgInput(rgbArray) {
    var retArr = rgbArray;
    const black = [0, 0, 0];
    const red = [255, 0, 0];
    const green = [0, 255, 0];
    const blue = [0, 0, 255];
    const yellow = [255, 255, 0];
    const magenta = [255, 0, 255];
    const cyan = [0, 255, 255];
    const white = [255, 255, 255];
    const lattColors = [black, red, green, blue, yellow, magenta, cyan, white];
    var auxArray = [-1, -1, -1];
    var nearestIndex = 9;
    var minDistAux = 10000;
    for (let i = 0; i < retArr.length; i += 4) {
        nearestIndex = 9;
        minDistAux = 10000;
        auxArray = [retArr[i], retArr[i + 1], retArr[i + 2]];
        // set alpha
        retArr[i + 3] = 255;
        for (let j = 0; j < lattColors.length; j++) {
            if (distArray(auxArray, lattColors[j]) < minDistAux) {
                nearestIndex = j;
                minDistAux = distArray(auxArray, lattColors[j]);
            }
        }
        retArr[i] = lattColors[nearestIndex][0];
        retArr[i + 1] = lattColors[nearestIndex][1];
        retArr[i + 2] = lattColors[nearestIndex][2];
    }
    return retArr;
}
function distArray(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return -1;
    }
    var sum = 0;
    for (let i = 0; i < arr1.length; i++) {
        sum += Math.pow(arr1[i] - arr2[i], 2);
    }

    return Math.sqrt(sum);
}
// HANDLE IMAGE UPLOADING
const inputEncrypt = document.getElementById('image_inputE');
const inputDecrypt = document.getElementById('image_inputD');

inputEncrypt.onchange = function (e) {
    var img = new Image();
    img.onload = drawEn;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
    img.crossOrigin = 'anonymous';
};
function drawEn() {
    if (this.width > 700 || this.height > 700) {
        alert("The image is too big!");
        return;
    }
    var canvas = document.getElementById('canvasNormal');
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scannedData = scannedImage.data;
    // Normalice colors of input image
    const normRGBArray = normaliceImgInput(scannedData);
    scannedImage.data.set(new Uint8ClampedArray(normRGBArray));
    ctx.putImageData(scannedImage, 0, 0);
}

inputDecrypt.onchange = function (e) {
    if (this.files.length == 1) {
        alert("You have to upload two image files!");
        return;
    }
    var imgT1 = new Image();
    imgT1.onload = drawDeT1;
    imgT1.onerror = failed;
    imgT1.src = URL.createObjectURL(this.files[0]);
    imgT1.crossOrigin = 'anonymous';
    var imgT2 = new Image();
    imgT2.onload = drawDeT2;
    imgT2.onerror = failed;
    imgT2.src = URL.createObjectURL(this.files[1]);
    imgT2.crossOrigin = 'anonymous';
};
function drawDeT1() {
    var canvas = document.getElementById('canvasTrans1up');
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);
}
function drawDeT2() {
    var canvas = document.getElementById('canvasTrans2up');
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);
}
function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
}
// HANDLE BUTTON EVENTS
const buEncrypt = document.getElementById('encryptButton');
const buDecrypt = document.getElementById('decryptButton');
buEncrypt.addEventListener("click", function (e) {
    const canvas = document.getElementById('canvasNormal');
    var ctx = canvas.getContext('2d');
    const inputHeight = canvas.height;
    const inputWidth = canvas.width;
    if(canvas.height < 15 || canvas.width < 15){
        alert("You have to upload an image file!");
        return;
    }
    const canvasT1 = document.getElementById('canvasTrans1');
    var ctxT1 = canvasT1.getContext('2d');
    canvasT1.width = inputWidth * 4;
    canvasT1.height = inputHeight * 4;
    const canvasT2 = document.getElementById('canvasTrans2');
    var ctxT2 = canvasT2.getContext('2d');
    canvasT2.width = inputWidth * 4;
    canvasT2.height = inputHeight * 4;
    // CIPHER IMAGE
    // GET INPUT IMAGE
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scannedData = scannedImage.data;
    var transScannedData = VSSS_cipher_image(scannedData, inputHeight, inputWidth); // Cipher Function
    //DRAW THE RESULTS
    const cipher_image1 = ctxT1.getImageData(0, 0, canvasT2.width, canvasT1.height); //x,y,w,h
    cipher_image1.data.set(new Uint8ClampedArray(transScannedData[0])); // assuming values 0..255, RGBA, pre-mult.
    ctxT1.putImageData(cipher_image1, 0, 0);
    const cipher_image2 = ctxT2.getImageData(0, 0, canvasT2.width, canvasT2.height); //x,y,w,h
    cipher_image2.data.set(new Uint8ClampedArray(transScannedData[1])); // assuming values 0..255, RGBA, pre-mult.
    ctxT2.putImageData(cipher_image2, 0, 0);
});
buDecrypt.addEventListener("click", function (e) {
    const canvasT1up = document.getElementById('canvasTrans1up');
    var ctxT1up = canvasT1up.getContext('2d');
    const scannedImage = ctxT1up.getImageData(0, 0, canvasT1up.width, canvasT1up.height);
    const scannedData = scannedImage.data;
    const canvasT2up = document.getElementById('canvasTrans2up');
    var ctxT2up = canvasT2up.getContext('2d');
    const scannedImage2 = ctxT2up.getImageData(0, 0, canvasT2up.width, canvasT2up.height);
    const scannedData2 = scannedImage2.data;
    if(canvasT1up.height < 15 || canvasT1up.width < 15 || canvasT2up.height < 15 || canvasT2up.width < 15){
        alert("You have to upload two image files!");
        return;
    }
    if (canvasT1up.width != canvasT2up.width || canvasT1up.height != canvasT2up.height) { //Add cond. if is empty
        alert("Width or height don't match!");
        return;
    }
    const canvasSol = document.getElementById('canvasDecrypt');
    var ctxSol = canvasSol.getContext('2d');
    canvasSol.width = canvasT2up.width;
    canvasSol.height = canvasT1up.height;
    //DECRYPT IMAGE
    const scannedDataDecipher = VSSS_decipher_image(scannedData, scannedData2, canvasSol.height, canvasSol.width);
    var decipherImage = ctxSol.getImageData(0, 0, canvasSol.width, canvasSol.height); //x,y,w,h
    decipherImage.data.set(new Uint8ClampedArray(scannedDataDecipher)); // assuming values 0..255, RGBA, pre-mult.
    ctxSol.putImageData(decipherImage, 0, 0, 0, 0, canvasSol.width, canvasSol.height);
});