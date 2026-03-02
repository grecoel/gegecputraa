import fs from 'fs';

const p = 'c:\\Users\\ACER\\.gemini\\antigravity\\scratch\\gegecputra\\src\\App.jsx';
let content = fs.readFileSync(p, 'utf8');

content = content.replace(/'#FF6B00'/g, "'var(--accent-orange)'");
content = content.replace(/"#FF6B00"/g, '"var(--accent-orange)"');
content = content.replace(/'#1B3A6B'/g, "'var(--accent-navy)'");
content = content.replace(/"#1B3A6B"/g, '"var(--accent-navy)"');
content = content.replace(/'#5B21B6'/g, "'var(--accent-violet)'");
content = content.replace(/"#5B21B6"/g, '"var(--accent-violet)"');
content = content.replace(/'#F97316'/g, "'var(--accent-coral)'");
content = content.replace(/"#F97316"/g, '"var(--accent-coral)"');

fs.writeFileSync(p, content, 'utf8');
console.log('done');
