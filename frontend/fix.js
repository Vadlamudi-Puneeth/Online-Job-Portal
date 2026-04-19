const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');

const files = fs.readdirSync(srcDir);
files.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.js')) {
        const filePath = path.join(srcDir, file);
        if(!fs.statSync(filePath).isFile()) return;
        let content = fs.readFileSync(filePath, 'utf8');
        const newContent = content.replace(/import\s+['"][^'"]+\.css['"][\s;]*/g, '');
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log('Fixed', file);
        }
    }
});
