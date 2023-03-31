import ville_scene from "/ville_scene.js";
import parc_scene from "/parc_scene.js";
//import maison_grandmere_scene from "maison_grandmere_scene.js";
//import maison_joueur_scene from "maison_joueur_scene.js";
//import chambre_fille_scene from "chambre_fille_scene.js";

// Configuration initiale
var config = {
    type: Phaser.AUTO,
    width: 1600, height: 1600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },

    // Ajout des differentes scenes dans le jeu
    scene: [Ville, Parc]
};


var game = new Phaser.Game(config);
game.scene.start("Menu"); 