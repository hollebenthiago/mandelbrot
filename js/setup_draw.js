function setup() {
    var canvas = createCanvas(360, 360);
    canvas.parent('canvasHere')
    pixelDensity(1);
}

function draw() {

loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {

            var a = map(x, 0, width, x_center - zoom, x_center + zoom);
            var b = map(y, 0, width, y_center - zoom, y_center + zoom);

            var ca = a;
            var cb = b;

            var n = 0;

            if (degree != 2) {
                while (n < iter) {
                    var aa = m(degree, a, b)[0]
                    var bb = m(degree, a, b)[1]
                    a = aa + ca;
                    b = bb + cb;
                    if (a * a + b * b > 8) {
                        break;
                    }
                    n++;
                }
            }

            else {
                while (n < iter) {
                    var aa = a * a - b * b;
                    var bb = 2 * a * b;
                    a = aa + ca;
                    b = bb + cb;
                    if (a * a + b * b > 8) {
                        break;
                    }
                    n++;
                }
            }
            var bright = map(n, 0, iter, 0, 1);
            bright = map(sqrt(bright), 0, 1, 0, 255);

            if (n == iter) {
                bright = 0;
            }

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = bright*2%255;
            pixels[pix + 1] = bright/2%255;
            pixels[pix + 2] = bright*bright % 255;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
}