import ville_scene from "ville_scene.js";
import parc_scene from "parc_scene.js";
import maison_grandmere_scene from "maison_grandmere_scene.js";
import maison_joueur_scene from "maison_joueur_scene.js";
import chambre_fille_scene from "chambre_fille_scene.js";

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
    scene: [ville_scene, parc_scene]
};


var game = new Phaser.Game(config);
game.scene.start("ville_scene"); 