export default class ville_scene extends Phaser.Scene {

    constructor() {
        super({key : "ville_scene"});
    }

    // Initialisation de la scene après avoir changé de scène
 /*   init(data) {

        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y; 
    
    }*/


    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------
    preload() {

        // Tileset et map
        this.load.image('tileset', 'assets/tileset_exterieur.png');
        this.load.tilemapTiledJSON('map', 'assets/map_1.json');

        // Interface

        // Heros et ennemis
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

        const detailsLayer = gameMap.createLayer(
            "details",
            gameTileset
        );

        

        

        

/*
        // E pour interagir avec quelqu'un, Z pour utiliser la canne
        this.keyE = this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        // Integrer map et tileset, puis les calques de plateformes

        // collisions avec tileset


        // ----- JOUEUR -----
        this.player = this.physics.add.sprite(this.positionX, this.positionY, 'sprite_personnage');

        // ----- PERSONNAGES NON JOUEURS -----
        this.npcs = this.physics.add.group();
        this.npc1 = this.npcs.create(600, 1200, 'sprite_npc1');
        // etc

        // Objets possedes par le joueur
        this.player.canne = this.canneData;
        this.player.croquettes = this.croquettesData;
        this.player.cles = this.clesData;

        // ----- OBJETS -----

        // ----- ANIMATIONS -----
        // Animations personnages
        // Animations pigeons

        // ----- COLLIDERS -----
        // Avec la map
        // Avec les objets
        // Avec les pnj

        // ----- CAMERA -----

        // ----- DIALOGUES -----
        this.npc1.dialogue = [["blabla1","blabla2"], ["blabla3"]];
        // ajout hitbox npc


        // ----- INTERFACE UTILISATEUR -----
*/

    }


    update() {

        // Bouton d'interaction (E/Z)

        // Controles du joueur + canne

        // Freeze des deplacements et actions si le dialogue est actif

        // Susteme de dialogue

        // Update de l'ui (objets/ croquettes/ fatigue)

        // changement de scene
        /*sceneParc(player) {
            this.scene.start("parc_scene", {
                x = 0,
                y = 0
            });
        }*/

        // interaction avec les pnj
        //parlerNpc1(player, npc) {}
    }

}