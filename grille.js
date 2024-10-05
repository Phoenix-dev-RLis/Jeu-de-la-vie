// script.js

const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 20;  // Taille d'une cellule (en pixels)
const gridWidth = 100; // Nombre de colonnes dans la grille "infinie"
const gridHeight = 100; // Nombre de lignes dans la grille "infinie"
let viewportX = 0;  // Décalage horizontal du viewport
let viewportY = 0;  // Décalage vertical du viewport
const viewportWidth = 20; // Largeur du viewport en nombre de cellules
const viewportHeight = 20; // Hauteur du viewport en nombre de cellules

canvas.width = viewportWidth * cellSize;
canvas.height = viewportHeight * cellSize;

// Fonction pour dessiner une cellule (vide ou remplie)
function drawCell(x, y, fillColor = "white") {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize); // Bordures de chaque cellule
}

// Fonction pour dessiner la portion de la grille visible dans le viewport
function drawViewport() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface la zone visible
    for (let y = 0; y < viewportHeight; y++) {
        for (let x = 0; x < viewportWidth; x++) {
            let globalX = viewportX + x; // Coordonnées globales
            let globalY = viewportY + y; // Coordonnées globales
            drawCell(x, y);  // Dessine la cellule dans le viewport
        }
    }
}

// Fonction pour déplacer le viewport
function moveViewport(dx, dy) {
    viewportX = Math.max(0, Math.min(gridWidth - viewportWidth, viewportX + dx));  // Gère les limites de la grille
    viewportY = Math.max(0, Math.min(gridHeight - viewportHeight, viewportY + dy));
    drawViewport();
}

// Ajout des contrôles pour naviguer dans la grille avec les touches fléchées
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case "ArrowUp":
            moveViewport(0, -1);
            break;
        case "ArrowDown":
            moveViewport(0, 1);
            break;
        case "ArrowLeft":
            moveViewport(-1, 0);
            break;
        case "ArrowRight":
            moveViewport(1, 0);
            break;
    }
});

// Initialisation du rendu de la grille visible
drawViewport();