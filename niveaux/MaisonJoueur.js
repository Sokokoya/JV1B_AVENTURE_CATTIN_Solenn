/**
 * MaisonJoueur.js --- Solenn Cattin --- JV1B
 * 
 * Fichier contenant la classe MaisonJoueur, créant la scène du même nom.
*/

import Player from '../Player.js';

export default class MaisonJoueur extends Phaser.Scene {

    constructor() {
        super("MaisonJoueur");
    }

    // Initialisation de la scene après avoir changé de scène
    init(data) {
        this.posX = data.x;
        this.posY = data.y;
    
    }


    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        // Tileset et map de la scène
        this.load.image('tileset_interieur', 'assets/tileset_interieur.png');
        this.load.tilemapTiledJSON('map_maison_joueur', 'assets/maps/map_maison_joueur.json');

        // Sprites du héros
        this.load.spritesheet('heros_idle_droite', 'assets/spr_idle_perso_droite.png', {frameWidth: 64, frameHeight: 96});
    }

    


    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------
    
    create() {

        // ----- AFFICHAGE DU JEU -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_maison_joueur');

        const gameTileset = gameMap.addTilesetImage(
            'tileset_interieur',
            'tileset_interieur'
        );

        const murLayer = gameMap.createLayer(
            "murs",
            gameTileset
        );

        const solLayer = gameMap.createLayer(
            "sol",
            gameTileset
        );

        const collisionsLayer = gameMap.createLayer(
            "collisions",
            gameTileset
        );

        const detailsLayer = gameMap.createLayer(
            "details",
            gameTileset
        );

        const sortieLayer = gameMap.createLayer(
            "sortie",
            gameTileset
        );


        // ----- PROPRIETES DU JEU -----

        // Prise en charge des touches du clavier
        this.clavier = this.input.keyboard.createCursorKeys();

        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        murLayer.setCollisionByProperty({estSolide: true});
        collisionsLayer.setCollisionByProperty({estSolide: true});
        sortieLayer.setCollisionByProperty({sortie: true});


        // ----- AFFICHAGE ET PROPRIETES DU PERSONNAGE -----

        // Ajout du personnage dans le jeu
        this.player = new Player(this, this.posX, this.posY, 'heros_idle_droite');

        // Ajout des collisions entre le personnage et les objets / murs / sortie
        this.physics.add.collider(this.player, murLayer);
        this.physics.add.collider(this.player, collisionsLayer);
        this.physics.add.collider(this.player, sortieLayer, function() {
            this.scene.start("Ville", {
                x: 640,
                y: 624
            });
        }, null, this);



        
        // ----- CAMERA -----

        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 1600, 1600);
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);

    }


    update() {

        this.player.updateMouvement();

    }

}