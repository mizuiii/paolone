const pixelGrid = document.getElementById('pixelGrid');
const resetButton = document.getElementById('resetButton');
const colorPicker = document.getElementById('colorPicker');
const gridSize = 32;
const eraserButton = document.getElementById('eraserButton');
let currentColor = '#000000';
let isMouseDown = false;
let eraserActive = false;

function createGrid(size) {
    pixelGrid.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mousedown', paintPixel);
        pixel.addEventListener('mouseover', paintPixelOnDrag);
        pixel.addEventListener('touchstart', paintPixel);
        pixel.addEventListener('touchmove', paintPixelOnDrag);
        pixelGrid.appendChild(pixel);
    }
}

function paintPixel(event) {
    isMouseDown = true;
    paint(getEventTarget(event));
}

function paintPixelOnDrag(event) {
    if (isMouseDown) {
        paint(getEventTarget(event));
    }
}

function getEventTarget(event) {

    if (event.touches) {
        const touch = event.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        return element;
    }
    return event.target;
}

function resetGrid() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
}

function paint(target) {
    if (eraserActive) {
        target.style.backgroundColor = 'white';
    } else {
        target.style.backgroundColor = colorPicker.value;
    }
}

function toggleEraser() {
    eraserActive = !eraserActive;
    eraserButton.classList.toggle('active', eraserActive);
}

function saveImage() {
    const fileName = prompt("Inserisci il nome del file:", "pixel-art");
    if (fileName) {
        html2canvas(pixelGrid).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${fileName}.png`;
            link.click();
        });
    } else {
        alert("Nome del file non fornito. Immagine non salvata.");
    }
}

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});
document.addEventListener('mousedown', (event) => {
    event.preventDefault();
});
document.addEventListener('touchend', () => {
    isMouseDown = false;
});
document.addEventListener('touchstart', (event) => {
    paintPixel(event);
});
document.addEventListener('touchmove', (event) => {
    paintPixelOnDrag(event);
});

createGrid(gridSize);
