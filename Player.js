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


    // ----- DEPLACEMENT DU JOUEUR -----
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


    // ----- UPDATE DU NOMBRE DE CROQUETTES DU JOUEUR -----
    ajoutCroquette() {

        window.valeurs.nbCroquettes += 1;
    }


    /*attaque() {
        //#TODO: animation canne

        //#TODO: animation pigeon s'envole

        window.valeurs.fatigue -= 1;


    }*/


    /*
    updateUI(croquette, fatigue) {

        // ----- ANIMATIONS -----

        // Croquette
        this.anims.create({
            key: 'croquette0',
            frames: [{ key: 'uiCroquette', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette1',
            frames: [{ key: 'uiCroquette', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette2',
            frames: [{ key: 'uiCroquette', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette3',
            frames: [{ key: 'uiCroquette', frame: 3 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette4',
            frames: [{ key: 'uiCroquette', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'croquette5',
            frames: [{ key: 'uiCroquette', frame: 4 }],
            frameRate: 20
        });


        // Fatigue
        this.anims.create({
            key: 'fatigue7',
            frames: [{ key: 'ui_fatigue', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue6',
            frames: [{ key: 'ui_fatigue', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue5',
            frames: [{ key: 'ui_fatigue', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue4',
            frames: [{ key: 'ui_fatigue', frame: 3 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue3',
            frames: [{ key: 'ui_fatigue', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue2',
            frames: [{ key: 'ui_fatigue', frame: 5 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue1',
            frames: [{ key: 'ui_fatigue', frame: 6 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fatigue0',
            frames: [{ key: 'ui_fatigue', frame: 7 }],
            frameRate: 20
        });


        croquette.play('croquette0');
        fatigue.play('fatigue7');

        if (window.valeurs.nbCroquettes == 1) {
            croquette.play('croquette1');
        }
    }*/

}