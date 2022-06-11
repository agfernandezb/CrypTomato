var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

const image1 = new Image();           
image1.src = 'cat.PNG';              // Path de la imagen, o URL   ____INPUT____
image1.crossOrigin = 'anonymous';


const width_image = (image1.width)    // Tamaño de la imagen Ancho
const height_image = (image1.height)  // Tamaño de la imagen Alto
canvas.width = width_image;
canvas.height = height_image;


console.log(" Alto =", height_image, ", Ancho =", width_image, ", Pixeles =", height_image*width_image )

function array_zeros_new_image(height_image,width_image){
    index_cant = height_image*width_image*4*16
    array_zeros_total = Array(index_cant).fill(0)
    return array_zeros_total
}

function arrayMax(arr) { // Max of array
    return arr.reduce(function (p, v) {
      return ( p > v ? p : v );
    });
  }

function prod_lattice(arr1,arr2){
    arr3 = [0,0,0,0];
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i]==arr2[i] && arr1 == 255 ) {
            arr3[i] = 255
        }
        else{
            arr3[i] = 0
        }
    }
    return arr3
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
function SDES_cipher_image(scannedData,height_image,width_image){ // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]
    //scannedData_2 = array_zeros_new_image(height_image,width_image);
    i_size_array = width_image*4;
    j_size_array = height_image*4;
    // Imagen normalizada
    for (let i = 0; i <= scannedData.length; i+=4) {
        R = scannedData[i];
        G = scannedData[i+1];
        B = scannedData[i+2];
        scannedData[i+3] = 255; // Caso imagen tiene transparencia 
        colors = aproximations_colors(R,G,B);
        scannedData[i] = colors[0];
        scannedData[i+1] = colors[1];
        scannedData[i+2] = colors[2];
    }
    // console.log(scannedData)
    return scannedData
    
};


// ---------------- CONFIGURATION COLORS -----------
// [[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]]]

black = [255,255,255,255];
red = [255,0,0,255];
green = [0,255,0,255];
blue = [0,0,255,255];
yellow = [255,255,0,255];
magenta = [255,0,255,255];
cyan = [0,255,255,255];
white = [255,255,255,255];

K = [[black,cyan],[cyan,black],[black,cyan],[cyan,black],[black,yellow],  [yellow,black],[black,yellow],[yellow,black],[black,yellow],[yellow,black], [black,white],[white,black],[magenta,white],[white,magenta],[magenta,white], [white,magenta]];

R = [[yellow,magenta],[magenta,yellow],[yellow,magenta],[magenta,yellow],[yellow, white], [white,black],[black,cyan],[cyan,black],[black,cyan],[cyan,black], [black,white],[black,white],[black,white],[white,black],[white,black], [black,black]];
G = [[yellow,cyan],[yellow,cyan],[cyan,yellow],[cyan,yellow],[yellow,white], [white,black],[white,black],[white,black],[black,white],[black,white], [black,white],[magenta,black],[magenta,black],[black,magenta],[black,magenta], [black,black]];
B = [[magenta,cyan],[magenta,cyan],[cyan,magenta],[cyan,magenta],[white,cyan], [yellow,black],[yellow,black],[black,yellow],[black,yellow],[yellow,black], [black,white],[black,white],[black,white],[white,black],[white,black], [black,black]];

Y = [[yellow,white],[yellow,white],[yellow,white],[white,yellow],[white,yellow], [white,yellow],[black,cyan],[black,cyan],[cyan,black],[cyan,black], [black,magenta],[black,magenta],[magenta,black],[magenta,black],[black,black], [black,black]];
M = [[magenta,white],[magenta,white],[white,magenta],[white,magenta],[white,white], [black,yellow],[black,yellow],[yellow,black],[yellow,black],[yellow,black], [black,cyan],[black,cyan],[cyan,black],[cyan,black],[black,black], [black,yellow]];
C = [[cyan,white],[cyan,white],[white,cyan],[white,cyan],[white,white], [yellow,black],[yellow,black],[yellow,black],[black,yellow],[black,yellow], [black,magenta],[black,magenta],[magenta,black],[magenta,black],[black,yellow], [black,black]];

W = [[white,white],[white,white],[white,white],[magenta,magenta],[magenta,magenta], [yellow,yellow],[yellow,yellow],[yellow,yellow],[cyan,cyan],[cyan,cyan], [black,black],[black,black],[black,black],[black,black],[black,black], [black,black]];


// --------------------- INPUT PARA IMAGEN -----------------------

image1.addEventListener('load', function(){ // Imprime la imagen
    ctx.drawImage(image1,0,0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
    const scannedData = scannedImage.data; // Array de datos img
    console.log(scannedData);
   
    // CIFRA O DECIFRA IMAGEN

    scannedData1 = SDES_cipher_image(scannedData,height_image,width_image); // FUNCIÓN QUE CIFRA IMAGEN
    cipher_img = new ImageData(scannedData1,width_image,height_image);

    console.log(scannedData1);
    ctx.putImageData(cipher_img,0,0);
})


