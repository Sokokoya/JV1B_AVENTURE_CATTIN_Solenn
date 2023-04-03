/**
 * Foret.js --- Solenn Cattin --- JV1B
 * 
 * Fichier contenant la classe Foret, créant la scène du même nom.
*/

import Player from '../Player.js';

export default class Foret extends Phaser.Scene {

    constructor() {
        super({key : "Foret"});
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
        this.load.image('tileset_foret', 'assets/tileset_foret.png');
        this.load.tilemapTiledJSON('map_foret', 'assets/maps/map_foret.json');
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------
    
    create() {

       // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_foret');


        const gameTileset = gameMap.addTilesetImage(
            "tileset_foret",
            "tileset_foret"
        );

        const grassLayer = gameMap.createLayer(
            "herbe",
            gameTileset
        );

        const collisionLayer = gameMap.createLayer(
            "collisions",
            gameTileset
        );

        const pathLayer = gameMap.createLayer(
            "path",
            gameTileset
        );

        
        const versVilleLayer = gameMap.createLayer(
            "versVille",
            gameTileset
        );

        /*
        const versMaisonLayer = gameMap.createLayer(
            "versMaison",
            gameTileset
        );
        */



        
        // ----- PROPRIETES DU JEU -----

        // Prise en charge des touches du clavier
        this.clavier = this.input.keyboard.createCursorKeys();
        
        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        collisionLayer.setCollisionByProperty({estSolide: true});
        versVilleLayer.setCollisionByExclusion(-1, true);
        //versMaisonLayer.setCollisionByProperty({sortie: true});


        
        // ----- AFFICHAGE ET PROPRIETES DU PERSONNAGE -----

        // Ajout du personnage dans le jeu
        this.player = new Player(this, this.posX, this.posY, 'heros_idle_droite');

        // Ajout des collisions entre le personnage et les objets / murs / sortie
        this.physics.add.collider(this.player, collisionLayer);

        this.physics.add.collider(this.player, versVilleLayer, function() {
            console.log("vers ville");
            this.scene.start("Ville", {
                x: 1344,
                y: 112
            });
        }, null, this);
        /*
        this.physics.add.collider(this.player, versMaisonLayer, function() {
            console.log("vers maison gm");
            this.scene.start("MaisonGM", {
                x: 1344,
                y: 112
            });
        }, null, this);
        */



        
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