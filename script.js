document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentColor = '#000';
    let eraserMode = false;

    const colorPicker = document.getElementById('colorPicker');
    const eraserButton = document.getElementById('eraser');
    const clearCanvasButton = document.getElementById('clearCanvas');

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    colorPicker.addEventListener('input', function () {
        currentColor = colorPicker.value;
        eraserMode = false;
    });

    eraserButton.addEventListener('click', function () {
        eraserMode = true;
        currentColor = '#fff';
        colorPicker.value = '#ffffff';
    });

    clearCanvasButton.addEventListener('click', clearCanvas);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;

        if (eraserMode) {
            ctx.globalCompositeOperation = 'destination-out';
        } else {
            ctx.globalCompositeOperation = 'source-over';
        }

        ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

