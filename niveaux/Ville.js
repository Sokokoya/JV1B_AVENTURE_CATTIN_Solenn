/**
 * Ville.js --- Solenn Cattin --- JV1B
 * 
 * Fichier contenant la classe Ville, créant la scène du même nom.
*/

import Player from "../Player.js";

export default class Ville extends Phaser.Scene {

    constructor() {
        super({key: "Ville"});
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
        this.load.tilemapTiledJSON('map_ville', 'assets/maps/map_ville.json');
       

    }


    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_ville');


        const gameTileset = gameMap.addTilesetImage(
            "tileset_exterieur",
            "tileset_exterieur"
        );

        const grassLayer = gameMap.createLayer(
            "herbe",
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

        const houseLayer = gameMap.createLayer(
            "maisons",
            gameTileset
        );

        const versMaisonLayer = gameMap.createLayer(
            "versMaison",
            gameTileset
        );

        const versParcLayer = gameMap.createLayer(
            "versParc",
            gameTileset
        );

        const versForetLayer = gameMap.createLayer(
            "versForet",
            gameTileset
        );




        
        // ----- PROPRIETES DU JEU -----

        // Prise en charge des touches du clavier
        this.clavier = this.input.keyboard.createCursorKeys();
        
        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        collisionLayer.setCollisionByProperty({estSolide: true});
        houseLayer.setCollisionByProperty({estSolide: true});
        versMaisonLayer.setCollisionByProperty({sortie: true});
        versForetLayer.setCollisionByProperty({sortie: true});
        versParcLayer.setCollisionByProperty({sortie: true});


        
        // ----- AFFICHAGE ET PROPRIETES DU PERSONNAGE -----

        // Ajout du personnage dans le jeu
        this.player = new Player(this, this.posX, this.posY, 'heros_idle_droite');

        // Ajout des collisions entre le personnage et les objets / murs / sortie
        this.physics.add.collider(this.player, houseLayer);
        this.physics.add.collider(this.player, collisionLayer);

        this.physics.add.collider(this.player, versMaisonLayer, function() {
            console.log("vers maison joueur");
            this.scene.start("MaisonJoueur", {
                x: 448,
                y: 544
            });
        }, null, this);

        this.physics.add.collider(this.player, versParcLayer, function() {
            console.log("vers parc");
            //#TODO: rajouter un pnj qui l'empeche de sortir tant qu'il a pas parlé a la mamie
            this.scene.start("Parc", {
                x: 64,
                y: 1136
            });
        }, null, this);

        this.physics.add.collider(this.player, versForetLayer, function() {
            console.log("vers foret");
            this.scene.start("Foret", {
                // changer coordonées
                x: 1024,
                y: 1168
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