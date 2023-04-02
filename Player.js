export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.collideWorldBounds(true);

        
    }

    //#TODO: rajouter la fatigue de mon personnage
    //#TODO: rajouter l'attaque de mon personnage, lui enlevant un point de fatigue, s'il est a zero, il meurt et se reveille dans sa maison (avec tous ses objets)

    
    updateMouvement() {

        // ----- CREATION DU DEPLACEMENT DU JOUEUR -----

        var deplacement = new Phaser.Math.Vector2(0, 0);
        //#TODO: a tester et a changer
        var vitesseJoueur = 10;

        // Si le joueur se déplace vers la gauche et vers la droite
        if (this.clavier.left.isDown) {

            deplacement.x = -1;
            this.direction = "gauche";
            this.face = "gauche";


        } else if (this.clavier.right.isDown) {
            
            deplacement.x = 1;
            this.direction = "droite";
            this.face = "droite";

        // S'il ne se déplace pas, on joue l'idle en fonction de son dernier mouvement
        } else {
            deplacement.x = 0;

            if (this.face == "gauche") {
                this.anims.play("perso_idle_gauche");

            } else if (this.face == "droite") {
                this.anims.play("perso_idle_droite");
            }

        }

        // Si le joueur se déplace de haut en bas
        if (this.clavier.up.isDown) {

            deplacement.y = -1;
            this.direction = "haut";
            this.face = "haut";


        } else if (this.clavier.down.isDown) {

            deplacement.y = 1;
            this.direction = "bas";
            this.face = "bas";

        // S'il ne se déplace pas, on joue l'idle en fonction de son dernier mouvement
        } else {

            deplacement.y = 0;

            //#TODO: jouter les anims idle haut et bas
        }


        deplacement.normalize();
        this.setVelocity(deplacement.x * vitesseJoueur, deplacement.y * vitesseJoueur);

        // Arrondi des coordonées de déplacement à l'entier le plus proche
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        //#TODO: Ajout de toutes les animations de mouvement
    }

    updateFatigue() {
        if (window.fatigue >= 7) {
            uiFatigue.anims.play('fatigue7', true);

        } else if (window.fatigue == 6) {
            uiFatigue.anims.play('fatigue6', true);

        } else if (window.fatigue == 5) {
            uiFatigue.anims.play('fatigue5', true);

        } else if (window.fatigue == 4) {
            uiFatigue.anims.play('fatigue4', true);

        } else if (window.fatigue == 3) {
            uiFatigue.anims.play('fatigue3', true);

        } else if (window.fatigue == 2) {
            uiFatigue.anims.play('fatigue2', true);

        } else if (window.fatigue == 1) {
            uiFatigue.anims.play('fatigue1', true);

        // Si le joueur tombe de fatigue
        } else if (window.fatigue == 0) {
            uiFatigue.anims.play('fatigue0', true);

            //#TODO: mettre une animation ou le personnage tombe
            setTimeout(function() {
                location.reload();
            }, 450);

            this.physics.pause();
            this.player.setTint(0xff0000);
        }
    }

    updateCroquette() {
        window.croquettes += 1;
        // ajouter une croquette a l'ui

    }

    coupDeCanne(ennemi) {
        if (window.aCanne == true) {

            console.log("coup de canne => fatigue -1");

            window.fatigue -= 1;
            this.updateFatigue();
    
            
            // frame invulnerabilité + count down pour le coup de canne
    
            // si un ennemi se fait toucher par la canne
            ennemi.goAway();
        }  
    }


    trouveCanne() {
        window.aCanne = true;
        // rajoute la canne dans l'ineventaire
    }

    trouveCle() {
        window.aCle = true;
        // rajouter la clé dans l'inventaire
    }

}