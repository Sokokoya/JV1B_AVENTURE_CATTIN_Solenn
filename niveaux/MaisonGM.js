/**
 * MaisonGM.js --- Solenn Cattin --- JV1B
 * 
 * Fichier contenant la classe MaisonGM, créant la scène du même nom.
*/

import Player from '../Player.js';

export default class MaisonGM extends Phaser.Scene {

    constructor() {
        super({key: "MaisonGM"});
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
        this.load.tilemapTiledJSON('map_maison_gm', 'assets/maps/map_maison_gm.json');

    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------
    
    create() {

        // ----- AFFICHAGE DU JEU -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_maison_gm');

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
        murLayer.setCollisionByExclusion(-1, true);
        collisionsLayer.setCollisionByProperty({estSolide: true});
        versForetLayer.setCollisionByExclusion(-1, true);


        // ----- AFFICHAGE ET PROPRIETES DU PERSONNAGE -----

        // Ajout du personnage dans le jeu
        this.player = new Player(this, this.posX, this.posY, 'heros_idle_droite');

        // Bouton E qui va suivre le joueur
        this.ui_bouton_e = this.physics.add.sprite(this.player.x + 32, this.player.y - 48, 'ui_bouton_e');
        this.ui_bouton_e.visible = false;

        // Bouton Z qui va suivre le joueur
        this.ui_bouton_z = this.physics.add.sprite(this.player.x + 32, this.player.y - 48, 'ui_bouton_z');
        this.ui_bouton_z.visible = false;



        // Ajout des collisions entre le personnage et les objets / murs / sortie

        // --> vers la Forêt
        this.physics.add.collider(this.player, murLayer);
        this.physics.add.collider(this.player, collisionsLayer);

        this.physics.add.collider(this.player, versForetLayer, function() {
            this.scene.start("Foret", {
                x: 368,
                y: 688
            });
        }, null, this);


        // ----- AJOUT DES PNJ ET LEURS INTERACTIONS -----

        // --> Grand-mère
        this.grandMere = this.physics.add.sprite(300, 300, 'spr_grand_mere');

        this.dial_grandMere = this.physics.add.sprite(512, 470, 'dial_grandMere').setScrollFactor(0);

        this.anims.create({
            key: 'dial_grandMere_5',
            frames: [{ key: 'dial_grandMere', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dial_grandMere_6',
            frames: [{ key: 'dial_grandMere', frame: 5 }],
            frameRate: 20
        });

        this.dial_grandMere.play('dial_grandMere_5');
        this.dial_grandMere.visible = false;


        // --> Petite fille
        this.petiteFille = this.physics.add.sprite(400, 400, 'spr_petite_fille');

        this.dial_petiteFille = this.physics.add.sprite(512, 470, 'dial_petiteFille').setScrollFactor(0);

        this.anims.create({
            key: 'dial_petiteFille_4',
            frames: [{ key: 'dial_petiteFille', frame: 3 }],
            frameRate: 20
        });

        this.dial_petiteFille.play('dial_petiteFille_4');
        this.dial_petiteFille.visible = false;


        // Bouton E qui va s'afficher lors des dialogues
        this.dial_bouton_e = this.physics.add.sprite(776, 516, 'ui_bouton_e').setScrollFactor(0);
        this.dial_bouton_e.visible = false;


        // ----- DIALOGUES -----

        // --> Dialogues avec la grand-mère
        this.physics.add.overlap(this.player, this.grandMere, function() {
            this.ui_bouton_e.visible = true;

            if (this.keyE.isDown) {

                if (!this.dialogueActif && !window.valeurs.gmParle6) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle6 = true;
                    this.dial_bouton_e.visible = true;
        
                    this.dial_grandMere.visible = true;
                    this.dial_grandMere.play('dial_grandMere_5'); 
        
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
        
                } else if (!this.dialogueActif && window.valeurs.gmParle6 && !window.valeurs.gmParle7) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle7 = true;
    
                    this.dial_grandMere.visible = false;
                    this.dial_bouton_e.visible = false;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
        
                } else if (!this.dialogueActif && window.valeurs.gmParle7 && !window.valeurs.gmParle8) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle8 = true;
                    window.valeurs.gmParle7 = false;
                    this.dial_bouton_e.visible = true;
    
                    this.dial_grandMere.play('dial_grandMere_6'); 
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
    
                } else if (!this.dialogueActif && window.valeurs.gmParle8 && !window.valeurs.gmParle7) {
                    this.dialogueActif = true;
    
                    this.dial_grandMere.visible = false;
                    this.dial_bouton_e.visible = false;
                    window.valeurs.gmParle7 = true;
                    window.valeurs.gmParle8 = false;
    
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
                } 
            }
        }, null, this);


        // --> Dialogue avec la petite fille ou coup de canne
        this.physics.add.overlap(this.player, this.petiteFille, function() {
            this.ui_bouton_z.visible = true;

            // Si on décide de lui parler
            if (this.keyE.isDown) {

                if (!this.dialogueActif && !window.valeurs.pfParle5) {
                    this.dialogueActif = true;
                    window.valeurs.pfParle5 = true;
                    this.dial_bouton_e.visible = true;

                    this.cameras.main.shake(200, 0.01);
        
                    this.dial_petiteFille.visible = true;
                    this.dial_petiteFille.play('dial_petiteFille_4'); 
        
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
        
                } else if (!this.dialogueActif && window.valeurs.pfParle5) {
                    this.dialogueActif = true;
                    window.valeurs.pfParle4 = false;
    
                    this.dial_petiteFille.visible = false;
                    this.dial_bouton_e.visible = false;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
        
                } 
                
            }
            if (this.keyZ.isDown && window.valeurs.aCanne) {

                //#TODO: rajouter qqchose pour faire comprendre qu'on a notre chien de retour
                this.cameras.main.shake(200, 0.01);
                window.valeurs.pfFrapee = true;
            }
        }, null, this);



        // ----- AJOUT DES OBJETS ET INTERACTIONS -----

        // Ajout du sprite de la croquette dans la maison
        this.croquetteMaison = this.physics.add.sprite(288, 672, 'spr_croquette');

        if (window.valeurs.aCroquetteGM) {
            this.croquetteMaison.visible = false;
        }

        // Interaction avec la croquette
        this.physics.add.overlap(this.player, this.croquetteMaison, function() {

            if (!window.valeurs.aCroquetteGM) {

                this.ui_bouton_e.visible = true;

                if (Phaser.Input.Keyboard.JustDown(this.keyE)) {

                    this.player.ajoutCroquette();

                    this.croquetteMaison.visible = false;
                }
            }   
        }, null, this);


        // ----- AFFICHAGE DU CHIEN -----

        this.chien = this.physics.add.sprite(432, 400, 'spr_chien');
        this.chien.body.setImmovable(true);



        // ----- AFFICHAGE DE L'UI -----
        this.dialogueActif = false;

        this.ui_fatigue = this.physics.add.sprite(96, 32, 'ui_fatigue').setScrollFactor(0);
        this.ui_croquette = this.physics.add.sprite(64, 80, 'ui_croquette').setScrollFactor(0);
        this.ui_cle = this.physics.add.sprite(128, 80, 'spr_cle').setScrollFactor(0);
        this.ui_canne = this.physics.add.sprite(160, 80, 'ui_canne').setScrollFactor(0);

        this.ui_cle.visible = false;
        this.ui_canne.visible = false;
        this.ui_croquette.visible = false;
        



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
        this.physics.world.setBounds(0, 0, 960, 960);
        this.cameras.main.setBounds(0, 0, 960, 960);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
    


    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION UPDATE -------------------------------------
    // -----------------------------------------------------------------------------------------
    update() {

        this.ui_bouton_e.x = this.player.x + 32;
        this.ui_bouton_e.y = this.player.y - 48;

        this.ui_bouton_z.x = this.player.x + 32;
        this.ui_bouton_z.y = this.player.y - 48;

        if(!this.player.body.wasTouching.none && this.player.body.touching.none){
            this.ui_bouton_e.visible = false;
            this.ui_bouton_z.visible = false;
        }

        this.player.updateMouvement();
        

        if (window.valeurs.nbCroquettes == 1) {
            this.ui_croquette.play('croquette1');
            this.ui_croquette.visible = true;
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