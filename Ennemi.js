export default class Ennemi extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.world.enable(this);
        scene.add.existing(this);
  

        this.fuiteEnnemi();
        
    }


    overlapPlayer() {
        // quand les ennemis se collent au joueur, le joueur perd de la vitesse
    }

    fuiteEnnemi() {
        // animation fuite
    }


    update() {
        const player = this.scene.player;
        const ennemis = this.scene.ennemis.getChildren();
    }


}