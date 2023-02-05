


/*
Game set up
*/

// Global variables

let isPlyin = false
let maxScore = 5
let p1ReadyToFire = true
let p2ReadyToFire = true

// finction for seting up the player sprites
function plrSetUp(player: number){ 
    if (player == 1) {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(img`
    . . . . . . . . . . f 
    . . . . . . . . . . 1 
    . . . 1 8 8 2 2 1 1 1 
    5 5 5 1 8 8 1 1 1 1 1 
    5 5 5 1 1 1 1 1 1 1 1 
    . . . 1 2 2 2 2 1 1 1 
    . . . . . . . . . . 1 
    . . . . . . . . . . f 
    `, SpriteKind.Player))
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(152, 60)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 0, 100)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)

    } else if (player == 2) {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(img`
    . . . . . . 2 2 . . . . . . 
    . . . . 2 2 2 2 2 2 . . . . 
    . . 2 2 2 . 2 2 . 2 2 2 . . 
    . 2 2 . 2 . 2 2 . 2 . 2 2 . 
    2 2 2 . 2 . 2 2 . 2 . 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . 2 2 2 . . 2 2 . . 2 2 2 . 
    . . 2 . . . . . . . . 2 . . 
    `, SpriteKind.Player))
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(10, 60)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 0, 100)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)
    
    } else {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(img`
    . . . . . . . . . . f 
    . . . . . . . . . . 1 
    . . . 1 8 8 2 2 1 1 1 
    5 5 5 1 8 8 1 1 1 1 1 
    5 5 5 1 1 1 1 1 1 1 1 
    . . . 1 2 2 2 2 1 1 1 
    . . . . . . . . . . 1 
    . . . . . . . . . . f 
    `, SpriteKind.Player))
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(img`
    . . . . . . 2 2 . . . . . . 
    . . . . 2 2 2 2 2 2 . . . . 
    . . 2 2 2 . 2 2 . 2 2 2 . . 
    . 2 2 . 2 . 2 2 . 2 . 2 2 . 
    2 2 2 . 2 . 2 2 . 2 . 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . 2 2 2 . . 2 2 . . 2 2 2 . 
    . . 2 . . . . . . . . 2 . . 
    `, SpriteKind.Player))
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

plrSetUp(0) // spawn both ships


// enable shooting
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function(player: mp.Player) {

if (player.getProperty(mp.PlayerProperty.Number) == 1 && p1ReadyToFire == true) { // if player one shot and cooldown is not active
    
    let p1Bullet = sprites.createProjectileFromSprite(assets.image`p1Shot`,mp.getPlayerSprite(player) , -100, 0) // shoot a projectile from player 1
    p1Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
    
    //shot cooldown
    p1ReadyToFire = false
    timer.after(800, function () {
        p1ReadyToFire = true
    })

} else if (player.getProperty(mp.PlayerProperty.Number) == 2 && p2ReadyToFire == true){ // if player 2 shot and cooldown is not active
    
    let p2Bullet = sprites.createProjectileFromSprite(assets.image`p2Shot`, mp.getPlayerSprite(player), 100, 0) // shoot a projectile from player 2
    p2Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
    
    // shot cooldown
    p2ReadyToFire = false
    timer.after(800, function () {
        p2ReadyToFire = true
    })

}

})
