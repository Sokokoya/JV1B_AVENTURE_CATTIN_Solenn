export default class Ennemi extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.collideWorldBounds(true);     
        
        
        this.isExisting = true;
    }


    // Fonction jouant les animations de l'ennemi selon son statut
    animate() {
        // toutes les animations

        // s'il se fait attaquer
    }


    // Fonction faisant en sorte que le joueur suive l'ennemi, qui se fait ralentir
    follow(player) {
        while (this.isExisting == true) {
            // suit le joueur
            // lui enleve de la vitesse
        }
        // quand il n'existe plus, le joueur reprend sa vitesse initiale

    }


    // Fonction faisant disparaitre le sprite
    goAway() {
        // enlever le sprite
        this.isExisting = false;
    }

}