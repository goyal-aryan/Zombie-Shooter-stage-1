var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie1, zombie2, zombie3, zombie4, zombie5;
var zombieImage, zombieImage2, zombieImage3, zombieImage4, zombieImage5;
var rightzombieImage, rightzombieImage2;
var bulletImage, bullet;
var invisibleGround, invisibleGround2, invisibleGround3, invisibleGround4;
var explosion;
var heartImage, heart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var restartImage, restart;
var sound1, sound2, sound3, sound4, sound5;
var lose, win;


function preload() {

    shooterImg = loadImage("assets/shooter_2.png")
    shooter_shooting = loadImage("assets/shooter_3.png")
    bulletImage = loadImage("assets/bullets.png")
    heartImage = loadImage("assets/heart_1.png")
    zombieImage = loadImage("assets/zombie.png")
    rightzombieImage = loadImage("assets/rightzombie.png")
    rightzombieImage2 = loadImage("assets/rightzombie2.png")
    zombieImage2 = loadImage("assets/zombie2.png")
    zombieImage3 = loadImage("assets/zombie3.png")
    zombieImage4 = loadImage("assets/zombie4.png")
    zombieImage5 = loadImage("assets/zombie5.png")
    restartImage = loadImage("assets/r.png")

    bgImg = loadImage("assets/bg.jpeg")
    explosion = loadSound("assets/GunShot.mp3")
    sound1 = loadSound("assets/zombie1.mp3")
    sound2 = loadSound("assets/zombie2.mp3")
    sound3 = loadSound("assets/zombie3.mp3")
    sound4 = loadSound("assets/zombie4.mp3")
    sound5 = loadSound("assets/zombie5.mp3")
    lose = loadSound("assets/lose.mp3")
    win = loadSound("assets/win.mp3")

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
    player.scale = 0.4;
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

    restart = createSprite(windowWidth / 2, windowHeight / 2, 10, 10)
    restart.addImage(restartImage)
    restart.visible = false;

    bulletGroup = createGroup();

    spawnZombies1();
    // spawnZombies2();
    // spawnZombies3();
    // spawnZombies4();
    // spawnZombies5();

}

function draw() {
    background(0);


    if (gameState === PLAY) {

        // var rand = Math.round(random(1, 5));
        // switch (rand) {
        //     case 1:
        //         spawnZombies1();
        //         break;
        //     case 2:
        //         spawnZombies2();
        //         break;
        //     case 3:
        //         spawnZombies3();
        //         break;
        //     case 4:
        //         spawnZombies4();
        //         break;
        //     case 5:
        //         spawnZombies5();
        //         break;

        //     default:
        //         break;
        // }

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
        if (keyWentUp("space")) {
            player.addImage(shooterImg)
            explosion.stop()
        }

        player.collide(topGround)
        player.collide(bottomGround)
        player.collide(leftGround)
        player.collide(rightGround)



        if (bulletGroup.isTouching(zombie)) {
            zombie.destroy()
            spawnZombies2();
            score += 5
                // sound2.play()
        }

        if (bulletGroup.isTouching(zombie2)) {
            zombie2.destroy()
            spawnZombies3();
            score += 10
                //sound3.play()
        }

        if (bulletGroup.isTouching(zombie3)) {
            zombie3.destroy()
            spawnZombies4();
            score += 15
                // sound4.play()
        }

        if (bulletGroup.isTouching(zombie4)) {
            zombie4.destroy()
            spawnZombies5();
            score += 20
                //sound5.play()
        }

        if (bulletGroup.isTouching(zombie5)) {
            zombie5.destroy()
            score += 25
            win.play()
            gameState = END;
        }
        if (player.isTouching(zombie) || player.isTouching(zombie2) || player.isTouching(zombie3) || player.isTouching(zombie4) || player.isTouching(zombie5)) {
            player.destroy()
            lose.play()
        }

        zombie.bounceOff(topGround)
        zombie.bounceOff(bottomGround)
        zombie.bounceOff(leftGround)
        zombie.bounceOff(mostRightGround)

        zombie2.bounceOff(topGround)
        zombie2.bounceOff(bottomGround)
        zombie2.bounceOff(leftGround)
        zombie2.bounceOff(mostRightGround)

        zombie3.bounceOff(topGround)
        zombie3.bounceOff(bottomGround)
        zombie3.bounceOff(leftGround)
        zombie3.bounceOff(mostRightGround)

        zombie4.bounceOff(topGround)
        zombie4.bounceOff(bottomGround)
        zombie4.bounceOff(leftGround)
        zombie4.bounceOff(mostRightGround)

        zombie5.bounceOff(topGround)
        zombie5.bounceOff(bottomGround)
        zombie5.bounceOff(leftGround)
        zombie5.bounceOff(mostRightGround)

        if (zombie2.bounceOff(leftGround)) {
            zombie2.changeImage("right2")
        }

        if (zombie2.bounceOff(mostRightGround)) {
            zombie2.changeImage("left2")
        }

        if (zombie.bounceOff(leftGround)) {
            zombie.changeImage("right")
        }
        if (zombie.bounceOff(mostRightGround)) {
            zombie.changeImage("left")
        }
    }

    if (gameState === END) {
        restart.visible = true;
    }

    drawSprites();

    fill("red")
    textSize(30)
    text("Score is: " + score, 1100, 50)

}

function shootBullet() {
    bullet = createSprite(player.position.x, player.position.y - 25, 50, 20)
    bullet.addImage(bulletImage)
    bullet.scale = 0.05
    bullet.velocityX = 20
    bullet.lifetime = windowWidth / 20
    bulletGroup.add(bullet)
}

function spawnZombies1() {
    if (frameCount % 30 === 0) {
        zombie = createSprite(1100, 300, 20, 20);
        zombie.addImage("left", zombieImage);
        zombie.addImage("right", rightzombieImage)
        zombie.debug = true
        zombie.velocityX = -5;
        zombie.scale = 0.3;
    }


}

function spawnZombies2() {
    if (frameCount % 800 === 0) {
        zombie2 = createSprite(1100, 300, 20, 20)
        zombie2.velocityX = -12;
        zombie2.visible = true;
        zombie2.scale = 0.15;
        zombie2.addImage("left2", zombieImage2)
        zombie2.addImage("right2", rightzombieImage2)
    }

}

function spawnZombies3() {
    if (frameCount % 200 === 0) {
        zombie3 = createSprite(1100, 300, 20, 20)
        zombie3.velocityX = -12;
        zombie3.visible = true;
        zombie3.scale = 0.6;
        zombie3.addImage("left3", zombieImage3)
    }


}

function spawnZombies4() {
    if (frameCount % 900 === 0) {
        zombie4 = createSprite(1100, 300, 20, 20)
        zombie4.velocityX = -12;
        zombie4.visible = true;
        zombie4.scale = 0.4;
        zombie4.addImage("left4", zombieImage4)
    }
}

function spawnZombies5() {
    if (frameCount % 1000 === 0) {
        zombie5 = createSprite(1100, 300, 20, 20)
        zombie5.velocityX = -12;
        zombie5.visible = true;
        zombie5.scale = 0.2;
        zombie5.addImage("left5", zombieImage5)
    }
}