const pixelGrid = document.getElementById('pixelGrid');
const resetButton = document.getElementById('resetButton');
const colorPicker = document.getElementById('colorPicker');
const eraserButton = document.getElementById('eraserButton');
let currentColor = '#000000';
let isMouseDown = false;
let eraserActive = false;

let currentGridSize = getGridSize();
function getGridSize() {
    return window.innerWidth <= 968 ? 16 : 32;
}


function createGrid(size) {
    if (size !== currentGridSize) {
        currentGridSize = size;
        pixelGrid.innerHTML = '';
        pixelGrid.style.gridTemplateColumns = `repeat(${size}, 20px)`;
        pixelGrid.style.gridTemplateRows = `repeat(${size}, 20px)`;
        pixelGrid.style.height = `${pixelGrid.clientWidth}px`;


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

function paintPixel(event) {
    if (event.target.classList.contains('pixel')) {
        paint(event.target);
    }
    isMouseDown = true;
}

function paintPixelOnDrag(event) {
    if (isMouseDown && event.target.classList.contains('pixel')) {
        event.preventDefault()
        paint(event.target);
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


window.addEventListener('resize', () => {
    const newSize = getGridSize();
    if (newSize !== currentGridSize) {
        createGrid(newSize);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    createGrid(currentGridSize);
});
