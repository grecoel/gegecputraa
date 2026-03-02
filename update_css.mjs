import fs from 'fs';
let content = fs.readFileSync('src/index.css', 'utf8');

const target = `  /* Tri-color Accent Palette — Orange · Navy · Dark Violet */
  --accent-orange: #FF6B00;
  --accent-navy: #1B3A6B;
  --accent-violet: #5B21B6;
  --accent-gradient: linear-gradient(135deg, #FF6B00, #1B3A6B, #5B21B6);
  --accent-gradient-subtle: linear-gradient(135deg, rgba(255, 107, 0, 0.10), rgba(27, 58, 107, 0.08), rgba(91, 33, 182, 0.07));
}`;

const replacement = `  /* Tri-color Accent Palette — Orange · Navy · Dark Violet */
  --accent-orange: #FF6B00;
  --accent-coral: #F97316;
  --accent-navy: #1B3A6B;
  --accent-violet: #5B21B6;
  --accent-gradient: linear-gradient(135deg, var(--accent-orange), var(--accent-navy), var(--accent-violet));
  --accent-gradient-subtle: linear-gradient(135deg, rgba(255, 107, 0, 0.10), rgba(27, 58, 107, 0.08), rgba(91, 33, 182, 0.07));
}

.dark {
  /* Brighter variants for dark mode visibility */
  --accent-navy: #4A7AFA;
  --accent-violet: #A78BFA;
}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/index.css', content, 'utf8');
    console.log('index.css updated');
} else {
    console.log('Target not found in index.css');
}
