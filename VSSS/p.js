// var canvas2 = document.getElementById('canvas1');
// var ctx = canvas2.getContext('2d');

// var drawArray = function(arr, width, height) {
//   // set your canvas width/height
//   canvas2.width = width;
//   canvas2.height = height;
//   // create the imageData object, you'll need the width and height of your image
//   var dataImage = ctx.createImageData(width, height);
//   // browsers supporting TypedArrays
//   if (dataImage.data.set) {
//     dataImage.data.set(arr);
//   } else {
//     // IE9
//     arr.forEach(function(val, i) {
//       dataImage.data[i] = val;
//     });
//   }
//   ctx.putImageData(dataImage, 0, 0);
// };


// --------------------- INPUT PARA IMAGEN -----------------------

// image1.addEventListener('load', function(){ // Imprime la imagen
//     ctx.drawImage(image1,0,0, canvas.width/4, canvas.height);
//     const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
//     const scannedData = scannedImage.data; // Array de datos img
//     console.log(scannedData);

//     //--------------------------
//     // CIFRA IMAGEN
//     //--------------------------

//     scannedData_array = SDES_cipher_image(scannedData,height_image,width_image); // FUNCIÓN QUE CIFRA IMAGEN
   
//     scannedData1 = scannedData_array[0];
//     image_1 = ctx.getImageData(0,0,width_image*16,height_image*16);
//     image_1.data.set(new Uint8ClampedArray(scannedData1));



    //--------------------------
    // DECIFRA IMAGEN
    //--------------------------

    // ctx.drawImage(image2,0,0, canvas.width/36, canvas.height/36);
    // const scannedImage2 = ctx.getImageData(0,0, canvas.width, canvas.height);
    // const scannedData2 = scannedImage2.data; // Array de datos img

    // scannedData_array = SDES_decipher_image(scannedData,scannedData2,height_image,width_image); // FUNCIÓN QUE CIFRA IMAGEN
    
    // scannedData1 = scannedData_array;
    // console.log(scannedData1)
    // image_1 = ctx.getImageData(0,0,width_image*2,height_image);
    // image_1.data.set(new Uint8ClampedArray(scannedData1));

    //--------------------------
    
//     ctx.putImageData(image_1,0,0);
//})



//     //------------------------------------------------------------------------------------------------
//     // --                                       CIFRA IMAGEN                                       ---
//     //------------------------------------------------------------------------------------------------

// console.log(" Alto =", height_image, ", Ancho =", width_image, ", Pixeles =", height_image*width_image ) // Original image


// ctx.drawImage(image_cipher,0,0, canvas.width, canvas.height); // Draw original image 
// const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height); 
// const scannedData = scannedImage.data; // Array of image
// console.log(scannedData);

// //-------------------------------------------------------------------------------------------------------

// scannedData_array = SDES_cipher_image(scannedData,height_image,width_image); // FUNCIÓN QUE CIFRA IMAGEN

// //-------------------------------------------------------------------------------------------------------

// const cipher_image_1 = ctx.getImageData(0,0,width_image*16,height_image*16); //x,y,w,h
// cipher_image_1.data.set(new Uint8ClampedArray(scannedData_array[0])); // assuming values 0..255, RGBA, pre-mult.
// ctx.putImageData(cipher_image_1,0,0,0,0, width_image, height_image);
// console.log(scannedData_array[0].length, "scannedData_array[0].length" );

//-------------------------------------------------------------------------------------------------------

// const cipher_image_2 = ctx.getImageData(0,0,width_image*16,height_image*16); //x,y,w,h
// cipher_image_2.data.set(new Uint8ClampedArray(scannedData_array[1])); // assuming values 0..255, RGBA, pre-mult.
// ctx2.putImageData(cipher_image_2,0,0);
// console.log(scannedData_array[1].length, "scannedData_array[1].length" );


//------------------------------------------------------------------------------------------------------
// --                                           DECIFRA IMAGEN                                       ---
//------------------------------------------------------------------------------------------------------

// var canvas = document.getElementById('wikitechyCanvas');
// var ctx2 = canvas.getContext('2d');
        
// const image_decipher = new Image();           
// image_2_cipher.crossOrigin = 'anonymous';

// const width_image_d = (width_image*4);    // Tamaño de la imagen Ancho
// const height_image_d = (width_image*4);  // Tamaño de la imagen Alto

// canvas.width = width_image_d;
// canvas.height = height_image_d;

// scannedData_array_d = SDES_decipher_image(scannedData_array[0],scannedData_array[1],height_image,width_image); // FUNCIÓN QUE CIFRA IMAGEN

// const decipher_image = ctx.getImageData(0,0,width_image_d,height_image_d); //x,y,w,h
// decipher_image.data.set(new Uint8ClampedArray(scannedData_array_d)); // assuming values 0..255, RGBA, pre-mult.
// ctx.putImageData(decipher_image,0,0);
// console.log(scannedData_array_d.length, "scannedData_array_d.length" );



// var pixelsArray = [0, 0, 0, 0, 170, 170, 170, 3, 0, 0, 0, 0, 0, 0, 0, 1, 170, 170, 170, 3, 0, 0, 0, 0, 170, 170, 170, 3, 127, 127, 127, 2, 0, 0, 0, 0, 127, 127, 127, 2, 170, 170, 170, 3, 0, 0, 0, 0, 170, 170, 170, 3, 0, 0, 0, 1, 0, 0, 0, 1, 170, 170, 170, 3, 170, 170, 170, 3, 0, 0, 0, 0, 154, 5, 119, 94, 255, 0, 192, 213, 244, 0, 182, 223, 225, 0, 171, 164, 93, 13, 80, 19, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 60, 15, 45, 17, 221, 0, 166, 159, 250, 0, 186, 224, 244, 0, 184, 210, 194, 0, 145, 84, 0, 0, 0, 0, 0, 0, 0, 0, 121, 18, 91, 84, 255, 0, 184, 255, 253, 0, 182, 252, 252, 0, 178, 254, 255, 0, 190, 255, 207, 0, 148, 204, 21, 0, 0, 12, 0, 0, 0, 4, 0, 0, 0, 8, 199, 0, 141, 196, 255, 0, 191, 255, 251, 0, 178, 252, 255, 0, 183, 254, 254, 0, 181, 255, 112, 18, 90, 68, 0, 0, 0, 0, 229, 0, 177, 192, 255, 0, 186, 255, 249, 0, 180, 242, 255, 0, 187, 255, 245, 0, 175, 240, 255, 0, 200, 255, 170, 0, 129, 156, 0, 0, 0, 0, 170, 0, 130, 150, 255, 0, 199, 255, 246, 0, 176, 240, 255, 0, 187, 255, 249, 0, 179, 241, 255, 0, 187, 255, 224, 0, 173, 178, 127, 127, 127, 2, 240, 0, 181, 214, 255, 0, 182, 255, 253, 0, 182, 251, 255, 0, 183, 255, 253, 0, 182, 254, 250, 0, 183, 254, 237, 0, 181, 241, 113, 0, 87, 99, 240, 0, 184, 241, 249, 0, 182, 254, 255, 0, 182, 253, 255, 0, 183, 255, 252, 0, 182, 250, 255, 0, 183, 255, 235, 0, 178, 208, 0, 0, 0, 0, 238, 0, 180, 203, 255, 0, 184, 255, 252, 0, 182, 249, 255, 0, 183, 255, 251, 0, 184, 253, 251, 0, 190, 255, 246, 0, 192, 252, 244, 0, 198, 249, 245, 0, 191, 252, 252, 0, 190, 255, 251, 0, 184, 253, 255, 0, 183, 255, 252, 0, 181, 248, 255, 0, 185, 255, 237, 0, 179, 200, 0, 0, 0, 0, 192, 3, 148, 143, 255, 0, 188, 255, 249, 0, 180, 246, 254, 0, 186, 255, 248, 0, 187, 253, 246, 0, 192, 255, 241, 0, 196, 254, 235, 0, 197, 251, 242, 0, 197, 254, 246, 0, 192, 255, 248, 0, 187, 253, 254, 0, 186, 255, 250, 0, 181, 246, 255, 0, 185, 255, 200, 1, 154, 145, 0, 0, 0, 0, 111, 19, 85, 39, 239, 0, 176, 245, 252, 0, 186, 250, 250, 0, 188, 254, 247, 0, 193, 255, 241, 0, 195, 254, 238, 0, 202, 255, 235, 0, 205, 254, 237, 0, 201, 255, 242, 0, 196, 255, 247, 0, 193, 255, 249, 0, 188, 254, 249, 0, 183, 249, 246, 0, 182, 249, 104, 17, 81, 44, 212, 212, 212, 6, 0, 0, 0, 0, 128, 0, 90, 101, 255, 0, 204, 255, 233, 0, 182, 246, 246, 0, 200, 255, 236, 0, 200, 254, 233, 0, 206, 255, 228, 0, 209, 254, 233, 0, 206, 255, 236, 0, 200, 254, 245, 0, 199, 255, 236, 0, 184, 245, 255, 0, 206, 255, 116, 0, 84, 109, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 36, 7, 0, 0, 0, 0, 134, 0, 106, 110, 255, 0, 216, 255, 230, 0, 195, 247, 237, 0, 208, 255, 227, 0, 209, 254, 226, 0, 215, 255, 227, 0, 209, 254, 235, 0, 208, 255, 234, 0, 199, 247, 253, 0, 206, 255, 134, 0, 105, 116, 0, 0, 0, 0, 36, 0, 36, 7, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 133, 0, 112, 111, 242, 0, 213, 255, 224, 0, 206, 247, 227, 0, 218, 255, 218, 0, 217, 253, 227, 0, 219, 255, 220, 0, 204, 247, 247, 0, 218, 255, 111, 0, 93, 114, 0, 0, 0, 0, 28, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 156, 0, 143, 135, 239, 0, 229, 255, 213, 0, 214, 245, 222, 0, 231, 255, 214, 0, 215, 246, 239, 0, 230, 255, 165, 0, 152, 137, 0, 0, 0, 0, 25, 0, 25, 10, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 172, 0, 173, 173, 226, 0, 237, 255, 201, 0, 219, 242, 224, 0, 235, 255, 174, 0, 176, 184, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 30, 0, 30, 17, 203, 0, 220, 216, 214, 0, 239, 255, 215, 0, 234, 233, 61, 0, 69, 33, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 65, 0, 78, 62, 219, 0, 251, 255, 86, 0, 100, 91, 0, 0, 0, 0, 31, 0, 31, 8, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 51, 51, 102, 5, 142, 50, 157, 86, 56, 56, 56, 9, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// drawArray(pixelsArray, 16, 16);
black = [0,0,0];
red = [255,0,0];
green = [0,255,0];
blue = [0,0,255];
yellow = [255,255,0];
magenta = [255,0,255];
cyan = [0,255,255];
white = [255,255,255];

var arr1 =  [[yellow,magenta],[magenta,yellow],[yellow,magenta],[magenta,yellow],[yellow, white], [white,black],[black,cyan],[cyan,black],[black,cyan],[cyan,black], [black,white],[black,white],[black,white],[white,black],[white,black], [black,black]];


function random_array(array){
  array_n = array.sort(function() { return Math.random() - 0.5 });
  return array_n
}

console.log(random_array(arr1))
// count = 0;
// count_z = 0;
// flag = false;
// count_w = 0;
// i_g = 0;
// width_image = 4;
// for (let i = 0; i <= 60; i+=4) {
//   if (Number.isInteger(count/width_image)) {
//     // console.log("int", count/width_image);
//     i_g = i*16;
//     console.log("i",i_g);
//   }
//   else{
//     i_g = i_g + 16;
//     console.log("i",i_g);
//   }
//   count = count + 1;
//   count_z = Math.trunc(count/width_image);

// }



