/**
 * Croquette.js --- Solenn Cattin --- JV1B
 * 
 * Classe permettant de gérer les entités "croquettes"
*/

import Player from '/Player.js';

export default class Croquette extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();
        

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);

    }



    // ----- ANIMATIONS -----
    animateCroquette() {

    }


    // ----- DESTRUCTION D'UNE CROQUETTE -----
    destroyCroquette(player) {
        player.updateCroquette();

        this.destroy();
    }

}