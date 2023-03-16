

// Configuration initiale
var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    // Ajout des differentes scenes dans le jeu
    scene: [ville_scene, parc_scene, maison_grandmere_scene, maison_joueur_scene, chambre_fille_scene]
};


var game = new Phaser.Game(config);