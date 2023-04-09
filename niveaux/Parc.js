/**
 * Parc.js --- Solenn Cattin --- JV1B
 * 
 * Fichier contenant la classe Parc, créant la scène du même nom.
*/

import Ennemi from '../Ennemi.js';
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
        this.load.spritesheet('spr_pigeon', 'assets/spr_pigeon.png', {frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('spr_barriere', 'assets/spr_barriere.png', {frameWidth: 96, frameHeight: 32});
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

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        
        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        collisionLayer.setCollisionByExclusion(-1, true);
        versVilleLayer.setCollisionByExclusion(-1, true);

        

        
        if (!window.valeurs.pfParlee) {

            this.barriere = this.physics.add.sprite(368, 1072, 'spr_barriere');
            this.barriere.body.setImmovable(true);

            // Ajout d'une hitbox devant l'entrée fermée du parc
            this.hitbox = this.physics.add.sprite(368, 1120, 'spr_hitbox');
            this.hitbox.body.setImmovable(true);
        }

        
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
        this.physics.add.collider(this.player, collisionLayer);

        this.physics.add.collider(this.player, versVilleLayer, function() {
            console.log("vers ville");
            this.scene.start("Ville", {
                x: 1536,
                y: 208
            });
        }, null, this);

        this.physics.add.collider(this.player, this.barriere, function() {
            if (!window.valeurs.pfParlee) {
                this.ui_bouton_e.visible = true;

            } else {
                this.barriere.destroy();
            }
            
        }, null, this);

        



        // ----- AFFICHAGE DES ENNEMIS -----

        // --> La petite fille : le boss
        this.petiteFille = this.physics.add.sprite(272, 992, 'spr_petite_fille');
        this.petiteFille.body.setImmovable(true);

        // Ajout des dialogues
        this.dial_petiteFille = this.physics.add.sprite(512, 460, 'dial_petiteFille').setScrollFactor(0);
        

        this.anims.create({
            key: 'dial_petiteFille_1',
            frames: [{ key: 'dial_petiteFille', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dial_petiteFille_2',
            frames: [{ key: 'dial_petiteFille', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dial_petiteFille_3',
            frames: [{ key: 'dial_petiteFille', frame: 2 }],
            frameRate: 20
        });

        this.dial_petiteFille.play('dial_petiteFille_1');
        this.dial_petiteFille.visible = false;

        // Bouton E qui va s'afficher lors des dialogues
        this.dial_bouton_e = this.physics.add.sprite(776, 516, 'ui_bouton_e').setScrollFactor(0);
        this.dial_bouton_e.visible = false;


        // --> Conversation avec la petite fille lorsqu'on essaie de récuperer le chien
        this.physics.add.overlap(this.player, this.petiteFille, function() {

            this.ui_bouton_e.visible = true;

            if (this.keyE.isDown) {

                if (!this.dialogueActif &&  !window.valeurs.pfParle4) {
                    this.dialogueActif = true;
                    window.valeurs.pfParle4 = true;

                    window.valeurs.pfParlee = true;
                    this.dial_bouton_e.visible = true;

                    this.cameras.main.shake(200, 0.01);
        
                    this.dial_petiteFille.visible = true;
                    this.dial_petiteFille.play('dial_petiteFille_3'); 
        
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
        
                } else if (!this.dialogueActif && window.valeurs.pfParle4) {
                    this.dialogueActif = true;
                    window.valeurs.pfParle4 = false;
    
                    this.dial_petiteFille.visible = false;
                    this.petiteFille.visible = false;
                    this.dial_bouton_e.visible = false;
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
        
                } 
            }
        }, null, this);


        // --> Conversation avec la petite fille lorsque le joueur essaie de rentrer dans le parc
        this.physics.add.overlap(this.player, this.hitbox, function() {
            if (!window.valeurs.pfParlee) {
                this.ui_bouton_e.visible = true;
            }
            

            if (this.keyE.isDown && !window.valeurs.pfParlee) {

                if (!this.dialogueActif &&  !window.valeurs.pfParle1) {
                    this.dialogueActif = true;
                    window.valeurs.pfParle1 = true;
                    this.dial_bouton_e.visible = true;
        
                    this.dial_petiteFille.visible = true;
                    this.dial_petiteFille.play('dial_petiteFille_1'); 
        
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
        
                } else if (!this.dialogueActif && window.valeurs.pfParle1 && !window.valeurs.pfParle2) {
                    this.dialogueActif = true;
                    window.valeurs.pfParle2 = true;
    
                    this.dial_petiteFille.play('dial_petiteFille_2'); 
                    this.cameras.main.shake(200, 0.01);
    
                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);
        
                } else if (!this.dialogueActif && window.valeurs.pfParle2 && !window.valeurs.pfParle3) {
                    this.dialogueActif = true;

                    this.dial_petiteFille.visible = false;
                    window.valeurs.pfParle3 = true;
                    this.dial_bouton_e.visible = false;

                    setTimeout(() => {
                        this.dialogueActif = false;
                    }, 500);

                }

            }
        }, null, this);

        if (window.valeurs.pfParlee) {
            this.petiteFille.destroy();
        }


        // --> Les pigeons : les ennemis
        this.ennemis = this.physics.add.group();

        // Coordonées des cases sur lesquelles se trouvent des pigeons
        let coordoneesEnnemis = [
            {x: 8, y: 10}, {x: 9, y: 11}, {x: 18, y: 9},
            {x: 17, y: 11}, {x: 12, y: 15}, {x: 10, y: 16},
            {x: 20, y: 14}, {x: 22, y: 15}, {x: 21, y: 16},
            {x: 19, y: 16}, {x: 19, y: 17}, {x: 23, y: 17},
            {x: 22, y: 18}, {x: 28, y: 16}, {x: 29, y: 21},
            {x: 28, y: 25}, {x: 27, y: 29}, {x: 25, y: 29},
            {x: 24, y: 26}, {x: 22, y: 29}, {x: 21, y: 24},
            {x: 20, y: 27}, {x: 19, y: 25}, {x: 17, y: 25},
            {x: 15, y: 31}
        ];

        for (let i=0; i<25; i++) {

            // Multiplication de chaque coordonée par 32 pour obtenir les coordonées en pixels
            let posX = coordoneesEnnemis[i].x * 32;
            let posY = coordoneesEnnemis[i].y * 32;

            let ennemi = new Ennemi(this, posX, posY, 'spr_pigeon');

            this.ennemis.add(ennemi);
        }

        // Coup de canne sur les pigeons
        this.physics.add.overlap(this.player, this.ennemis, function() {
            if (window.valeurs.aCanne) {
                this.ui_bouton_z.visible = true;
            }
            if (this.keyZ.isDown && window.valeurs.aCanne) {
                //#TODO: changer ici car erreur
                window.valeurs.attaque = true;
                this.ennemis.children.each((ennemi) => {
                    ennemi.update();
                });
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