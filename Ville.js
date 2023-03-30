class Ville extends Phaser.Scene {

    constructor() {
        super("Ville");
    }

    // Initialisation de la scene après avoir changé de scène
    init(data) {

        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y; 

        // Donnees du personnage au debut de la scene
        this.fatigue = data.fatigue;
        this.croquettes = data.croquettes;
        this.aCanne = data.aCanne;
        this.aCle = data.aCle;
   
    }


    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------
    preload() {

        // Tileset et map
        this.preload.image('tileset', 'assets/tileset_exterieur.png');
        this.preload.tilemapTiledJSON('map', 'assets/map_1.json');

        // Interface
        this.load.spritesheet('spr_fatigue', 'assets/spr_fatigue.png', {frameWidth: 64, frameHeight: 32});

        // Chargement de tous les sprite du joueur
        this.load.spritesheet('idlePersoDroite', 'assets/spr_idle_perso_droite.png', {frameWidth: 64, frameHeight: 96});
        this.load.spritesheet('idlePersoGauche', 'assets/spr_idle_perso_gauche.png', {frameWidth: 64, frameHeight: 96});
        this.load.spritesheet('idlePersoDos', 'assets/spr_idle_perso_dos.png', {frameWidth: 64, frameHeight: 96});


        // Chargement de tous les sprite ennemis
        this.load.spritesheet('idlePigeonDroite', 'assets/spr_idle_pig_droite.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('idlePigeonGauche', 'assets/spr_idle_pig_gauche.png', {frameWidth: 32, frameHeight: 32});

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

        const houseLayer = gameMap.createLayer(
            "maisons",
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

        const grassLayer = gameMap.createLayer(
            "herbe",
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
        this.player = this.physics.add.sprite(this.positionX, this.positionY, 'spr_personnage');

        // Prporiétés du joueur
        this.player.speed = 500;

        this.player.fatigue = this.fatigue;
        this.player.croquettes = this.croquettes;
        this.player.aCanne = this.aCanne;
        this.player.aCle = this. aCle;

        // ----- AJOUT DES ENNEMIS ET DES OBJETS -----

        // ----- AJOUT DES PERSONNAGES NON JOUEURS -----

        this.pnj = this.physics.add.group();
        this.pnj1 = this.pnj.create(0, 0, 'spr_pnj1');


        // ----- COLLIDERS -----
        // Avec la map
        // Avec les objets
        // Avec les pnj


        // ----- DIALOGUES ENTRE LE JOUEUR ET LES PNJ -----

        this.dialogue = false;
        this.dialogueCourant = ["", ""];

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
            frameRate: 1
        });

        this.anims.create({
            key: 'fatigue6',
            frames: [{key: 'uiFatigue', frame: 1}],
            frameRate: 1
        });

        this.anims.create({
            key: 'fatigue5',
            frames: [{key: 'uiFatigue', frame: 2}],
            frameRate: 1
        });

        this.anims.create({
            key: 'fatigue4',
            frames: [{key: 'uiFatigue', frame: 3}],
            frameRate: 1
        });

        this.anims.create({
            key: 'fatigue3',
            frames: [{key: 'uiFatigue', frame: 4}],
            frameRate: 1
        });

        this.anims.create({
            key: 'fatigue2',
            frames: [{key: 'uiFatigue', frame: 5}],
            frameRate: 1
        });

        this.anims.create({
            key: 'fatigue1',
            frames: [{key: 'uiFatigue', frame: 6}],
            frameRate: 1
        });

        this.anims.create({
            key: 'fatigue0',
            frames: [{key: 'uiFatigue', frame: 7}],
            frameRate: 1
        });

        // Affichage du nombre de croquettes
        // Affichage de l'inventaire si le joueur a l'objet
        // Affichage de la zone de dialogue

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