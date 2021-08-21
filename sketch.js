var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie1, zombie2, zombie3, zombie4, zombie5;
var zombieImage, zombieImage2, zombieImage3, zombieImage4, zombieImage5;
var rightzombieImage;
var bulletImage, bullet;
var invisibleGround, invisibleGround2, invisibleGround3, invisibleGround4;
var explosion;
var heartImage, heart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;


function preload() {

    shooterImg = loadImage("assets/shooter_2.png")
    shooter_shooting = loadImage("assets/shooter_3.png")
    bulletImage = loadImage("assets/bullets.png")
    heartImage = loadImage("assets/heart_1.png")
    zombieImage = loadImage("assets/zombie.png")
    rightzombieImage = loadImage("assets/rightzombie.png")
        // zombieImage2 = loadImage("")
        // zombieImage3 = loadImage("")
        // zombieImage4 = loadImage("")
        // zombieImage5 = loadImage("")

    bgImg = loadImage("assets/bg.jpeg")
    explosion = loadSound("assets/GunShot.mp3")

}

function setup() {


    createCanvas(windowWidth, windowHeight);

    //adding the background image
    bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
    bg.addImage(bgImg)
    bg.scale = 1.1


    //creating the player sprite
    player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
    player.addImage(shooterImg);
    player.scale = 0.3;
    player.setCollider("rectangle", 0, 0, 300, 450);

    topGround = createSprite(windowWidth / 2, windowHeight - 700, windowWidth, 10)
    topGround.visible = false;

    bottomGround = createSprite(windowWidth / 2, windowHeight - 100, windowWidth, 10)
    bottomGround.visible = false;

    leftGround = createSprite(windowWidth - 1500, windowHeight / 2, 10, windowHeight)
    leftGround.visible = true;

    rightGround = createSprite(windowWidth - 800, windowHeight / 2, 10, windowHeight)
    rightGround.visible = false;

    mostRightGround = createSprite(windowWidth - 100, windowHeight / 2, 10, windowHeight)
    mostRightGround.visible = false;

    heart = createSprite(windowWidth - 1440, windowHeight - 700, 10, 10)
    heart.scale = 0.5;
    heart.addImage(heartImage)

    bulletGroup = createGroup();

    spawnZombies()
    zombie.addImage("left", zombieImage);
    zombie.addImage("right", rightzombieImage)



}

function draw() {
    background(0);

    //if (gameState === PLAY) {
    player.collide(topGround)
    player.collide(bottomGround)
    player.collide(leftGround)
    player.collide(rightGround)

    if (zombie.bounceOff(leftGround)) {
        zombie.addImage("right", rightzombieImage)
    }

    if (zombie.bounceOff(mostRightGround)) {
        zombie.addImage("left", zombieImage)
    }

    if (bulletGroup.isTouching(zombie)) {
        zombie.destroy()
        score += 5
    }

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

    zombie.bounceOff(topGround)
    zombie.bounceOff(bottomGround)
    zombie.bounceOff(leftGround)
    zombie.bounceOff(mostRightGround)
        //}

}

function shootBullet() {
    bullet = createSprite(player.position.x, player.position.y - 25, 50, 20)
    bullet.addImage(bulletImage)
    bullet.scale = 0.05
    bullet.velocityX = 20
    bullet.lifetime = windowWidth / 20
    bulletGroup.add(bullet)
}

function spawnZombies() {
    zombie = createSprite(1100, 300, 20, 20);
    zombie.debug = true
    zombie.velocityX = -5;
    zombie.scale = 0.3;
}