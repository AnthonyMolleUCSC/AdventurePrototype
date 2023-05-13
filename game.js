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
                if (this.hasItem("Hammer"))
                {
                    this.showMessage("You smash the lock and rush out of the room!");
                    this.gotoScene('cultroom');
                }
                else
                {
                    this.showMessage("Nothing happens.")
                }
            })
        let hammer = this.add.text(this.w * 0.6, this.w * 0.45, "🔨")
            .setFontSize(this.s * 20)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a hammer.");
            })
            .on('pointerdown', () => {
                    this.showMessage("You got a hammer.");
                    this.gainItem("Hammer");
                    this.tweens.add({
                        targets: hammer,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => hammer.destroy()
                    });
            })
            hammer.angle = 135;
    }
}

class CultRoom extends AdventureScene {
    constructor() {
        super("cultroom", "You're surrounded by cultists trying to get you!");
    }
    
    onEnter() {
        this.setBG("#b00e11");
        this.spawnCultist(100, 123);
        this.spawnCultist(745, 220);
        this.spawnCultist(200, 632);
        this.spawnCultist(600, 450);
        this.spawnCultist(1000, 700);
    }
}

class WhaleMouth extends AdventureScene {
    constructor() {
        super("whalemouth", "You are confronted with a massive maw...");
    }
    onEnter() {
        this.open = false;
        this.setBG("#a3051a");
        let teeth1 = this.add.text(this.w * 0.06, this.h * 0.25, "🦷🦷🦷🦷🦷🦷🦷🦷🦷🦷🦷")
            .setFontSize(this.s * 4.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Them some big chompers!!!");
            });

        let teeth2 = this.add.text(this.w * 0.70, this.h * 0.40, "🦷🦷🦷🦷🦷🦷🦷🦷🦷🦷🦷")
            .setFontSize(this.s * 4.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Them some big chompers!!!");
            });
            teeth2.angle = 180;

        let boat = this.add.text(this.w * 0.1, this.h * 0.70, "🛶")
            .setFontSize(this.s * 8)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There's a boat! Escape at last!");
            })
            .on('pointerdown', () =>
            {
                if (this.open == true)
                {
                    this.showMessage("Finally we can get out of here!");
                    this.gotoScene("outro");
                }
                else
                {
                    this.showMessage("But the mouth is still closed...");
                }
            });

        let scroll = this.add.text(this.w * .5, this.h * 0.60, "📜")
            .setFontSize(this.s * 8)
            .setInteractive()
            .on('pointerover', () => 
            {
                this.showMessage("Some strange ancient scribblings...");
            })
            .on('pointerdown', () =>
            {
                this.showMessage("The Staff bursts, and the maw opens...");
                this.loseItem("Staff");

                this.tweens.add({
                    targets: teeth1,
                    y: 100,
                    duration: 1500,
                });
                
                this.tweens.add({
                    targets: teeth2,
                    y: 600,
                    duration: 1500,
                    onComplete: () => 
                    {
                        this.open = true;
                    }
                }
                )
            })
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "You've forgotten the past who knows how many hours...").setFontSize(50);
        this.add.text(50,100, "Push forward into the darkness...\n(Click anywhere to begin)").setFontSize(35);
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
        this.add.text(50, 50, "You escaped the cult in the mouth of a whale.").setFontSize(50);
        this.add.text(50, 100, "You go home changed...\n(Click anywhere to restart)").setFontSize(35);
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
    scene: [Intro, Demo1, Demo2, CultRoom, WhaleMouth, Outro],
    title: "Adventure Game",
});

