
// Import de toutes les scènes utilisées dans le jeu
import Menu from '/niveaux/Menu.js';
import Ville from "/niveaux/Ville.js";
import Parc from "/niveaux/Parc.js";
import MaisonJoueur from "/niveaux/MaisonJoueur.js";
import MaisonGM from "/niveaux/MaisonGM.js";
import ChambreFille from "/niveaux/ChambreFille.js";


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
    scene: [Menu, Ville, Parc, MaisonJoueur, MaisonGM, ChambreFille]



};


// Début du jeu, lancé sur la scène Menu
var game = new Phaser.Game(config);
game.scene.start("Menu"); 