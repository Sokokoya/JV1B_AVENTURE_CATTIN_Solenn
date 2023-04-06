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
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);


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



        // ----- AFFICHAGE DE L'UI -----
        this.dialogueActif = false;

        this.ui_cadre = this.physics.add.sprite(512, 32, 'ui_cadre').setScrollFactor(0);
        this.ui_fatigue = this.physics.add.sprite(64, 32, 'ui_fatigue').setScrollFactor(0);
        this.ui_croquette = this.physics.add.sprite(128, 32, 'ui_croquette').setScrollFactor(0);
        this.ui_dialogue = this.physics.add.sprite(512, 460, 'ui_dialogue').setScrollFactor(0);
        //this.ui_inventaire = this.physics.add.sprite(922, 300, 'ui_inventaire').setScrollFactor(0);
        this.ui_cle = this.physics.add.sprite(192, 32, 'spr_cle').setScrollFactor(0);
        this.ui_canne = this.physics.add.sprite(256, 32, 'ui_canne').setScrollFactor(0);

        this.ui_cle.anims.play('cle_inventaire');

        this.ui_dialogue.visible = false;
        this.ui_cle.visible = false;
        this.ui_canne.visible = false;

        this.texteDialogue = this.add.text(512, 460, "Dialogue");
        this.texteDialogue.visible = false;
        



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


        this.ui_croquette.play('croquette0');
        this.ui_fatigue.play('fatigue7');

        if (window.valeurs.nbCroquettes == 1) {
            this.ui_croquette.play('croquette1');
        }


        
        // ----- CAMERA -----

        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 1600, 1600);
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);

    }


    update() {

        this.player.updateMouvement();
        

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


        if (this.dialogueActif) {
            this.ui_dialogue.visible = true;
        }

        if (this.keyZ.isDown && !window.valeurs.invincible && window.valeurs.aCanne) {
            window.valeurs.invincible = true;
            window.valeurs.fatigue -= 1;
            this.player.attaque();
            setTimeout(function() {
                window.valeurs.invincible = false;
            }, 300);
            
        }

        if (window.valeurs.aCle) {
            this.ui_cle.visible = true;
        }
        if (window.valeurs.aCanne) {
            this.ui_canne.visible = true;
        }

    }

    

}