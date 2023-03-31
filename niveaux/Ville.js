import Player from "../Player.js";

export default class Ville extends Phaser.Scene {

    constructor() {
        super({key: "Ville"});
    }

    // Initialisation de la scene après avoir changé de scène
    init(data) {
/*
        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y; 

        // Donnees du personnage au debut de la scene
        this.fatigue = data.fatigue;
        this.croquettes = data.croquettes;
        this.aCanne = data.aCanne;
        this.aCle = data.aCle;
   */
    }


    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------
    preload() {

        // Tileset et map
        this.load.image('tileset', 'assets/tileset_exterieur.png');
        this.load.tilemapTiledJSON('map', 'assets/map_1.json');

        // Chargement de l'interface et des objets
        this.load.spritesheet('spr_fatigue', 'assets/spr_fatigue.png', {frameWidth: 64, frameHeight: 32});
        this.load.image('ui_dialogue', 'assets/boite_dialogue.png');
        this.load.image('ui_inventaire', 'assets/boite_inventaire.png');

        this.load.spritesheet('spr_cle', 'assets/spr_cle.png', {frameWidth: 32, frameHeight: 32});

        // Chargement de tous les sprite du joueur
        this.load.spritesheet('idlePersoDroite', 'assets/spr_idle_perso_droite.png', {frameWidth: 64, frameHeight: 96});
        this.load.spritesheet('idlePersoGauche', 'assets/spr_idle_perso_gauche.png', {frameWidth: 64, frameHeight: 96});
        this.load.spritesheet('idlePersoDos', 'assets/spr_idle_perso_dos.png', {frameWidth: 64, frameHeight: 96});


        // Chargement de tous les sprite ennemis
        this.load.spritesheet('idlePigeonDroite', 'assets/spr_idle_pig_droite.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('idlePigeonGauche', 'assets/spr_idle_pig_gauche.png', {frameWidth: 32, frameHeight: 32});

    }

    //#TODO: Fonctions changement de scene
    //#TODO: Fonctions interactions avec pnj

    updateFatigue() {

        if (this.player.fatigue() >= 7) {
            fatigue = 7;
            coeurs.anims.play('fatigue7', true);

        } else if (this.player.fatigue() == 6) {
            coeurs.anims.play('fatigue6', true);

        } else if (this.player.fatigue() == 5) {
            coeurs.anims.play('fatigue5', true);

        } else if (this.player.fatigue() == 4) {
            coeurs.anims.play('fatigue4', true);

        } else if (this.player.fatigue() == 3) {
            coeurs.anims.play('fatigue3', true);

        } else if (this.player.fatigue() == 2) {
            coeurs.anims.play('fatigue2', true);

        } else if (this.player.fatigue() == 1) {
            coeurs.anims.play('fatigue1', true);

        } else if (this.player.fatigue() == 0) {
            coeurs.anims.play('fatigue0', true);
        }
    }


    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------
    create() {

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map');

        const gameTileset = gameMap.addTilesetImage(
            "tileset_exterieur",
            "tileset"
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

        

        // ----- PROPRIETES DU JEU -----

        // E pour interagir avec quelqu'un, Z pour utiliser la canne
        this.keyE = this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        // Ajout des collisions grace aux propriétés des calques
        collisionLayer.setCollisionByProperty({estSolide: true});
        houseLayer.setCollisionByProperty({estSolide: true});

        this.physics.add.collider(this.player, collisionLayer);
        this.physics.add.collider(this.player, houseLayer);





        // collisions avec tileset


        // ----- CREATION DU JOUEUR ET DE SES PROPRIETES -----

        // Ajout du sprite joueur
        this.player = new Player(this.positionX, this.positionY, 'spr_personnage');

        // Prporiétés du joueur
        //#TODO: changer ici pour faire en sorte que ca prenne en compte la prog objet
        this.player.fatigue = this.fatigue;
        this.player.croquettes = this.croquettes;
        this.player.aCanne = this.aCanne;
        this.player.aCle = this. aCle;



        // ----- AJOUT DES ENNEMIS ET DES OBJETS -----

        // Clé cachée dans un buisson
        this.sprCle = this.physics.add.sprite(464, 1168, 'spr_cle');

        //#TODO: mettre ca au bon endroit
        // Si le joueur a déjà trouvé la clé, on cache le sprite et on l'ajoute dans son inventaire
        if (this.this.player.aCle) {
            //#TODO: changer la position de la clé
            this.anims.play("cle_inventaire", true);
        
        // Sinon, il ne l'a pas trouvée et elle se trouve cachée dans un buisson
        } else {
            this.anims.play("cle_ingame", true);
        }



        // ----- AJOUT DES PERSONNAGES NON JOUEURS -----

        this.pnj = this.physics.add.group();
        this.pnj1 = this.pnj.create(0, 0, 'spr_pnj1');



        // ----- COLLIDERS -----
        // Avec la map
        // Avec les objets
        // Avec les pnj


        // ----- DIALOGUES ENTRE LE JOUEUR ET LES PNJ -----

        this.dialogueActif = false;
        this.dialogueCourant = ["", ""];
        this.stepDialogue = 0;

        // Tableau contenant tous les dialogues du joueur
        this.player.dialogue = [
            ["Angie ?", "Angie !??", "ANGIE !!!????", "(ou est-ce qu'elle peut bien etre ? je devrais aller voir dehors si quelqu'un l'a vue.)"]    
        ];

        // Tableaux contenant tous les dialogues des PNJ
        this.pnj1.dialogue = [
            ["Bonjour Jo ! Quoi de beau ?", "Tu as perdu ton chien ? Mince alors.", "Tu devrais peut-etre l'attirer avec quelque chose qu'il aime bien."], 
            ["Desole, je n'ai pas vu ton chien..."]
        ];

        this.pnj2.dialogue = [
            ["On m'a dit que tu avais perdu ton chien.", "Essaie de trouver des croquettes, ca devrait marcher.", "Trois devraient suffire non ?"], 
            ["J'ai essaye de chercher ton chien mais je ne l'ai pas retrouve desole..."]
        ];

        this.pnj3.dialogue = [
            ["Tu cherches ton chien ?", "Cherche pas dans le parc, il n'y a rien d'interessant la-bas."], 
            ["J'ai beau y reflechir, je ne pense pas que ton chien soit dans le parc."]
        ];

        // ajout hitbox npc
        // etc

        

        // ----- ANIMATIONS -----

        // Animations personnages
        this.anims.create({
            key: 'idle_perso_droite',
            frames: this.anims.generateFrameNumbers('idlePersoDroite', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_perso_gauche',
            frames: this.anims.generateFrameNumbers('idlePersoGauche', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_perso_dos',
            frames: this.anims.generateFrameNumbers('idlePersoDos', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });


        // Animations pigeons
        this.anims.create({
            key: 'idle_pig_droite',
            frames: this.anims.generateFrameNumbers('idlePigeonDroite', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_pig_gauche',
            frames: this.anims.generateFrameNumbers('idlePigeonGauche', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });


        // Animations objets
        this.anims.create({
            key: 'cle_inventaire',
            frames: [{key: 'spr_cle', frame: 0}],
            frameRate: -1
        });

        this.anims.create({
            key: 'cle_ingame',
            frames: [{key: 'spr_cle', frame: 1}],
            frameRate: -1
        });
        


  
        // ----- CAMERA -----

        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 1600, 1600);
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);



        // ----- AFFICHAGE DE L'INTERFACE UTILISATEUR -----

        // Affichage de la jauge de fatigue et des differentes frames a afficher
        this.uiFatigue = this.physics.add.sprite(32, 16, 'spr_fatigue').setScrollFactor(0);

        this.anims.create({
            key: 'fatigue7',
            frames: [{key: 'uiFatigue', frame: 0}],
            frameRate: -1
        });

        this.anims.create({
            key: 'fatigue6',
            frames: [{key: 'uiFatigue', frame: 1}],
            frameRate: -1
        });

        this.anims.create({
            key: 'fatigue5',
            frames: [{key: 'uiFatigue', frame: 2}],
            frameRate: -1
        });

        this.anims.create({
            key: 'fatigue4',
            frames: [{key: 'uiFatigue', frame: 3}],
            frameRate: -1
        });

        this.anims.create({
            key: 'fatigue3',
            frames: [{key: 'uiFatigue', frame: 4}],
            frameRate: -1
        });

        this.anims.create({
            key: 'fatigue2',
            frames: [{key: 'uiFatigue', frame: 5}],
            frameRate: -1
        });

        this.anims.create({
            key: 'fatigue1',
            frames: [{key: 'uiFatigue', frame: 6}],
            frameRate: -1
        });

        this.anims.create({
            key: 'fatigue0',
            frames: [{key: 'uiFatigue', frame: 7}],
            frameRate: -1
        });


        

        // Affichage du nombre de croquettes

        // Affichage de l'inventaire si le joueur a l'objet
        this.inventaire = this.add.image(300, 650, "ui_inventaire");
        //#TODO: afficher les objets si le joueur les a deja (grace aux aCle, aCanne)

        // Affichage de la zone de dialogue
        this.boiteDialogue = this.add.image(220, 650, "ui_dialogue");
        this.boiteDialogue.setScrollFactor(0);

        this.texteDialogue = this.add.text(250, 700, "dialogue");
        this.texteDialogue.setScrollFactor(0);

        //#TODO: faire toutes les fonctions de dialogue dans update

    }


    update() {

        // ----- INTEGRATION DU GAMEPAD -----



        // Bouton d'interaction (E/Z)

        // Controles du joueur + canne

        // Freeze des deplacements et actions si le dialogue est actif

        // Systeme de dialogue

        // Update de l'ui (objets/ croquettes/ fatigue)

        // changement de scene
        /*sceneParc(player) {
            this.scene.start("parc_scene", {
                x: 0,
                y: 0
            });
        }*/

        // interaction avec les pnj
        //parlerNpc1(player, npc) {}
    }

}