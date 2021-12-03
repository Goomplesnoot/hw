var spaceImg, space;
var astoroidImg, astoroid, astoroidGroup;
var starImg , star, starGroup;
var spaceshipImg, spaceship
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
function preload(){
    spaceshipImg = loadImage("spaceship.png")
    astoroidImg = loadImage("asteroid.png")
    starImg = loadImage("star.jpeg")
    spaceImg = loadImage("Space.png")
}

function setup() {
    createCanvas(600,600);
    space = createSprite(300,300,600,600);
    space.addImage("space",spaceImg);
    space.velocityY = 5;
    astoroidGroup=new Group()
    starGroup=new Group()
    invisibleBlockGroup=new Group()
    spaceship=createSprite(300,300,50,50)
    spaceship.addImage(spaceshipImg)
    spaceship.scale=0.3
}

function draw() {
    background(200);
    asteroid.setCollider("circle",0,0,120)
    asteroid.debug=true
    if(gameState==="play"){
        if(space.y > 400){
          space.y = 300
        }
        if(keyDown("space")){
          spaceship.velocityY=-5
        }
        spaceship.velocityY=spaceship.velocityY + 0.5
        if(keyDown("RIGHT_ARROW")){
            spaceship.x += 3
        }
        if(keyDown("LEFT_ARROW")){
            spaceship.x -= 3
        }
        if(astoroidGroup.isTouching(spaceship)){
            spaceship.velocityY=0
        }
        if(starGroup.isTouching(spaceship)){
            starGroup.destroyEach()
        }
        if(invisibleBlockGroup.isTouching(spaceship) || spaceship.y > 600){
            spaceship.destroy()
            gameState="end"
        }
        spawnAstoroids()
    }
    drawSprites()
    if(gameState ==="end"){
        background(0,0,0)
        stroke("green")
        fill("green")
        textSize(30)
        text("GAME OVER",300,300)
        
      }


}
function spawnAstoroids(){
    if(frameCount % 240 === 0){
        astoroid=createSprite(200,-50)
        astoroid.addImage(astoroidImg)
        astoroid.scale = 0.25
        astoroid.x=Math.round(random(100,500))
        astoroid.velocityY=1.5
        astoroid.lifetime=600
        astoroidGroup.add(astoroid)
        invisibleBlock=createSprite(200,15)
        invisibleBlock.width=astoroid.width
        invisibleBlock.height=2
        invisibleBlock.x=astoroid.x
        invisibleBlock.velocityY=1.5
        invisibleBlock.lifetime=600
        invisibleBlock.visible=false
        invisibleBlockGroup.add(invisibleBlock)
        star=createSprite(200,-50)
        star.addImage(starImg)
        star.scale=0.13
        star.x=Math.round(random(100,500))
        star.velocityY=1.5
        star.lifetime=600
        starGroup.add(star)
    }
}
