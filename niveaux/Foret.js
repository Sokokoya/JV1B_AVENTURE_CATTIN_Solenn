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

        // Chargement du sprite de la grand mère
        this.load.spritesheet('spr_grand_mere', 'assets/spr_grand_mere.png', {frameWidth: 64, frameHeight: 96});
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

        
        const versMaisonLayer = gameMap.createLayer(
            "versMaisonGM",
            gameTileset
        );
        



        
        // ----- PROPRIETES DU JEU -----

        // Prise en charge des touches du clavier
        this.clavier = this.input.keyboard.createCursorKeys();

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        
        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        collisionLayer.setCollisionByProperty({estSolide: true});
        versVilleLayer.setCollisionByExclusion(-1, true);
        versMaisonLayer.setCollisionByProperty({sortie: true});


        // ----- AFFICHAGE DE LA GRAND MERE -----
        this.grandmere = this.physics.add.sprite(1024, 960, 'spr_grand_mere');
        this.grandmere.visible = false;

        this.dial_grandMere = this.physics.add.sprite(512, 460, 'dial_grandMere').setScrollFactor(0);

        this.anims.create({
            key: 'dial_grandMere_1',
            frames: [{ key: 'dial_grandMere', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dial_grandMere_2',
            frames: [{ key: 'dial_grandMere', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dial_grandMere_3',
            frames: [{ key: 'dial_grandMere', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dial_grandMere_4',
            frames: [{ key: 'dial_grandMere', frame: 3 }],
            frameRate: 20
        });

        this.dial_grandMere.play('dial_grandMere_1');
        this.dial_grandMere.visible = false;

        
        // ----- AFFICHAGE ET PROPRIETES DU PERSONNAGE -----

        // Ajout du personnage dans le jeu
        this.player = new Player(this, this.posX, this.posY, 'heros_idle_droite');

        // Ajout des collisions entre le personnage et les objets / murs / sortie
        this.physics.add.collider(this.player, collisionLayer);

        // --> vers la Ville
        this.physics.add.collider(this.player, versVilleLayer, function() {



            this.scene.start("Ville", {
                x: 1344,
                y: 112
            });
        }, null, this);
        


        // --> vers la maison de la grand-mère
        this.physics.add.collider(this.player, versMaisonLayer, function() {

            //#TODO: regler bug de dialogue ici (peut etre enlever le dialogue en ouvrant la porte et en le mettant direct dans la scene maison ?)
            if (this.keyE.isDown) {
                if (window.valeurs.pfParle) {
                    this.interactionGM();
                }
            } else {
                this.scene.start("MaisonGM", {
                    x: 480,
                    y: 592
                });
            }
           
            
        }, null, this);
        


        

        this.physics.add.overlap(this.player, this.grandmere, function() {
            if (this.keyE.isDown) {
                this.interactionGM();
                window.valeurs.queteMamie = true;
                console.log("quete mamie oui");
                
            }
        }, null, this);





        // ----- AFFICHAGE DE L'UI -----
        this.dialogueActif = false;

        this.ui_cadre = this.physics.add.sprite(512, 32, 'ui_cadre').setScrollFactor(0);
        this.ui_fatigue = this.physics.add.sprite(64, 32, 'ui_fatigue').setScrollFactor(0);
        this.ui_croquette = this.physics.add.sprite(128, 32, 'ui_croquette').setScrollFactor(0);
        this.ui_cle = this.physics.add.sprite(192, 32, 'spr_cle').setScrollFactor(0);
        this.ui_canne = this.physics.add.sprite(256, 32, 'ui_canne').setScrollFactor(0);

        this.ui_cle.visible = false;
        this.ui_canne.visible = false;

        



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
        this.physics.world.setBounds(0, 0, 1280, 1280);
        this.cameras.main.setBounds(0, 0, 1280, 1280);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);


    }

    interactionGM() {

        if (this.keyE.isDown) {
            this.grandmere.visible = true;

            if (!this.dialogueActif && !window.valeurs.queteMamie && !window.valeurs.gmParle1) {
                this.dialogueActif = true;
                window.valeurs.gmParle1 = true;
    
                this.dial_grandMere.visible = true;
                this.dial_grandMere.play('dial_grandMere_1'); 
    
                setTimeout(() => {
                    this.dialogueActif = false;
                }, 500);
    
            } else if (!this.dialogueActif && !window.valeurs.queteMamie && window.valeurs.gmParle1 && !window.valeurs.gmParle2) {
                this.dialogueActif = true;
                window.valeurs.gmParle2 = true;

                this.dial_grandMere.play('dial_grandMere_2'); 

                setTimeout(() => {
                    this.dialogueActif = false;
                }, 500);
    
            } else if (!this.dialogueActif && !window.valeurs.queteMamie && window.valeurs.gmParle2 && !window.valeurs.gmParle3) {
                this.dialogueActif = true;
                window.valeurs.gmParle3 = true;
                window.valeurs.gmParle4 = false;

                this.dial_grandMere.play('dial_grandMere_3'); 

                setTimeout(() => {
                    this.dialogueActif = false;
                }, 500);

            } else if (!this.dialogueActif && !window.valeurs.queteMamie && window.valeurs.gmParle3 && !window.valeurs.gmParle4) {
                this.dialogueActif = true;

                this.dial_grandMere.visible = false;
                window.valeurs.gmParle4 = true;
                window.valeurs.gmParle3 = false;

                window.valeurs.queteMamie = true;

                setTimeout(() => {
                    this.dialogueActif = false;
                }, 500);

            // --- Deuxieme dialogue (n'apparait que si on a parlé une première fois avec le pnj)
            } else if (!this.dialogueActif && window.valeurs.queteMamie && window.valeurs.pfParlee && !window.valeurs.gmParle5) {
                this.dialogueActif = true;
                window.valeurs.gmParle5 = true;

                this.dial_grandMere.play('dial_grandMere_4');
                this.dial_grandMere.visible = true;

                setTimeout(() => {
                    this.dialogueActif = false;
                }, 500);


            } else if(!this.dialogueActif && window.valeurs.queteMamie && window.valeurs.pfParlee && window.valeurs.gmParle5) {
                this.dialogueActif = true;
                window.valeurs.gmParle5 = false;

                this.dial_grandMere.visible = false;

                setTimeout(() => {
                    this.dialogueActif = false;
                }, 500);
            } 
        }
        
        



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