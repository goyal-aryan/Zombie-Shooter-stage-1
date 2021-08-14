var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombieAnimation;
var zombie
var bulletImage, bullet;
var invisibleGround, invisibleGround2, invisibleGround3, invisibleGround4;
var explosion;
var heartImage, heart;


function preload() {

    shooterImg = loadImage("assets/shooter_2.png")
    shooter_shooting = loadImage("assets/shooter_3.png")
        //zombieAnimation = loadImage("assets/zombieKnife.gif")
    bulletImage = loadImage("assets/bullets.png")
    heartImage = loadImage("assets/heart_1.png")

    bgImg = loadImage("assets/bg.jpeg")
    explosion = loadSound("assets/gunShot.mp3")

}

function setup() {


    createCanvas(windowWidth, windowHeight);

    //adding the background image
    bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
    bg.addImage(bgImg)
    bg.scale = 1.1

    // zombie = createSprite(800, 200, 10, 10)
    // zombie.addImage(zombieAnimation);


    //creating the player sprite
    player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
    player.addImage(shooterImg);
    player.scale = 0.3;
    player.setCollider("rectangle", 0, 0, 300, 450);

    invisibleGround = createSprite(windowWidth / 2, windowHeight - 700, windowWidth, 10)
    invisibleGround.visible = false;

    invisibleGround2 = createSprite(windowWidth / 2, windowHeight - 100, windowWidth, 10)
    invisibleGround2.visible = false;

    invisibleGround3 = createSprite(windowWidth - 1500, windowHeight / 2, 10, windowHeight)
    invisibleGround3.visible = false;

    invisibleGround4 = createSprite(windowWidth - 800, windowHeight / 2, 10, windowHeight)
    invisibleGround4.visible = false;

    heart = createSprite(windowWidth - 1440, windowHeight - 700, 10, 10)
    heart.scale = 0.5;
    heart.addImage(heartImage)

    bulletGroup = createGroup();

}

function draw() {
    background(0);

    player.collide(invisibleGround)
    player.collide(invisibleGround2)
    player.collide(invisibleGround3)
    player.collide(invisibleGround4)

    //moving the player up and down and making the game mobile compatible using touches
    if (keyDown("UP_ARROW") || touches.length > 0) {
        player.y = player.y - 30
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
        player.y = player.y + 30
    }

    if (keyDown("RIGHT_ARROW")) {
        player.x = player.x + 10
        player.y = player.y - 3
    }

    if (keyDown("LEFT_ARROW")) {
        player.x = player.x - 10
        player.y = player.y + 3
    }


    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {

        player.addImage(shooter_shooting)
        shootBullet()
        explosion.play();

    }

    //player goes back to original standing image once we stop pressing the space bar
    else if (keyWentUp("space")) {
        player.addImage(shooterImg)
    }

    drawSprites();

}

function shootBullet() {
    bullet = createSprite(player.position.x, player.position.y - 25, 50, 20)
    bullet.addImage(bulletImage)
    bullet.scale = 0.05
    bullet.velocityX = 20
    bullet.lifetime = windowWidth / 20
    bulletGroup.add(bullet)
}