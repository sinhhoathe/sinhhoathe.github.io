import os
import glob

files = glob.glob('*.html') + glob.glob('*/*.html')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Choose replacement based on depth
    if '/' in file:
        content = content.replace('/Logo.webp', '/Logo.webp')
    else:
        content = content.replace('/Logo.webp', './Logo.webp')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Path replaced!")
