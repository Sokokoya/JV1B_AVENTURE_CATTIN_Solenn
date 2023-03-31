export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.clavier = scene.input.keyboard.creatCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.collideWorldBounds(true);

        
    }

    //#TODO: rajouter la fatigue de mon personnage
    //#TODO: rajouter l'attaque de mon personnage, lui enlevant un point de fatigue, s'il est a zero, il meurt et se reveille dans sa maison (avec tous ses objets)

    
    update() {

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



}