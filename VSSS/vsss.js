var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
const image1 = new Image();           
image1.src = 'cat.PNG';              // Path de la imagen, o URL   ____INPUT____
image1.crossOrigin = 'anonymous';
const width_image = (image1.width)    // Tamaño de la imagen Ancho
const height_image = (image1.height)  // Tamaño de la imagen Alto
canvas.width = width_image ;
canvas.height = height_image;

console.log(" Alto =", height_image, ", Ancho =", width_image, ", Pixeles =", height_image*width_image )


function arrayMax(arr) { // Max of array
    return arr.reduce(function (p, v) {
      return ( p > v ? p : v );
    });
  }

function aproximations_colors(R,G,B){

    // console.log(R,G,B);
    colors_rgb = [R, G, B];
    max = arrayMax(colors_rgb);
    index_max = colors_rgb.indexOf(max);
    
    Black = 1-(max/255);
    Cyan = (1 - (R/255) - Black)/(1-Black);
    Magenta = (1 - (G/255) - Black)/(1-Black);
    Yellow = (1 - (B/255) - Black)/(1-Black);
    
    p_colors =  [Cyan,Magenta,Yellow,Black];
    max_cmyk = arrayMax(p_colors); // Max value color CMY-K
    index_max_cmyk = p_colors.indexOf(max_cmyk); // Index Max value color CMY-K

    // console.log("Black =",Black,"Cyan=",Cyan,"Magenta =",Magenta,"Yellow=",Yellow);
    // console.log(max_cmyk, "max", index_max_cmyk, "indi");
    
    if (max_cmyk > 0.5 && index_max_cmyk != 3 && (Cyan+Magenta+Yellow)<1.19){
        if(index_max_cmyk == 0){ // Cyan
            R = 0;
            G = 255;
            B = 255;
        }
        else if(index_max_cmyk == 1){ // Magenta
            R = 255;
            G = 0;
            B = 255;
        }
        else{ // Yellow
            R = 255;
            G = 255;
            B = 0;
        }
    }
    else{
        if (max>200 && (R+G+B)<400){
            if(index_max == 0){ //Red
                R = 255;
                G = 0;
                B = 0;
            }
            else if(index_max == 1){ // Green
                R = 0;
                G = 255;
                B = 0;
            }
            else{ // Blue
                R = 0;
                G = 0;
                B = 255;
            }
        }
        else if (R < 65 && G < 65 && B < 65 ) { // Black
            R = 0;
            G = 0;
            B = 0;
        }
        else if (R > 120 && G < 150 && B < 150 ){ // Red
            R = 255;
            G = 0;
            B = 0;
        }
        else if (R < 150 && G > 100 && B < 100 ){ // Green
            R = 0;
            G = 255;
            B = 0;
        }
        else if (R < 140 && G < 140 && B > 100 ){ // Blue
            R = 0;
            G = 0;
            B = 255;
        }
        else if (R > 160 && G > 160 && B > 160 ){ // White
            R = 255;
            G = 255;
            B = 255;
        }

        else {
            R = 0
            G = 0
            B = 0
        }
    }
    colors = [R, G, B]
    return colors;
}

function SDES_cipher_image(scannedData){ // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]
    
    // Imagen normalizada
    for (let i = 0; i <= scannedData.length-4; i+=4) {
        R = scannedData[i];
        G = scannedData[i+1];
        B = scannedData[i+2];
        scannedData[i+3] = 255; // Caso imagen tiene transparencia 
        colors = aproximations_colors(R,G,B);
        scannedData[i] = colors[0];
        scannedData[i+1] = colors[1];
        scannedData[i+2] = colors[2];
    }

    console.log(scannedData)
    return scannedData
};


// ---------------------





// --------------------- INPUT PARA IMAGEN -----------------------

image1.addEventListener('load', function(){ // Imprime la imagen
    ctx.drawImage(image1,0,0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
    const scannedData = scannedImage.data; // Array de datos img
    console.log(scannedData);
   
    // CIFRA O DECIFRA IMAGEN

    SDES_cipher_image(scannedData); // FUNCIÓN QUE CIFRA IMAGEN
    
    
    console.log(scannedImage);
    ctx.putImageData(scannedImage,0,0);
})
