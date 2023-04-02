export default class Menu extends Phaser.Scene {

    constructor() {
        super({key : "Menu"});
    }


    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {

        this.load.image('image_menu', 'assets/image_menu.png');
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        this.clavier = this.input.keyboard.createCursorKeys();

        this.add.image(540, 360, "image_menu");
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
            //#TODO: changer ici pour mettre la scene de depart dans la maison du joueur puis les bonnes coordonees
            this.scene.start("Ville", {
                x: 0,
                y: 0
            });
        }
    }


}