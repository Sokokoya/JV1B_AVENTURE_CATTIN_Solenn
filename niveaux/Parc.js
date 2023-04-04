/**
 * Parc.js --- Solenn Cattin --- JV1B
 * 
 * Fichier contenant la classe Parc, créant la scène du même nom.
*/

import Player from '../Player.js';

export default class Parc extends Phaser.Scene {

    constructor() {
        super({key: "Parc"});
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
        this.load.image('tileset_exterieur', 'assets/tileset_exterieur.png');
        this.load.tilemapTiledJSON('map_parc', 'assets/maps/map_parc.json');

        // Chargement du sprite de la petite fille
        this.load.spritesheet('spr_petite_fille', 'assets/spr_petite_fille.png', {frameWidth: 32, frameHeight: 64});
    }


    

    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_parc');


        const gameTileset = gameMap.addTilesetImage(
            "tileset_exterieur",
            "tileset_exterieur"
        );

        const grassLayer = gameMap.createLayer(
            "herb",
            gameTileset
        );

        const pathLayer = gameMap.createLayer(
            "path",
            gameTileset
        );

        
        const collisionLayer = gameMap.createLayer(
            "collisions",
            gameTileset
        );

        const versVilleLayer = gameMap.createLayer(
            "versVille",
            gameTileset
        );




        
        // ----- PROPRIETES DU JEU -----

        // Prise en charge des touches du clavier
        this.clavier = this.input.keyboard.createCursorKeys();
        
        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        collisionLayer.setCollisionByExclusion(-1, true);
        versVilleLayer.setCollisionByExclusion(-1, true);


        
        // ----- AFFICHAGE ET PROPRIETES DU PERSONNAGE -----

        // Ajout du personnage dans le jeu
        this.player = new Player(this, this.posX, this.posY, 'heros_idle_droite');

        // Ajout des collisions entre le personnage et les objets / murs / sortie
        this.physics.add.collider(this.player, collisionLayer);

        this.physics.add.collider(this.player, versVilleLayer, function() {
            console.log("vers ville");
            this.scene.start("Ville", {
                x: 1536,
                y: 208
            });
        }, null, this);




        this.physics.add.sprite(272, 992, 'spr_petite_fille');


        
        // ----- CAMERA -----

        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 1280, 1280);
        this.cameras.main.setBounds(0, 0, 1280, 1280);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
    }


    update() {

        this.player.updateMouvement();
    }

}