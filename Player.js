/**
 * Player.js --- Solenn Cattin --- JV1B
 * 
 * Classe comprenant toutes les méthodes liées au joueur
*/

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

        
  
    }

    updateMouvement() {

        this.deplacement = new Phaser.Math.Vector2(0, 0);

        // Contôles du joueur horizontalement
        if (this.clavier.left.isDown) {
            this.deplacement.x = -1;

        } else if (this.clavier.right.isDown) {
            this.deplacement.x = 1;

        } else {
            this.deplacement.x = 0;
        }

        // Contrôles du joueur verticalement
        if (this.clavier.up.isDown) {
            this.deplacement.y = -1;

        } else if (this.clavier.down.isDown) {
            this.deplacement.y = 1;

        } else {
            this.deplacement.y = 0;
        }

        this.deplacement.normalize();
        this.setVelocity(this.deplacement.x * window.valeurs.vitesse, this.deplacement.y * window.valeurs.vitesse);

        // Arrondi des coordonées de déplacement à l'entier le plus proche
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);


    }
    

}