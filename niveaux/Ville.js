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

        // Ennemis et amis
        this.load.spritesheet('spr_pigeon_croquette', 'assets/spr_pigeon_croquette.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('spr_pnj', 'assets/spr_pnj.png', {frameWidth: 64, frameHeight: 96});
       

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

        // ----- CHANGEMENTS DE SCENES -----

        // --> vers la maison du joueur
        this.physics.add.collider(this.player, versMaisonLayer, function() {
            console.log("vers maison joueur");
            
            if (window.valeurs.aCle) {
                this.scene.start("MaisonJoueur", {
                    x: 448,
                    y: 544
                });
            }
            //#TODO: on affiche le message qu'il a perdu ses clés
            
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

        
        // ----- AJOUT DES ENNEMIS -----

        // Ennemi spécial : pigeon avec sa croquette
        this.pigeonCroquette = this.physics.add.sprite(1232, 1360, 'spr_pigeon_croquette');

        // On ajoute le sprite de la croquette qu'il va drop, mais on la cache
        this.croquettePigeon = this.physics.add.sprite(1232, 1360, 'spr_croquette');
        this.croquettePigeon.visible = false;
        
        // Si le pigeon n'a toujours pas été attaque, on l'affiche
        if (window.valeurs.presencePigeonCroquette) {
            
            // Si on l'attaque, on detruit le sprite du pigeon, puis on rend visible celui de la croquette
            this.physics.add.overlap(this.player, this.pigeonCroquette, function() {

                // On n'interagit avec le pigeon seulement si on a déjà la canne
                if (Phaser.Input.Keyboard.JustDown(this.keyZ) && window.valeurs.aCanne) {
                    //this.player.attaque();

                    window.valeurs.presencePigeonCroquette = false;
                    console.log(window.valeurs.presencePigeonCroquette);

                    //#TODO: animation pigeon qui vole
                    this.pigeonCroquette.visible = false;

                    this.croquettePigeon.visible = true;
                }
            
            }, null, this);
        } 
        
        
        // Interaction avec la croquette
        this.physics.add.overlap(this.player, this.croquettePigeon, function() {

            // On ne peut interagir avec elle seulement si elle est visible
            if (!window.valeurs.presencePigeonCroquette) {
                if (Phaser.Input.Keyboard.JustDown(this.keyE)) {

                    console.log("nb croquette", window.valeurs.nbCroquettes);

                    this.player.ajoutCroquette();

                    this.croquettePigeon.visible = false;

                    console.log("nb croquette", window.valeurs.nbCroquettes);

                }
            }   
            
        }, null, this);
        
        
        // ----- AFFICHAGE DE L'UI -----

        this.ui_fatigue = this.physics.add.sprite(64, 96, 'ui_fatigue').setScrollFactor(0);
        this.ui_croquette = this.physics.add.sprite(128, 96, 'ui_croquette').setScrollFactor(0);
        this.ui_dialogue = this.physics.add.sprite(512, 460, 'ui_dialogue').setScrollFactor(0);
        this.ui_inventaire = this.physics.add.sprite(922, 300, 'ui_inventaire').setScrollFactor(0);


        // ----- ANIMATIONS UI -----

        // Croquette
        this.anims.create({
            key: 'croquette0',
            frames: [{ key: 'ui_croquette', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette1',
            frames: [{ key: 'ui_croquette', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette2',
            frames: [{ key: 'ui_croquette', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette3',
            frames: [{ key: 'ui_croquette', frame: 3 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette4',
            frames: [{ key: 'ui_croquette', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette5',
            frames: [{ key: 'ui_croquette', frame: 4 }],
            frameRate: 20
        });


        // Fatigue
        this.anims.create({
            key: 'fatigue7',
            frames: [{ key: 'ui_fatigue', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue6',
            frames: [{ key: 'ui_fatigue', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue5',
            frames: [{ key: 'ui_fatigue', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue4',
            frames: [{ key: 'ui_fatigue', frame: 3 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue3',
            frames: [{ key: 'ui_fatigue', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue2',
            frames: [{ key: 'ui_fatigue', frame: 5 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue1',
            frames: [{ key: 'ui_fatigue', frame: 6 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue0',
            frames: [{ key: 'ui_fatigue', frame: 7 }],
            frameRate: 20
        });


        // ----- CAMERA -----

        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 1600, 1600);
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);




        

        this.ui_croquette.play('croquette0');
        this.ui_fatigue.play('fatigue7');

        if (window.valeurs.nbCroquettes == 1) {
            this.ui_croquette.play('croquette1');
        }

    }


    update() {

        this.player.updateMouvement();
        //this.player.updateUI();

        if (window.valeurs.nbCroquettes == 1) {
            this.ui_croquette.play('croquette1');
        }
        if (window.valeurs.nbCroquettes == 2) {
            this.ui_croquette.play('croquette2');
        }
        if (window.valeurs.nbCroquettes == 3) {
            this.ui_croquette.play('croquette3');
        }
        if (window.valeurs.nbCroquettes == 4) {
            this.ui_croquette.play('croquette4');
        }
        if (window.valeurs.nbCroquettes == 5) {
            this.ui_croquette.play('croquette5');
        }


        if (window.valeurs.fatigue == 7) {
            this.ui_fatigue.play('fatigue7');
        }
        if (window.valeurs.fatigue == 6) {
            this.ui_fatigue.play('fatigue6');
        }
        if (window.valeurs.fatigue == 5) {
            this.ui_fatigue.play('fatigue5');
        }
        if (window.valeurs.fatigue == 4) {
            this.ui_fatigue.play('fatigue4');
        }
        if (window.valeurs.fatigue == 3) {
            this.ui_fatigue.play('fatigue3');
        }
        if (window.valeurs.fatigue == 2) {
            this.ui_fatigue.play('fatigue2');
        }
        if (window.valeurs.fatigue == 1) {
            this.ui_fatigue.play('fatigue1');
        }
        if (window.valeurs.fatigue == 0) {
            this.ui_fatigue.play('fatigue0');
            //#TODO: afficher ecran de mort + recommencer
        }



        //#TODO: regler le probleme ici !! (ca crash)
        /*
        if (Phaser.Input.Keyboard.JustDown(this.keyZ) && window.valeurs.aCanne) {

            window.valeurs.fatigue -= 1;
        }*/

        /*
        while(window.valeurs.fatigue < 7) {
            setTimeout(function() {
                window.valeurs.fatigue += 1;
            }, 3000);
        }*/

      
    }

}