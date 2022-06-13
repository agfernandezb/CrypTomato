function array_zeros_new_image(height_image,width_image){
    index_cant = height_image*width_image*4*16;
    console.log("h & w cipher",height_image,width_image, index_cant);
    array_zeros_total = Array(index_cant).fill(0);
    console.log("height_image", height_image, "width_image", width_image, array_zeros_total.length);
    return array_zeros_total;
}

function array_zeros_new_image_d(height_image,width_image){
    
    index_cant = height_image*width_image;
    console.log("h & w decipher",height_image,width_image, index_cant);
    array_zeros_total = Array(index_cant).fill(0);
    return array_zeros_total;
}

function arrayMax(arr) { // Max of array
    return arr.reduce(function (p, v) {
      return ( p > v ? p : v );
    });
}

function prod_lattice(arr1,arr2,arr3){
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i]==arr2[i] && arr1[i] == 255 ) {
            arr3[i] = 255;
        }
        else{
            arr3[i] = 0;
        }
    }
    return arr3
}

function random_array(array){
    // array_n = array;
    array_n = array.sort(function() { return Math.random() - 0.5 });
    return array_n;
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
            B = 255;}
        else{ // Yellow
            R = 255;
            G = 255;
            B = 0;}}
    else{
        if (max>200 && (R+G+B)<400){
            if(index_max == 0){ //Red
                R = 255;
                G = 0;
                B = 0;}
            else if(index_max == 1){ // Green
                R = 0;
                G = 255;
                B = 0;}
            else{ // Blue
                R = 0;
                G = 0;
                B = 255;}}
        else if (R < 65 && G < 65 && B < 65 ) { // Black
            R = 0;
            G = 0;
            B = 0;}
        else if (R > 120 && G < 150 && B < 150 ){ // Red
            R = 255;
            G = 0;
            B = 0;}
        else if (R < 150 && G > 100 && B < 100 ){ // Green
            R = 0;
            G = 255;
            B = 0;}
        else if (R < 140 && G < 140 && B > 100 ){ // Blue
            R = 0;
            G = 0;
            B = 255;}
        else if (R > 160 && G > 160 && B > 160 ){ // White
            R = 255;
            G = 255;
            B = 255;}
        else {
            R = 0
            G = 0
            B = 0}
    }
    colors = [R, G, B]
    return colors;
}

// ---------------- CONFIGURATION COLORS -----------

function transformation_m16(R,G,B,i_g,width_image,scannedData_new1,scannedData_new2){

    black = [0,0,0];
    red = [255,0,0];
    green = [0,255,0];
    blue = [0,0,255];
    yellow = [255,255,0];
    magenta = [255,0,255];
    cyan = [0,255,255];
    white = [255,255,255];

    K_col = [[black,white],[cyan,black],[black,cyan],[white,black],[black,yellow],  [white,black],[black,white],[yellow,black],[black,yellow],[yellow,black], [black,white],[white,black],[magenta,cyan],[yellow,magenta],[magenta,yellow], [cyan,magenta]];

    R_col = [[yellow,magenta],[magenta,yellow],[yellow,magenta],[magenta,yellow],[yellow, white], [white,black],[black,cyan],[cyan,black],[black,cyan],[cyan,black], [black,yellow],[black,white],[black,white],[white,black],[white,black], [black,black]];
    G_col = [[yellow,cyan],[yellow,cyan],[cyan,yellow],[cyan,yellow],[yellow,yellow], [white,black],[white,black],[white,black],[black,white],[black,white], [black,white],[magenta,black],[magenta,black],[black,magenta],[black,magenta], [black,black]];
    B_col = [[magenta,cyan],[magenta,cyan],[cyan,magenta],[cyan,magenta],[white,yellow], [yellow,black],[yellow,black],[black,yellow],[black,yellow],[yellow,black], [black,white],[black,white],[black,white],[white,black],[white,black], [black,black]];

    Y_col = [[yellow,white],[yellow,white],[yellow,white],[white,yellow],[white,yellow], [white,yellow],[black,cyan],[black,cyan],[cyan,black],[cyan,black], [black,magenta],[black,magenta],[magenta,black],[magenta,black],[black,black], [black,black]];
    M_col = [[magenta,white],[magenta,white],[white,magenta],[white,magenta],[white,white], [black,yellow],[black,yellow],[yellow,black],[yellow,black],[yellow,black], [black,cyan],[black,cyan],[cyan,black],[cyan,black],[black,black], [black,yellow]];
    C_col = [[cyan,white],[cyan,white],[white,cyan],[white,cyan],[white,white], [yellow,black],[yellow,black],[yellow,black],[black,yellow],[black,yellow], [black,magenta],[black,magenta],[magenta,black],[magenta,black],[black,yellow], [black,black]];

    W_col = [[white,white],[white,white],[white,white],[magenta,magenta],[magenta,magenta], [yellow,yellow],[yellow,yellow],[yellow,yellow],[cyan,cyan],[cyan,cyan], [black,black],[black,black],[black,black],[black,black],[black,black], [black,black]];

    if (R == 255 && G== 255 && B == 255) {
        color_array = random_array(W_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g,scannedData_new1,width_image,0,color_array);
        scannedData_new2 = agregation_array(i_g,scannedData_new2,width_image,1,color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if(R == 255 && G== 255 && B == 0){
        color_array = random_array(Y_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g,scannedData_new1,width_image,0,color_array);
        scannedData_new2 = agregation_array(i_g,scannedData_new2,width_image,1,color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if(R == 255 && G== 0 && B == 255){
        color_array = random_array(M_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g,scannedData_new1,width_image,0,color_array);
        scannedData_new2 = agregation_array(i_g,scannedData_new2,width_image,1,color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if(R == 0 && G== 255 && B == 255){
        color_array = random_array(C_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g,scannedData_new1,width_image,0,color_array);
        scannedData_new2 = agregation_array(i_g,scannedData_new2,width_image,1,color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if(R == 255 && G== 0 && B == 0){
        color_array = random_array(R_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g,scannedData_new1,width_image,0,color_array);
        scannedData_new2 = agregation_array(i_g,scannedData_new2,width_image,1,color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if(R == 0 && G== 255 && B == 0){
        color_array = random_array(G_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g,scannedData_new1,width_image,0,color_array);
        scannedData_new2 = agregation_array(i_g,scannedData_new2,width_image,1,color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if(R == 0 && G== 0 && B == 255){
        color_array = random_array(B_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g,scannedData_new1,width_image,0,color_array);
        scannedData_new2 = agregation_array(i_g,scannedData_new2,width_image,1,color_array);
        return [scannedData_new1, scannedData_new2];
    }
    else if(R == 0 && G== 0 && B == 0){
        color_array = random_array(K_col); // Color_new = K or R or G or B ...
        scannedData_new1 = agregation_array(i_g,scannedData_new1,width_image,0,color_array);
        scannedData_new2 = agregation_array(i_g,scannedData_new2,width_image,1,color_array);
        return [scannedData_new1, scannedData_new2];
    }
    
}

// [[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]]]

function agregation_array(i_g,scannedData_new,width_image,img_0_or_1,color_array){
    i = i_g;
    k = 16*width_image;
    k2 = 32*width_image;
    k3 = 48*width_image;

    scannedData_new[i] = color_array[0][img_0_or_1][0];
    scannedData_new[i+1] = color_array[0][img_0_or_1][1];
    scannedData_new[i+2] = color_array[0][img_0_or_1][2];
    scannedData_new[i+3] = 255;
    //3 -> 255
    scannedData_new[i+4] = color_array[1][img_0_or_1][0];
    scannedData_new[i+5] = color_array[1][img_0_or_1][1];
    scannedData_new[i+6] = color_array[1][img_0_or_1][2];
    scannedData_new[i+7] = 255;
    //7 -> 255
    scannedData_new[i+8] = color_array[2][img_0_or_1][0];
    scannedData_new[i+9] = color_array[2][img_0_or_1][1];
    scannedData_new[i+10] = color_array[2][img_0_or_1][2];
    scannedData_new[i+11] = 255;
    //11 -> 255
    scannedData_new[i+12] = color_array[3][img_0_or_1][0];
    scannedData_new[i+13] = color_array[3][img_0_or_1][1];
    scannedData_new[i+14] = color_array[3][img_0_or_1][2];
    scannedData_new[i+15] = 255;
    //15 -> 255

    scannedData_new[i+k] = color_array[4][img_0_or_1][0];
    scannedData_new[i+1+k] = color_array[4][img_0_or_1][1];
    scannedData_new[i+2+k] = color_array[4][img_0_or_1][2];
    scannedData_new[i+3+k] = 255;

    scannedData_new[i+4+k] = color_array[5][img_0_or_1][0];
    scannedData_new[i+5+k] = color_array[5][img_0_or_1][1];
    scannedData_new[i+6+k] = color_array[5][img_0_or_1][2];
    scannedData_new[i+7+k] = 255;

    scannedData_new[i+8+k] = color_array[6][img_0_or_1][0];
    scannedData_new[i+9+k] = color_array[6][img_0_or_1][1];
    scannedData_new[i+10+k] = color_array[6][img_0_or_1][2];
    scannedData_new[i+11+k] = 255;

    scannedData_new[i+12+k] = color_array[7][img_0_or_1][0];
    scannedData_new[i+13+k] = color_array[7][img_0_or_1][1];
    scannedData_new[i+14+k] = color_array[7][img_0_or_1][2];
    scannedData_new[i+15+k] = 255;


    scannedData_new[i+k2] = color_array[8][img_0_or_1][0];
    scannedData_new[i+1+k2] = color_array[8][img_0_or_1][1];
    scannedData_new[i+2+k2] = color_array[8][img_0_or_1][2];
    scannedData_new[i+3+k2] = 255;

    scannedData_new[i+4+k2] = color_array[9][img_0_or_1][0];
    scannedData_new[i+5+k2] = color_array[9][img_0_or_1][1];
    scannedData_new[i+6+k2] = color_array[9][img_0_or_1][2];
    scannedData_new[i+7+k2] = 255;

    scannedData_new[i+8+k2] = color_array[10][img_0_or_1][0];
    scannedData_new[i+9+k2] = color_array[10][img_0_or_1][1];
    scannedData_new[i+10+k2] = color_array[10][img_0_or_1][2];
    scannedData_new[i+11+k2] = 255;

    scannedData_new[i+12+k2] = color_array[11][img_0_or_1][0];
    scannedData_new[i+13+k2] = color_array[11][img_0_or_1][1];
    scannedData_new[i+14+k2] = color_array[11][img_0_or_1][2];
    scannedData_new[i+15+k2] = 255;


    scannedData_new[i+k3] = color_array[12][img_0_or_1][0];
    scannedData_new[i+1+k3] = color_array[12][img_0_or_1][1];
    scannedData_new[i+2+k3] = color_array[12][img_0_or_1][2];
    scannedData_new[i+3+k3] = 255;

    scannedData_new[i+4+k3] = color_array[13][img_0_or_1][0];
    scannedData_new[i+5+k3] = color_array[13][img_0_or_1][1];
    scannedData_new[i+6+k3] = color_array[13][img_0_or_1][2];
    scannedData_new[i+7+k3] = 255;

    scannedData_new[i+8+k3] = color_array[14][img_0_or_1][0];
    scannedData_new[i+9+k3] = color_array[14][img_0_or_1][1];
    scannedData_new[i+10+k3] = color_array[14][img_0_or_1][2];
    scannedData_new[i+11+k3] = 255;

    scannedData_new[i+12+k3] = color_array[15][img_0_or_1][0];
    scannedData_new[i+13+k3] = color_array[15][img_0_or_1][1];
    scannedData_new[i+14+k3] = color_array[15][img_0_or_1][2];
    scannedData_new[i+15+k3] = 255;

    return scannedData_new
}

//----------------------------------------------------------------------------------------------------------------
//                                         CIPHER FUNCTION
//----------------------------------------------------------------------------------------------------------------

function VSSS_cipher_image(scannedData,height_image,width_image){ // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]

    var scannedData_new1 = array_zeros_new_image(height_image,width_image); //
    var scannedData_new2 = array_zeros_new_image(height_image,width_image);
    console.log("scannedData_new1",scannedData_new1.length,"scannedData_new1",scannedData_new2.length);

    // Imagen normalizada
    var count = 0;
    var count_z = 0;
    var flag = false;
    var i_g = 0;

    for (let i = 0; i <= scannedData.length-1 ; i+=4) { //scannedData.length
        R = scannedData[i];
        G = scannedData[i+1];
        B = scannedData[i+2];
        scannedData[i+3] = 255; // Caso imagen tiene transparencia 
        colors = aproximations_colors(R,G,B);
        scannedData[i] = colors[0];
        scannedData[i+1] = colors[1];
        scannedData[i+2] = colors[2];
        if (Number.isInteger(count/width_image)) {
            i_g = i*16;
        }
        else{
            i_g = i_g + 16;
        }
        full_2_array = transformation_m16(colors[0],colors[1],colors[2],i_g,width_image,scannedData_new1,scannedData_new2);
        scannedData_new1 = full_2_array[0];
        scannedData_new2 = full_2_array[1];
        count = count + 1;
        count_z = Math.trunc(count/width_image);
    }
    console.log("22222","scannedData_new1",scannedData_new1.length,"scannedData_new1",scannedData_new2.length);
    return [scannedData_new1,scannedData_new2];
};

//----------------------------------------------------------------------------------------------------------------
//                                         DECIPHER FUNCTION
//----------------------------------------------------------------------------------------------------------------

function VSSS_decipher_image(scannedData1,scannedData2,height_image,width_image){ // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]
    
    scannedData_new1 = array_zeros_new_image_d(height_image,width_image); //
    console.log("wtf", scannedData1.length,scannedData2.length,scannedData_new1.length)
    scannedData_new1 = prod_lattice(scannedData1,scannedData2,scannedData_new1)

    return scannedData_new1;
};


//----------------------------------------------------------------------------------------------------------------
//                                              SHOW IMAGE 
//----------------------------------------------------------------------------------------------------------------


image_m1 = 'catc0.png'
image_m2 = 'catc1.png'

cipher_decipher = false

if (cipher_decipher == true){
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    const image_cipher = new Image();           
    image_cipher.src = image_m1;              // Path de la imagen, o URL   ____INPUT____
    image_cipher.crossOrigin = 'anonymous';
    var width_image = (image_cipher.width);    // Tamaño de la imagen Ancho
    var height_image = (image_cipher.height);  // Tamaño de la imagen Alto
    canvas.width = width_image;
    canvas.height = height_image;

    var canvas2 = document.getElementById('canvas2');
    var ctx2 = canvas2.getContext('2d');
    const image_cipher2 = new Image();           
    image_cipher2.src = image_m2;              // Path de la imagen, o URL   ____INPUT____
    image_cipher2.crossOrigin = 'anonymous';
    const width_image_2 = (image_cipher2.width);    // Tamaño de la imagen Ancho
    const height_image_2 = (image_cipher2.height);  // Tamaño de la imagen Alto
    canvas2.width = width_image_2;
    canvas2.height = height_image_2;


    var canvas3 = document.getElementById('canvas3');
    var ctx3 = canvas3.getContext('2d');
    const image_cipher3 = new Image();           
    image_cipher3.src = image_m1;              // Path de la imagen, o URL   ____INPUT____
    image_cipher3.crossOrigin = 'anonymous';
    const width_image_3 = (image_cipher.width*4);    // Tamaño de la imagen Ancho
    const height_image_3 = (image_cipher.height*4);  // Tamaño de la imagen Alto
    canvas3.width = width_image_3;
    canvas3.height = height_image_3;

    var canvas4 = document.getElementById('canvas4');
    var ctx4 = canvas4.getContext('2d');
    const image_cipher4 = new Image();           
    image_cipher4.src = image_m2;              // Path de la imagen, o URL   ____INPUT____
    image_cipher4.crossOrigin = 'anonymous';
    const width_image_4 = (image_cipher.width*4);    // Tamaño de la imagen Ancho
    const height_image_4 = (image_cipher.height*4);  // Tamaño de la imagen Alto
    canvas4.width = width_image_4;
    canvas4.height = height_image_4;


    image_cipher.addEventListener('load', function(){ // Imprime la imagen

        ctx.drawImage(image_cipher,0,0, canvas.width, canvas.height); // Draw original image
        const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
        const scannedData = scannedImage.data; // Array de datos img
        console.log(" Alto =", height_image, ", Ancho =", width_image, ", Pixeles =", height_image*width_image ) // Original image  
        console.log(scannedData);
        //------------------------------------------------------------------------------------------------
        // --                                          CIFRA IMAGEN                                       ---
        //------------------------------------------------------------------------------------------------
        scannedData_array = VSSS_cipher_image(scannedData,height_image,width_image); // FUNCIÓN QUE CIFRA IMAGEN
        //-------------------------------------------------------------------------------------------------------        
        
        const cipher_image_3 = ctx3.getImageData(0,0,width_image_3,height_image_3); //x,y,w,h
        cipher_image_3.data.set(new Uint8ClampedArray(scannedData_array[0])); // assuming values 0..255, RGBA, pre-mult.
        // console.log(scannedData_array[0].length, "scannedData_array[1].length" );
        ctx3.putImageData(cipher_image_3,0,0);
    
        const cipher_image_4 = ctx4.getImageData(0,0,width_image_4,height_image_4); //x,y,w,h
        cipher_image_4.data.set(new Uint8ClampedArray(scannedData_array[1])); // assuming values 0..255, RGBA, pre-mult.
        // console.log(scannedData_array[1].length, "scannedData_array[1].length" );
        ctx4.putImageData(cipher_image_4,0,0);
        // ------------------------------------------------------------------------------------------------------
        // --                                           DECIFRA IMAGEN                                       ---
        // ------------------------------------------------------------------------------------------------------
        // scannedData_array_d = VSSS_decipher_image(scannedData_array[0],scannedData_array[1],height_image*4,width_image*4); // FUNCIÓN QUE CIFRA IMAGEN
        // var decipher_image = ctx3.getImageData(0,0,width_image*4,height_image*4); //x,y,w,h
        // decipher_image.data.set(new Uint8ClampedArray(scannedData_array_d)); // assuming values 0..255, RGBA, pre-mult.
        // ctx3.putImageData(decipher_image,0,0);
    })
}
else{
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');

    const image_cipher = new Image();           
    image_cipher.src = image_m1;              // Path de la imagen, o URL   ____INPUT____
    image_cipher.crossOrigin = 'anonymous';
    var width_image = (image_cipher.width);    // Tamaño de la imagen Ancho
    var height_image = (image_cipher.height);  // Tamaño de la imagen Alto
    canvas.width = width_image;
    canvas.height = height_image;

    var canvas2 = document.getElementById('canvas2');
    var ctx2 = canvas2.getContext('2d');
    const image_cipher2 = new Image();           
    image_cipher2.src = image_m2;              // Path de la imagen, o URL   ____INPUT____
    image_cipher2.crossOrigin = 'anonymous';
    const width_image_2 = (image_cipher2.width);    // Tamaño de la imagen Ancho
    const height_image_2 = (image_cipher2.height);  // Tamaño de la imagen Alto
    canvas2.width = width_image_2;
    canvas2.height = height_image_2;

    image_cipher.addEventListener('load', function(){ // Imprime la imagen
        ctx.drawImage(image_cipher,0,0, canvas1.width, canvas.height); // Draw original image
        const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
        const scannedData = scannedImage.data; // Array de datos img

        ctx2.drawImage(image_cipher2,0,0, canvas2.width, canvas2.height); // Draw original image
        const scannedImage2 = ctx2.getImageData(0,0, canvas2.width, canvas2.height);
        const scannedData2 = scannedImage2.data; // Array de datos img
        console.log(" Alto =", height_image, ", Ancho =", width_image, ", Pixeles =", height_image*width_image ) // Original image 
        //------------------------------------------------------------------------------------------------------
        // --                                           DECIFRA IMAGEN                                       ---
        //------------------------------------------------------------------------------------------------------
        scannedData_array_d = VSSS_decipher_image(scannedData,scannedData2,height_image,width_image); // FUNCIÓN QUE CIFRA IMAGEN
        var decipher_image = ctx.getImageData(0,0,width_image,height_image); //x,y,w,h
        decipher_image.data.set(new Uint8ClampedArray(scannedData_array_d)); // assuming values 0..255, RGBA, pre-mult.
        ctx.putImageData(decipher_image,0,0,0,0,width_image,height_image);
    })
}








