export default class foret_scene extends Phaser.Scene {

    constructor() {
        super({key : "foret_scene"});
    }

    // Initialisation de la scene après avoir changé de scène
 /*   init(data) {

        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y; 
    
    }*/

    preload() {
        // ici preloead toutes les spritesheet, images et tileset
        this.load.image('tileset', 'assets/tileset_foret.png');
        this.load.tilemapTiledJSON('map', 'assets/map_3.json');
    }


    create() {

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map');

        const gameTileset = gameMap.addTilesetImage(
            "tileset_foret",
            "tileset"
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

        


    }


    update() {

    }

}