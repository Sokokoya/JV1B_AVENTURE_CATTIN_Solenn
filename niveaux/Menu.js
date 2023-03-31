export default class Menu extends Phaser.Scene {

    constructor() {
        super({key : "Menu"});
    }


    preload() {

        this.load.image('image_menu', 'assets/image_menu.png');
    }

    create() {

        this.clavier = this.input.keyboard.createCursorKeys();

        this.add.image(540, 360, "image_menu");

        //this.add.text();
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
            //#TODO: changer ici pour mettre la scene de depart dans la maison du joueur
            this.scene.start("Ville", {
                x: 0,
                y: 0,
                fatigue: 5,
                croquettes: 0,
                aCanne: false,
                aCle: false
            });
        }
    }


}