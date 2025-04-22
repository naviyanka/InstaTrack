const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const avatars = [
  '01.png', '02.png', '03.png', '04.png', '05.png',
  '06.png', '07.png', '08.png', '09.png',
  'bot1.png', 'sus1.png', 'spam1.png'
];

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B59B6', '#3498DB', '#2ECC71',
  '#E74C3C', '#F1C40F', '#95A5A6'
];

const generateAvatar = (filename, color) => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // Draw background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 200, 200);

  // Draw initials
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(filename.charAt(0).toUpperCase(), 100, 100);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, '../public/avatars', filename), buffer);
};

// Create avatars directory if it doesn't exist
const avatarsDir = path.join(__dirname, '../public/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Generate avatars
avatars.forEach((filename, index) => {
  generateAvatar(filename, colors[index]);
}); 