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

        // Ajout d'une hitbox devant la maison de la grand-mère
        this.hitbox = this.physics.add.sprite(368, 672, 'spr_hitbox');

        // ----- AFFICHAGE DE LA GRAND MERE -----
        this.grandmere = this.physics.add.sprite(464, 688, 'spr_grand_mere');
        if (window.valeurs.pfParlee) {
            this.grandmere.visible = false;
        }
        

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

        // Bouton E qui va suivre le joueur
        this.ui_bouton_e = this.physics.add.sprite(this.player.x + 32, this.player.y - 48, 'ui_bouton_e');
        this.ui_bouton_e.visible = false;

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

            if (window.valeurs.pfParlee) {
                this.scene.start("MaisonGM", {
                    x: 480,
                    y: 592
                });
            }

        }, null, this);



        // Bouton E qui va s'afficher lors des dialogues
        this.dial_bouton_e = this.physics.add.sprite(776, 516, 'ui_bouton_e').setScrollFactor(0);
        this.dial_bouton_e.visible = false;

        

        // Que le joueur parle à la grand-mère, ou essaie de rentrer dans sa maison, l'interaction est la même
        this.physics.add.overlap(this.player, this.hitbox, function() {
            if (!window.valeurs.pfParlee) {
                this.ui_bouton_e.visible = true;
            }

            if (this.keyE.isDown && !window.valeurs.pfParlee) {

                if (!this.dialogueActif && !window.valeurs.queteMamie && !window.valeurs.gmParle1) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle1 = true;
                    this.dial_bouton_e.visible = true;
        
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
                    this.dial_bouton_e.visible = false;
    
                    window.valeurs.queteMamie = true;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
    
                // --- Deuxieme dialogue (n'apparait que si on a parlé une première fois avec le pnj)
                } else if (!this.dialogueActif && window.valeurs.queteMamie && !window.valeurs.pfParlee && !window.valeurs.gmParle5) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle5 = true;
    
                    this.dial_grandMere.play('dial_grandMere_4');
                    this.dial_grandMere.visible = true;
                    this.dial_bouton_e.visible = true;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
    
    
                } else if(!this.dialogueActif && window.valeurs.queteMamie && !window.valeurs.pfParlee && window.valeurs.gmParle5) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle5 = false;
    
                    this.dial_grandMere.visible = false;
                    this.dial_bouton_e.visible = false;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
                } 
            }
        }, null, this);

        

        this.physics.add.overlap(this.player, this.grandmere, function() {
            if (!window.valeurs.pfParlee) {
                this.ui_bouton_e.visible = true;
            }

            if (this.keyE.isDown && !window.valeurs.pfParlee) {

                if (!this.dialogueActif && !window.valeurs.queteMamie && !window.valeurs.gmParle1) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle1 = true;
        
                    this.dial_grandMere.visible = true;
                    this.dial_bouton_e.visible = true;
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
                    this.dial_bouton_e.visible = false;
    
                    window.valeurs.queteMamie = true;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
    
                // --- Deuxieme dialogue (n'apparait que si on a parlé une première fois avec le pnj)
                } else if (!this.dialogueActif && window.valeurs.queteMamie && !window.valeurs.pfParlee && !window.valeurs.gmParle5) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle5 = true;
    
                    this.dial_grandMere.play('dial_grandMere_4');
                    this.dial_grandMere.visible = true;
                    this.dial_bouton_e.visible = true;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
    
    
                } else if(!this.dialogueActif && window.valeurs.queteMamie && !window.valeurs.pfParlee && window.valeurs.gmParle5) {
                    this.dialogueActif = true;
                    window.valeurs.gmParle5 = false;
    
                    this.dial_grandMere.visible = false;
                    this.dial_bouton_e.visible = false;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
                } 
            }
        }, null, this);





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
        this.physics.world.setBounds(0, 0, 1280, 1280);
        this.cameras.main.setBounds(0, 0, 1280, 1280);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);


    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION UPDATE -------------------------------------
    // -----------------------------------------------------------------------------------------
    update() {

        this.ui_bouton_e.x = this.player.x + 32;
        this.ui_bouton_e.y = this.player.y - 48;

        if(!this.player.body.wasTouching.none && this.player.body.touching.none){
            this.ui_bouton_e.visible = false;
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