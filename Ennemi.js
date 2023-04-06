/**
 * Ennemi.js --- Solenn Cattin --- JV1B
 * 
 * Classe comprenant toutes les méthodes liées aux ennemis
*/

export default class Ennemi extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.world.enable(this);
        scene.add.existing(this);
  

        
    }


    overlapPlayer(player) {
        // quand les ennemis se collent au joueur, le joueur perd de la vitesse

        
    }

    


    update() {
        const player = this.scene.player;
        const ennemis = this.scene.ennemis.getChildren();

        if (window.valeurs.attaque) {
            this.destroy()
        }

        setTimeout(function() {
            window.valeurs.attaque = false;
        }, 500);
    }


}