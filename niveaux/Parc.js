export default class Parc extends Phaser.Scene {

    constructor() {
        super("Parc");
    }

    // Initialisation de la scene après avoir changé de scène
    init(data) {
        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y; 
    
    }


    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        // Chargement de la carte de jeu
        this.load.tilemapTiledJSON('map', 'assets/map_2.json');

        //#TODO: faire spritesheet petite fille et chien
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



        // ----- CREATION DU JOUEUR ET DE SES PROPRIETES -----

        // Ajout du sprite joueur
        this.player = new Player(this.positionX, this.positionY, 'spr_personnage');

    }


    update() {

    }

}