


/*
Game set up
*/

// set up new sprite kinds
namespace SpriteKind {
    export const Player2 = SpriteKind.create() // set up player 2 sprite kind
    export const Player1 = SpriteKind.create() // set up player 1 sprite kind
}


// Global variables

let isPlyin = false
let maxScore = 5

let p1ReadyToFire = true
let p2ReadyToFire = true

let p1Bullet: Sprite = null
let p2Bullet: Sprite = null

// finction for seting up the player sprites
function plrSetUp(player: number){ 
    if (player == 1) {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`p1Sprite`, SpriteKind.Player1))
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(152, 60)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 0, 100)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)

    } else if (player == 2) {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(assets.image`p2Sprite`, SpriteKind.Player2))
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(10, 60)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 0, 100)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)
    
    } else {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`p1Sprite`, SpriteKind.Player1))
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(assets.image`p2Sprite`, SpriteKind.Player2))
        
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(152, 60)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(10, 60)

        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 0, 100)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 0, 100)

        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)
    }
}



// main menue set up
function mainMenue() {

let player: mp.Player = null
for (let index = 0; index <= 3; index++) {
    player = mp.getPlayerByIndex(index)
    if (mp.getPlayerProperty(player, mp.PlayerProperty.Number) == 1) {
            story.showPlayerChoices("Play", "Change Max Score")
    }
    if (story.getLastAnswer() == 'Play') { isPlyin = true } else if (story.getLastAnswer() == "Change Max Score") {
        maxScore = game.askForNumber(`Select max score. Current max score = ${maxScore}`, 3)
        mainMenue()
    }
}

}

mainMenue() // open the main menue

pauseUntil(() => isPlyin == true) // wait untill player 1 selects play


/*
start game
*/

scene.setBackgroundImage(assets.image`backGround`)


plrSetUp(0) // spawn both ships


// enable shooting
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function(player: mp.Player) {

if (player.getProperty(mp.PlayerProperty.Number) == 1 && p1ReadyToFire == true) { // if player one shot and cooldown is not active
    
    p1Bullet = sprites.createProjectileFromSprite(assets.image`p1Shot`,mp.getPlayerSprite(player) , -100, 0) // shoot a projectile from player 1
    p1Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
    
    //shot cooldown
    p1ReadyToFire = false
    timer.after(800, function () {
        p1ReadyToFire = true
    })

} else if (player.getProperty(mp.PlayerProperty.Number) == 2 && p2ReadyToFire == true){ // if player 2 shot and cooldown is not active
    
    p2Bullet = sprites.createProjectileFromSprite(assets.image`p2Shot`, mp.getPlayerSprite(player), 100, 0) // shoot a projectile from player 2
    p2Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
    
    // shot cooldown
    p2ReadyToFire = false
    timer.after(800, function () {
        p2ReadyToFire = true
    })

}

})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player2, function(sprite: Sprite, otherSprite: Sprite) {
    if (!(sprite == p2Bullet)) {
        sprite.destroy()
        otherSprite.destroy(effects.fire, 100)   
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, 1)
        pause(1000)
        plrSetUp(2)
}
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player1, function (sprite: Sprite, otherSprite: Sprite) {
    if (!(sprite == p1Bullet)) {
        sprite.destroy()
        otherSprite.destroy(effects.fire, 100)
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 1)
        pause(1000)
        plrSetUp(1)
    }
})


mp.onScore(maxScore, function(player: mp.Player) {
    mp.gameOverPlayerWin(player)
})
