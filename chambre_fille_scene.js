class chambre_fille_scene extends Phaser.Scene {

    constructor() {
        super("chambre_fille_scene");
    }

    // Initialisation de la scene après avoir changé de scène
    init(data) {

        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y; 
    
    }

    preload() {
        // ici preloead toutes les spritesheet, images et tileset
    }


    create() {

    }


    update() {

    }

}