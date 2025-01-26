<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code Generator</title>
    <style>
        #qrcode { width: 200px; height: 200px; }
    </style>
</head>
<body>
    <h1>QR Code Generator</h1>
    <input type="text" id="text-input" placeholder="Enter Text for QR Code">
    <button onclick="generateQRCode()">Generate QR Code</button>
    
    <div id="qrcode"></div>
    
    <script>
        function generateQRCode() {
            const inputText = document.getElementById('text-input').value;
            const qrCodeContainer = document.getElementById('qrcode');
            
            // Check if input is empty
            if (inputText.trim() === '') {
                alert('Please enter some text!');
                return;
            }
            
            // Generate the QR code matrix (simplified version)
            const qrMatrix = encodeToMatrix(inputText);
            
            // Clear any previous QR code
            qrCodeContainer.innerHTML = '';
            
            // Render the QR code (rendering as squares)
            for (let row = 0; row < qrMatrix.length; row++) {
                const rowDiv = document.createElement('div');
                for (let col = 0; col < qrMatrix[row].length; col++) {
                    const cell = document.createElement('span');
                    cell.style.display = 'inline-block';
                    cell.style.width = '20px';
                    cell.style.height = '20px';
                    cell.style.backgroundColor = qrMatrix[row][col] === 1 ? 'black' : 'white';
                    rowDiv.appendChild(cell);
                }
                qrCodeContainer.appendChild(rowDiv);
            }
        }

        function encodeToMatrix(text) {
            const matrixSize = 21; // QR codes are 21x21 by default (for a basic QR code version)
            const matrix = Array(matrixSize).fill().map(() => Array(matrixSize).fill(0));

            // Simplified encoding: Fill the QR code with some pattern based on text (this is just a toy example)
            let binaryText = '';
            for (let i = 0; i < text.length; i++) {
                binaryText += text.charCodeAt(i).toString(2).padStart(8, '0');
            }

            // Fill the QR matrix with data (just a basic pattern here)
            let bitIndex = 0;
            for (let row = 0; row < matrixSize; row++) {
                for (let col = 0; col < matrixSize; col++) {
                    if (bitIndex < binaryText.length) {
                        matrix[row][col] = parseInt(binaryText[bitIndex]);
                        bitIndex++;
                    }
                }
            }
            return matrix;
        }
    </script>
</body>
</html>
