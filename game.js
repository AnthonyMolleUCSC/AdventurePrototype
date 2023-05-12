class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "You wake in a dark room...");
    }

    onEnter() {

        this.setBG("#240200");
        let clip = this.add.text(this.w * 0.7, this.w * 0.1, "🥩")
            .setFontSize(this.s * 15)
            .setInteractive()
            .on('pointerover', () => this.showMessage("There's some kind of wall here..."))
            .on('pointerdown', () => {
                this.showMessage("*squish*");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

            clip.alpha = 0.2;
            clip.angle = 90;

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🔥")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There seems to be something bright in the distance...");
            })
            .on('pointerdown', () => {
                    this.showMessage("You shine your torch around the room...");
                    this.gainItem("Torch");
                    this.gotoScene('demo2');
            })
            door.alpha = 0.5
    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The room brightens. You find yourself in a storage room.");
    }
    onEnter() {
        this.setBG("#b00e11");

        let door = this.add.text(this.w * -0.2, this.h * 0.2, "🚪")
            .setFontSize(this.s * 40);
        let lock = this.add.text(this.w * 0.05, this.h * 0.4, "🔒")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Hammer"))
                {
                    this.showMessage("Perhaps you could smash the lock?")
                }
                else
                {
                    this.showMessage("You seem to be locked in here.");
                }
            })
            .on('pointerdown', () => {

                    this.showMessage("You shine your torch around the room...");
                    this.gotoScene('demo2');
            })
            
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

