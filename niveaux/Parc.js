/**
 * Parc.js --- Solenn Cattin --- JV1B
 * 
 * Fichier contenant la classe Parc, créant la scène du même nom.
*/

import Ennemi from '../Ennemi.js';
import Player from '../Player.js';

export default class Parc extends Phaser.Scene {

    constructor() {
        super({key: "Parc"});
    }

    // Initialisation de la scene après avoir changé de scène
    init(data) {
        this.posX = data.x;
        this.posY = data.y;
    }


    // -----------------------------------------------------------------------------------------
    // ---------------------------------- FONCTION PRELOAD -------------------------------------
    // -----------------------------------------------------------------------------------------

    preload() {
        // Tileset et map de la scène
        this.load.image('tileset_exterieur', 'assets/tileset_exterieur.png');
        this.load.tilemapTiledJSON('map_parc', 'assets/maps/map_parc.json');

        // Chargement du sprite de la petite fille
        this.load.spritesheet('spr_petite_fille', 'assets/spr_petite_fille.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('spr_pigeon', 'assets/spr_pigeon.png', {frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('spr_barriere', 'assets/spr_barriere.png', {frameWidth: 96, frameHeight: 32});
    }


    

    // -----------------------------------------------------------------------------------------
    // ----------------------------------- FONCTION CREATE -------------------------------------
    // -----------------------------------------------------------------------------------------

    create() {

        // ----- AFFICHAGE DE LA SCENE -----

        // Chargement des calques
        const gameMap = this.add.tilemap('map_parc');


        const gameTileset = gameMap.addTilesetImage(
            "tileset_exterieur",
            "tileset_exterieur"
        );

        const grassLayer = gameMap.createLayer(
            "herb",
            gameTileset
        );

        const pathLayer = gameMap.createLayer(
            "path",
            gameTileset
        );

        
        const collisionLayer = gameMap.createLayer(
            "collisions",
            gameTileset
        );

        const versVilleLayer = gameMap.createLayer(
            "versVille",
            gameTileset
        );

        const barriereLayer = gameMap.createLayer(
            "barriere",
            gameTileset
        );




        
        // ----- PROPRIETES DU JEU -----

        // Prise en charge des touches du clavier
        this.clavier = this.input.keyboard.createCursorKeys();
        
        // Ajout des collisions avec les calques, utilisation des propriétés propres aux calques
        collisionLayer.setCollisionByExclusion(-1, true);
        versVilleLayer.setCollisionByExclusion(-1, true);
        barriereLayer.setCollisionByExclusion(-1, true);


        
        // ----- AFFICHAGE ET PROPRIETES DU PERSONNAGE -----

        // Ajout du personnage dans le jeu
        this.player = new Player(this, this.posX, this.posY, 'heros_idle_droite');

        // Ajout des collisions entre le personnage et les objets / murs / sortie
        this.physics.add.collider(this.player, collisionLayer);
        this.physics.add.collider(this.player, barriereLayer);

        this.physics.add.collider(this.player, versVilleLayer, function() {
            console.log("vers ville");
            this.scene.start("Ville", {
                x: 1536,
                y: 208
            });
        }, null, this);



        // ----- AFFICHAGE DES ENNEMIS -----

        // La petite fille : le boss
        this.petite_fille = this.physics.add.sprite(272, 992, 'spr_petite_fille');


        // Les pigeons : les ennemis
        this.ennemis = this.physics.add.group();

        let coordoneesEnnemis = [
            {x: 8, y: 10}, {x: 9, y: 11}, {x: 18, y: 9},
            {x: 17, y: 11}, {x: 12, y: 15}, {x: 10, y: 16},
            {x: 20, y: 14}, {x: 22, y: 15}, {x: 21, y: 16},
            {x: 19, y: 16}, {x: 19, y: 17}, {x: 23, y: 17},
            {x: 22, y: 18}, {x: 28, y: 16}, {x: 29, y: 21},
            {x: 28, y: 25}, {x: 27, y: 29}, {x: 25, y: 29},
            {x: 24, y: 26}, {x: 22, y: 29}, {x: 21, y: 24},
            {x: 20, y: 27}, {x: 19, y: 25}, {x: 17, y: 25},
            {x: 15, y: 31}
        ];

        for (let i=1; i>=25; i++) {

            let posX = coordoneesEnnemis[i].x * 32;
            let posY = coordoneesEnnemis[i].y * 32;

            let ennemi = new Ennemi(this, posX, posY, 'spr_pigeon');

            this.ennemis.add(ennemi);
        }





        
        // ----- CAMERA -----

        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 1280, 1280);
        this.cameras.main.setBounds(0, 0, 1280, 1280);
        
        // Tracking de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
    }


    update() {

        this.player.updateMouvement();
    }

}