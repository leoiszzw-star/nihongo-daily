const { createCanvas } = require('canvas');
const fs = require('fs');

function createIcon(size, filename) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#1a1a2e');
    grad.addColorStop(1, '#0f0f1a');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.2);
    ctx.fill();
    
    // Text
    ctx.fillStyle = '#6c63ff';
    ctx.font = `bold ${size * 0.45}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('日', size / 2, size / 2);
    
    fs.writeFileSync(filename, canvas.toBuffer('image/png'));
    console.log(`Created ${filename}`);
}

createIcon(192, 'icon-192.png');
createIcon(512, 'icon-512.png');
