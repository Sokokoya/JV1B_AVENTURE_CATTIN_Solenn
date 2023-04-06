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

        this.attaque();
        
  
    }


    // ----- DEPLACEMENT DU JOUEUR -----
    updateMouvement() {

        this.deplacement = new Phaser.Math.Vector2(0, 0);

        // Contôles du joueur horizontalement
        if (this.clavier.left.isDown) {
            this.deplacement.x = -1;

            this.direction = "gauche";

        } else if (this.clavier.right.isDown) {
            this.deplacement.x = 1;

            this.direction = "droite";

        } else {
            this.deplacement.x = 0;
        }

        // Contrôles du joueur verticalement
        if (this.clavier.up.isDown) {
            this.deplacement.y = -1;

            this.direction = "haut";

        } else if (this.clavier.down.isDown) {
            this.deplacement.y = 1;

            this.direction = "bas";

        } else {
            this.deplacement.y = 0;
        }

        this.deplacement.normalize();
        this.setVelocity(this.deplacement.x * window.valeurs.vitesse, this.deplacement.y * window.valeurs.vitesse);

        // Arrondi des coordonées de déplacement à l'entier le plus proche
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        window.valeurs.posX =this.x;
        window.valeurs.posY =this.y;

    }


    // ----- UPDATE DU NOMBRE DE CROQUETTES DU JOUEUR -----
    ajoutCroquette() {

        window.valeurs.nbCroquettes += 1;
    }



    // ----- ATTAQUE DU JOUEUR -----
    attaque() {

        this.anims.create({
            key: 'attaque_bas',
            frames: this.anims.generateFrameNumbers('spr_attaque', {start: 1, end: 3}),
            frameRate: 12,
            repeat: 0
        })

        this.anims.create({
            key: 'attaque_droite',
            frames: this.anims.generateFrameNumbers('spr_attaque', {start: 4, end: 6}),
            frameRate: 12,
            repeat: 0
        })

        this.anims.create({
            key: 'attaque_haut',
            frames: this.anims.generateFrameNumbers('spr_attaque', {start: 7, end: 9}),
            frameRate: 12,
            repeat: 0
        })

        this.anims.create({
            key: 'attaque_gauche',
            frames: this.anims.generateFrameNumbers('spr_attaque', {start: 10, end: 12}),
            frameRate: 12,
            repeat: 0
        })

        this.anims.create({
            key: "attaque_nulle",
            frames: [{ key: 'spr_attaque', frame: 0 }],
            frameRate: 20
        })

        
        if (Phaser.Input.Keyboard.JustDown(Phaser.Input.Keyboard.KeyCodes.Z)) {

            if (!window.valeurs.invincible) {
                window.valeurs.invincible = true;


                if (this.direction == "bas") {
                    this.scene.attaque.anims.play("attaque_bas");

                } else if (this.direction == "droite") {
                    this.scene.attaque.anims.play("attaque_droite");

                } else if (this.direction == "haut") {
                    this.scene.attaque.anims.play("attaque_haut");

                } else if (this.direction == "gauche") {
                    this.scene.attaque.anims.play("attaque_gauche");
                }

                setTimeout(function() {
                    window.valeurs.invincible = false;
                }, 300);
            }
            
        } 

    }



}