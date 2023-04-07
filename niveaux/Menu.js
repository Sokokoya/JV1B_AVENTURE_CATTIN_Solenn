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

        // Chargement de tous les sprite UI
        this.load.spritesheet('ui_croquette', 'assets/ui_croquette.png', {frameWidth: 64, frameHeight: 32});
        this.load.spritesheet('ui_inventaire', 'assets/ui_boite_inventaire.png', {frameWidth: 64, frameHeight: 160});
        this.load.spritesheet('ui_dialogue', 'assets/ui_boite_dialogue.png', {frameWidth: 608, frameHeight: 192});
        this.load.spritesheet('ui_fatigue', 'assets/ui_fatigue.png', {frameWidth: 64, frameHeight: 32});
        this.load.spritesheet('ui_cadre', 'assets/ui_cadre.png', {frameWidth: 1024, frameHeight: 64});
        this.load.spritesheet('ui_bouton_e', 'assets/ui_bouton_e.png', {frameWidth: 32, frameHeight: 32});


        this.load.spritesheet('spr_attaque', 'assets/spr_attaque.png', {frameWidth: 64, frameHeight: 64});


        // Chargement de toutes les images de dialogue
        this.load.image('dial_grandMere_1', 'assets/dialogues/dial_grandMere_1.png');
        this.load.image('dial_grandMere_2', 'assets/dialogues/dial_grandMere_2.png');
        this.load.image('dial_grandMere_3', 'assets/dialogues/dial_grandMere_3.png');
        this.load.image('dial_grandMere_4', 'assets/dialogues/dial_grandMere_4.png');
        this.load.image('dial_grandMere_5', 'assets/dialogues/dial_grandMere_5.png');
        this.load.image('dial_grandMere_6', 'assets/dialogues/dial_grandMere_6.png');

        this.load.image('dial_petiteFille_1', 'assets/dialogues/dial_petiteFille_1.png');
        this.load.image('dial_petiteFille_2', 'assets/dialogues/dial_petiteFille_2.png');
        this.load.image('dial_petiteFille_3', 'assets/dialogues/dial_petiteFille_3.png');
        this.load.image('dial_petiteFille_4', 'assets/dialogues/dial_petiteFille_4.png');

        this.load.image('dial_pnjMaison_1', 'assets/dialogues/dial_pnjMaison_1.png');
        this.load.image('dial_pnjMaison_2', 'assets/dialogues/dial_pnjMaison_2.png');
        this.load.image('dial_pnjParc_1', 'assets/dialogues/dial_pnjParc_1.png');
        this.load.image('dial_pnjParc_2', 'assets/dialogues/dial_pnjParc_2.png');
        this.load.image('dial_pnjParc_3', 'assets/dialogues/dial_pnjParc_3.png');
        this.load.image('dial_pnjParc_4', 'assets/dialogues/dial_pnjParc_4.png');
        this.load.image('dial_pnjRiviere_1', 'assets/dialogues/dial_pnjRiviere_1.png');
        this.load.image('dial_pnjRiviere_2', 'assets/dialogues/dial_pnjRiviere_2.png');
        this.load.image('dial_pnjRiviere_3', 'assets/dialogues/dial_pnjRiviere_3.png');
        
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