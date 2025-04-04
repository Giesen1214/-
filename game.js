// 建立 Phaser 遊戲場景
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let platforms;

function preload() {
    this.load.image('background', 'assets/background.png');
    let graphics = this.add.graphics();
    this.load.image('platform', 'assets/platform.png');
    this.load.spritesheet('ninja', 'assets/ninja.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(4000, 4000, 'background');//整個視窗大小

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 500, 'platform');
    platforms.create(450, 500, 'platform');//左右上下
    platforms.create(500, 500, 'platform');
    platforms.create(550, 500, 'platform');
    platforms.create(600, 500, 'platform');
    platforms.create(650, 500, 'platform');
    platforms.create(700, 500, 'platform');//腳下的方塊
    platforms.create(750, 500, 'platform');
    platforms.create(800, 500, 'platform');
    platforms.create(850, 500, 'platform');
    platforms.create(900, 500, 'platform');
    platforms.create(950, 500, 'platform');
    player = this.physics.add.sprite(700, 450, 'ninja');//移動本身
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('ninja', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
    cursors = this.input.keyboard.createCursorKeys();
}
function update() {
    let isOnGround = player.body.onFloor();
    if (player.y >= config.height - player.height / 2) {
        window.location.href = "/Finish.html";
    }

    // 🔹 **左右移動**
    let moveSpeed = 0;
    if (cursors.left.isDown) {
        moveSpeed = -160;
        player.setVelocityX(moveSpeed);  // 設定水平移動速度

    } else if (cursors.right.isDown) {
        moveSpeed = 160;
        player.setVelocityX(moveSpeed);  // 設定水平移動速度

    } else {
        moveSpeed = 0;
        player.setVelocityX(moveSpeed);  // 設定水平移動速度
    }

    // // 🔹 **向上跳躍 & 斜向跳躍**
    if (cursors.up.isDown && isOnGround) {
        let jumpSpeed = -330; // 向上跳的力量
        let moveSpeed = 0;    // 水平移動的力量

        // 判斷是否按下左右鍵，並且加上相應的水平移動速度
        if (cursors.left.isDown) {
            moveSpeed = -100; // 向左上跳
        }
        if (cursors.right.isDown) {
            moveSpeed = 100; // 向右上跳
        }

        player.setVelocity(moveSpeed, jumpSpeed);
    }
}




//需要碰到底時重新開始
//所有方塊每3秒像下一個像下1格
// 上面繼續生成方塊方塊要在（最少右－右上,腳下方塊-左邊方塊)每3秒，生成一次
//新增圖片
//新增音效