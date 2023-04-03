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

        // Objets
        this.load.spritesheet('spr_cle', 'assets/spr_cle.png', {frameWidth: 32, frameHeight: 32});
       

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

        const detailsLayer = gameMap.createLayer(
            "details",
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

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

      //  const toucheE_down = Phaser.input.keyboard.JustDown(this.keyE);
      //  const toucheZ_down = Phaser.input.keyboard.JustDown(this.keyZ);

        
        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        collisionLayer.setCollisionByProperty({estSolide: true});
        houseLayer.setCollisionByProperty({estSolide: true});
        versMaisonLayer.setCollisionByProperty({sortie: true});
        versForetLayer.setCollisionByProperty({sortie: true});
        versParcLayer.setCollisionByProperty({sortie: true});


        
        // ----- AFFICHAGE ET PROPRIETES DU PERSONNAGE -----

        // Ajout du personnage dans le jeu
        this.player = new Player(this, this.posX, this.posY, 'heros_idle_droite');

        // Ajout des collisions entre le personnage et les objets et les murs
        this.physics.add.collider(this.player, houseLayer);
        this.physics.add.collider(this.player, collisionLayer);

        // Ajout des colisions entre le personnage et les sorties
        // --> vers la maison du joueur
        this.physics.add.collider(this.player, versMaisonLayer, function() {
            console.log("vers maison joueur");
            //#TODO: rajouter la condition d'avoir la clé pour rentrer
            this.scene.start("MaisonJoueur", {
                x: 448,
                y: 544
            });
        }, null, this);

        // --> vers le Parc
        this.physics.add.collider(this.player, versParcLayer, function() {
            console.log("vers parc");
            //#TODO: rajouter un pnj qui l'empeche de sortir tant qu'il a pas parlé a la mamie
            this.scene.start("Parc", {
                x: 64,
                y: 1136
            });
        }, null, this);

        // --> vers la Forêt
        this.physics.add.collider(this.player, versForetLayer, function() {
            console.log("vers foret");
            this.scene.start("Foret", {
                x: 1024,
                y: 1168
            });
        }, null, this);


        // ----- AJOUT DES OBJETS ET INTERACTIONS -----

        // Clé à récupérer dans une buisson

        this.cle = this.physics.add.sprite(464, 1168, 'spr_cle');

        this.anims.create({
            key: 'cle_ingame',
            frames: [{ key: 'spr_cle', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'cle_inventaire',
            frames: [{ key: 'spr_cle', frame: 0 }],
            frameRate: 20
        });

        this.cle.anims.play('cle_ingame', true);

        //#TODO: ajout hitbox personnage, pour savoir ce qu'il peut toucher ou pas
        this.physics.add.overlap(this.player, this.cle, function() {
            if (!this.player.aCle) {
                if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                    window.valeurs.aCle = true;
                    this.cle.anims.play('cle_inventaire', true);
                }
            }
            
        }, null, this);
        console.log("aCle", window.valeurs.aCle);

        

        
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