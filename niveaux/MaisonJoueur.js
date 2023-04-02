export default class MaisonJoueur extends Phaser.Scene {

    constructor() {
        super("MaisonJoueur");
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
        // ici preloead toutes les spritesheet, images et tileset
        this.load.image('tileset', 'assets/tileset_interieur.png');
        this.preload.tilemapTiledJSON('map', 'assets/map_5.json');
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------
    
    create() {

        // Tableau contenant tous les dialogues du joueur
        this.player.dialogue = [
            ["Angie ?", "Angie !??", "ANGIE !!!????", "(ou est-ce qu'elle peut bien etre ? je devrais aller voir dehors si quelqu'un l'a vue.)"]    
        ];
    }


    update() {

    }

}