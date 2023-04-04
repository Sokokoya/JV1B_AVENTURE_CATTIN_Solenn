/**
 * MaisonJoueur.js --- Solenn Cattin --- JV1B
 * 
 * Fichier contenant la classe MaisonJoueur, créant la scène du même nom.
*/

import Player from '../Player.js';

export default class MaisonJoueur extends Phaser.Scene {

    constructor() {
        super({key: "MaisonJoueur"});
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

        // Sprites des objets
        this.load.spritesheet('spr_croquette', 'assets/spr_croquette.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('spr_canne', 'assets/spr_canne.png', {frameWidth: 32, frameHeight: 64});
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

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        murLayer.setCollisionByExclusion(-1, true);
        collisionsLayer.setCollisionByProperty({estSolide: true});
        sortieLayer.setCollisionByExclusion(-1, true);


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


        // ----- AJOUT DES OBJETS ET INTERACTIONS -----

        this.croquette = this.physics.add.sprite(240, 464, 'spr_croquette');
        this.canne = this.physics.add.sprite(240, 256, 'spr_canne');

        // Si le joueur a déjà les objets, ils ne réaparaissent plus
        if (window.valeurs.aCroquetteMaison) {
            this.croquette.visible = false;
        }
        if (window.valeurs.aCanne) {
            this.canne.visible = false;
        }


        // Interaction avec la croquette
        this.physics.add.overlap(this.player, this.croquette, function() {
            if (!window.valeurs.aCroquetteMaison) {
                if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                    window.valeurs.aCroquetteMaison = true;

                    this.player.ajoutCroquette();
                    console.log("nb croquette", window.valeurs.nbCroquettes);

                    this.croquette.visible = false;
                }
            }
        }, null, this);


        // Le joueur ne peut intéragir avec la canne que s'il a la clé de sa maison
        this.physics.add.overlap(this.player, this.canne, function() {
            if (!window.valeurs.aCanne && window.valeurs.aCle) {
                if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                    window.valeurs.aCanne = true;

                    this.canne.visible = false;
                }
            }
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