/**
 * Menu.js --- Solenn Cattin --- JV1B
 * 
 * Fichier comportant la classe Menu, affichant l'écran titre du jeu, et passant au premier niveau 
 * une fois que la touche espace est appuyée.
*/

export default class Menu extends Phaser.Scene {

    constructor() {
        super({key : "Menu"});
    }



    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        // Chargement de l'image du menu
        this.load.image('image_menu', 'assets/image_menu.png');
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        // Création de la variable clavier, permettant d'utiliser les touches de celui-ci
        this.clavier = this.input.keyboard.createCursorKeys();

        // Ajout de l'image du menu à l'écran
        this.add.image(540, 360, "image_menu");
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    update() {

        // Changement vers la scène "MaisonJoueur" dès que le joueur appuie sur espace
        if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
            
            this.scene.start("MaisonJoueur", {
                x: 448,
                y: 432
            });
        }
    }


}