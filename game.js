/**
 * game.js --- Solenn Cattin --- JV1B
 * 
 * Fichier comportant la configuration du jeu, et lançant la première scène : l'écran d'accueil
*/


// Import de toutes les scènes utilisées dans le jeu
import Menu from '/niveaux/Menu.js';
import MaisonJoueur from '/niveaux/MaisonJoueur.js';
import Ville from '/niveaux/Ville.js';



// Configuration initiale
var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },

    // Ajout des differentes scenes dans le jeu
    scene: [Menu, MaisonJoueur, Ville],

    // Activation de la possibilité de jouer à la manette
    input: {gamepad: true}

};


// Début du jeu, lancé sur la scène Menu
var game = new Phaser.Game(config);
game.scene.start("Menu"); 