var config = {
    type: Phaser.AUTO,
    width: 1720,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors;
var kiki;
var lala;
var star;
var score = 0;
var scoreText;

function preload ()
{
    this.load.image('bg','assets/images/BACKGROUND.png');
    this.load.image('lala','assets/images/LALA.png');
    this.load.image('kiki','assets/images/KIKI.png');
    this.load.image('star','assets/images/STAR.png');
}

function create ()
{
    var lalaX = 0;
    var lalaY = this.sys.game.config.height;

    this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

    var backgroundImage = this.add.image(0, 0, 'bg').setOrigin(0, 0);
    backgroundImage.setScale(
        this.sys.game.config.width / backgroundImage.width,
        this.sys.game.config.height / backgroundImage.height
    );

    lala = this.physics.add.sprite(lalaX, lalaY, 'lala').setOrigin(0, 1);
    lala.setCollideWorldBounds(true);

    cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    var kikiX = this.sys.game.config.width;
    var kikiY = this.sys.game.config.height;
    kiki = this.add.image(kikiX, kikiY, 'kiki').setOrigin(1, 1);

    var starX = (lalaX + kikiX) / 2;
    var starY = lalaY - 50;
    star = this.add.sprite(starX, starY, 'star').setOrigin(0.5, 1);
    var scaleFactor = 0.3;
    star.setScale(scaleFactor);

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#AA336A' });
}

function update ()
{
    if (cursors.left.isDown) {
        lala.x -= 5;
    } else if (cursors.right.isDown) {
        lala.x += 5;
    }

    if (cursors.up.isDown) {
        lala.y -= 5;
    } else if (cursors.down.isDown) {
        lala.y += 5;
    }

    if (Phaser.Geom.Intersects.RectangleToRectangle(lala.getBounds(), star.getBounds())) {
        star.destroy();
        score = 10;
        scoreText.setText('Score: ' + score);
    }

    if (Phaser.Geom.Intersects.RectangleToRectangle(lala.getBounds(), kiki.getBounds())) {
        if (window.confirm("Congratulations! You reached Kiki! Do you want to play again?")) {
            this.scene.restart();
        }
    }
}
