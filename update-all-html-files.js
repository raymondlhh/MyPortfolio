// Script to update all HTML files to use dynamic project loading
// This script will help you quickly update the remaining HTML files

const htmlFiles = [
    'AR.html',
    'MR.html', 
    'Game.html',
    '3D.html',
    'Anim.html',
    'Production.html'
];

// Instructions for updating each file:

console.log('=== HTML Files Update Instructions ===');
console.log('The following files need to be updated:');
htmlFiles.forEach(file => console.log(`- ${file}`));

console.log('\n=== Steps to Update Each File ===');
console.log('1. Remove all hardcoded project-card divs from the projects-grid');
console.log('2. Replace with: <!-- Projects will be loaded dynamically from Firestore -->');
console.log('3. Add Firebase scripts before the closing </body> tag:');
console.log(`
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js"></script>
    
    <!-- Firebase Configuration -->
    <script src="firebase-config.js"></script>
    
    <!-- Dynamic Project Loader -->
    <script src="dynamic-projects.js"></script>
    
    <!-- Main Script -->
    <script src="script.js"></script>
`);

console.log('\n=== Collection Names for Each File ===');
console.log('AR.html -> AR collection');
console.log('MR.html -> MR collection');
console.log('Game.html -> Game collection');
console.log('3D.html -> 3D collection');
console.log('Anim.html -> Animation collection');
console.log('Production.html -> Production collection');

console.log('\n=== Current Status ===');
console.log('✅ index.html - Updated with dynamic loading');
console.log('✅ VRAR.html - Updated with dynamic loading');
console.log('✅ VR.html - Updated with dynamic loading');
console.log('⏳ Remaining files need manual update');

console.log('\n=== Quick Update Commands ===');
console.log('You can use search and replace in your editor:');
console.log('1. Find: <div class="project-card">');
console.log('2. Replace with: <!-- Project cards removed for dynamic loading -->');
console.log('3. Add Firebase scripts as shown above');

console.log('\n=== Testing ===');
console.log('After updating, test by:');
console.log('1. Opening each page in browser');
console.log('2. Checking browser console for dynamic loading messages');
console.log('3. Verifying that only projects from Firestore are displayed'); 