


/*
Game set up
*/


    /*
    note that all functions are set up in coronological order (when posible)
    */


// set up new sprite kinds
namespace SpriteKind {
    export const Player2 = SpriteKind.create() // set up player 2 sprite kind
    export const Player1 = SpriteKind.create() // set up player 1 sprite kind
    export const PowerUp = SpriteKind.create() // set up power up sprite kind
}



// Global variables

    // game variables
let isPlyin: boolean = false // is a game running (is the menue open)
let maxScore: number = 5 // the maximum score that you can get before the game ends
let backmusic: string = 'on'

let p2conected = 'disconected'



//player variables
let p1 = mp.playerSelector(mp.PlayerNumber.One)
let p2 = mp.playerSelector(mp.PlayerNumber.Two)

let p1ReadyToFire: boolean = true // player one, is shot cooldwon active
let p2ReadyToFire: boolean = true // player two, is shot cooldwon active

let p1shotcooldwn: number = 400 // player 1 cool down between shots
let p2Shotcooldwn: number = 400 // player 2 cool down between shots

let p1shotvlsty: number = 200 // speed of player one shot
let p2shotvlsty: number = -200 // speed of player two shot

let p1Speed: number = 100 // speed the player one ship moves at
let p2Speed: number = 100 // speed the player teo ship moces at


    // sprite variables
let pwrupmesage: any = null // the text that indicates a power up
let p1cnct: any = null
let p2cnct: any = null

let p1Bullet: Sprite = null // variable to hold the plyer one bullet sprite
let p2Bullet: Sprite = null // variable to hold the plyer two bullet sprite

let p1Bullet2: Sprite = null // variable to hold the plyer one bullet sprite
let p2Bullet2: Sprite = null // variable to hold the plyer two bullet sprite

let p1Bullet3: Sprite = null // variable to hold the plyer one bullet sprite
let p2Bullet3: Sprite = null // variable to hold the plyer two bullet sprite

let p1Sprite: any = mp.getPlayerSprite(p1) // player one's sprite
let p2Sprite: any = mp.getPlayerSprite(p2) // player two's sprite

        // sprite related variables
let curntPwrUp: String =  'none'

let powerUp: Sprite = null

    // power up variables
let speedPwrUpMltplr: number = 2
let shotvlstymltpyr: number = 2

let p1MultiShot = false
let p2MultiShot = false

let p1speedprupltplr: number = null
let p2speedprupltplr: number = null

let p1shotvlstymltpyr: number = null
let p2shotvlstymltpyr: number = null


if (speedPwrUpMltplr && !(speedPwrUpMltplr == 0 || null)) {
    p1speedprupltplr = speedPwrUpMltplr
    p2speedprupltplr = speedPwrUpMltplr
}
if (speedPwrUpMltplr && !(speedPwrUpMltplr == 0 || null)) {
    p1shotvlstymltpyr = shotvlstymltpyr
    p2shotvlstymltpyr = shotvlstymltpyr
}

if (mp.isConnected(p2) == true) {
    p2conected = 'conected'
}

mp.onControllerEvent(ControllerEvent.Connected, function(player: mp.Player) {
    if (player == p2) {
        p2conected = 'conected'
    }
})

mp.onControllerEvent(ControllerEvent.Disconnected, function (player: mp.Player) {
    if (player == p2) {
        p2conected = 'Disconnected'
    }
})


// main menue set up
function mainMenue() {
scene.setBackgroundColor(2)
color.setColor(3, color.rgb(21, 75, 146))
color.setColor(2, color.rgb(65,91,135))


if (p1cnct) { p1cnct.destroy()} if (p2cnct) {p2cnct.destroy()}
p1cnct = textsprite.create('Player 1 conected')
p1cnct.setPosition(80,15)
p2cnct = textsprite.create(`Player 2 ${p2conected}`)
p2cnct.setPosition(80,30)

    mp.onControllerEvent(ControllerEvent.Connected, function (player: mp.Player) {
        if (player == p2 && story.isMenuOpen() == true) {
            p2conected = 'conected'
            p2cnct.destroy()
            p2cnct = textsprite.create(`Player 2 ${p2conected}`)
            mainMenue()
        }
    })

    mp.onControllerEvent(ControllerEvent.Disconnected, function (player: mp.Player) {
        if (player == p2) {
            p2conected = 'Disconnected'
            p2cnct.destroy()
            p2cnct = textsprite.create(`Player 2 ${p2conected}`)
            mainMenue()
        }
    })

let player: mp.Player = null
for (let index = 0; index <= 3; index++) {
    player = mp.getPlayerByIndex(index)
    if (mp.getPlayerProperty(player, mp.PlayerProperty.Number) == 1) {
            story.showPlayerChoices("Play", "Change Max Score", `Music ${backmusic}`)
    }
    if (story.getLastAnswer() == 'Play') { 
        color.setColor(3, color.rgb(255, 147, 196))
        color.setColor(2, color.rgb(255, 33, 33))
        p1cnct.destroy()
        p2cnct.destroy()
        isPlyin = true 
        } else if (story.getLastAnswer() == "Change Max Score") {
        maxScore = game.askForNumber(`Select max score. Current max score = ${maxScore}`, 3)
        mainMenue()
    } else if (story.getLastAnswer() == `Music ${backmusic}`) {
        if (backmusic == 'on') {
            backmusic = 'off'
            music.stopAllSounds()
            mainMenue()
        } else {
            backmusic = 'on'
            music.play(music.createSong(assets.song`bacground1`), music.PlaybackMode.LoopingInBackground)
            mainMenue()
        }
    }
}
}


// function for seting up the player sprites
function plrSetUp(player: number) {
    if (player == 1) {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`p1Sprite`, SpriteKind.Player1))
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(10, 60)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 0, p1Speed)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)

    } else if (player == 2) {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(assets.image`p2Sprite`, SpriteKind.Player2))
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(152, 60)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 0, p2Speed)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)

    } else {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`p1Sprite`, SpriteKind.Player1))
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(assets.image`p2Sprite`, SpriteKind.Player2))

        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(10, 60)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(152, 60)

        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 0, p1Speed)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 0, p2Speed)

        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)
    }
}


function overlaps() {

    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player2, function (sprite: Sprite, otherSprite: Sprite) {
        if (sprite == p1Bullet || sprite == p1Bullet2 || sprite == p1Bullet3) {
            sprite.destroy()
            otherSprite.destroy(effects.fire, 100)
            mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, 1)
            pause(1000)
            plrSetUp(2)
        }
    })

    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player1, function (sprite: Sprite, otherSprite: Sprite) {
        if (sprite == p2Bullet || sprite == p2Bullet2 || sprite == p2Bullet3) {
            sprite.destroy()
            otherSprite.destroy(effects.fire, 100)
            mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 1)
            pause(1000)
            plrSetUp(1)
        }
    })


    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.PowerUp, function (sprite: Sprite, otherSprite: Sprite) {
        sprite.destroy()
        otherSprite.destroy()
        if (curntPwrUp == 'Speed' && sprite == p1Bullet) {
            pwrupmesage = textsprite.create('P1 speed boost!' )
            pwrupmesage.setPosition (80,15)
            p1Speed = p1Speed * p1speedprupltplr
            mp.moveWithButtons(p1,0,p1Speed)


            timer.debounce('action', 5000, function() {
                p1Speed = p1Speed / p1speedprupltplr
                mp.moveWithButtons(p1,0,p1Speed)
                pwrupmesage.destroy()
            })
        
        } else if (curntPwrUp == 'Speed' && sprite == p2Bullet) {
            pwrupmesage = textsprite.create('P2 speed boost!')
            pwrupmesage.setPosition(80, 15)
            p2Speed = p2Speed * p2speedprupltplr
            mp.moveWithButtons(p2, 0, p2Speed)


            timer.debounce('action', 5000, function () {
                p2Speed = p2Speed / p2speedprupltplr
                mp.moveWithButtons(p2, 0, p2Speed)
                pwrupmesage.destroy()
            })
        } else if (curntPwrUp == 'Shootvlsty' && sprite == p1Bullet) {
            pwrupmesage = textsprite.create('P1 bullet speed boost!')
            pwrupmesage.setPosition(80,15)
            p1shotvlsty = p1shotvlsty * p1shotvlstymltpyr

            timer.debounce('action', 5000, function () {
                p1shotvlsty = p1shotvlsty / p1shotvlstymltpyr
                pwrupmesage.destroy()
            })
            
        } else if (curntPwrUp == 'Shootvlsty' && sprite == p2Bullet) {
            pwrupmesage = textsprite.create('P2 bullet speed boost!')
            pwrupmesage.setPosition(80, 15)
            p2shotvlsty = p2shotvlsty * p2shotvlstymltpyr

            timer.debounce('action', 5000, function () {
                p2shotvlsty = p2shotvlsty / p2shotvlstymltpyr
                pwrupmesage.destroy()
            })

        } else if (curntPwrUp == 'multiShoot' && sprite == p1Bullet) {
            pwrupmesage = textsprite.create('P1 Muli-Shot!')
            pwrupmesage.setPosition(80, 15)
            p1MultiShot = true

            timer.debounce('action', 5000, function () {
                p1MultiShot = false
                pwrupmesage.destroy()
            })
        } else if (curntPwrUp == 'multiShoot' && sprite == p2Bullet) {
            pwrupmesage = textsprite.create('P2 Muli-Shot!')
            pwrupmesage.setPosition(80, 15)
            p2MultiShot = true

            timer.debounce('action', 5000, function () {
                p2MultiShot = false
                pwrupmesage.destroy()
            })
        }
    })
}


function powerUps() {
    timer.debounce('action', 5000, function() {
        game.onUpdateInterval(12000, function() {
            let num = Math.randomRange(1,3)
            console.log(num)
            if (num == 1) {
                powerUp = sprites.create(assets.image`speedpwrup`, SpriteKind.PowerUp)
                powerUp.setPosition(Math.randomRange(40, 120), Math.randomRange(20, 100))
                curntPwrUp = 'Speed'

                timer.debounce("action", 5000, function() {

                    for (let i = 0; i < 5; i++) {
                        flash()

                        function flash (){
                            powerUp.setImage(assets.image`speedpwrupoutlin`)
                            pause(150)
                            powerUp.setImage(assets.image`speedpwrup`)
                            pause(150)
                        }
                    }
                    powerUp.destroy()
                })
                } else if (num == 2) {
                powerUp = sprites.create(assets.image`shotspeedboost`, SpriteKind.PowerUp)
                powerUp.setPosition(Math.randomRange(40, 120), Math.randomRange(20, 100))
                curntPwrUp = 'Shootvlsty'

                timer.debounce("action", 5000, function () {

                    for (let i = 0; i < 5; i++) {
                        flash()

                        function flash() {
                            powerUp.setImage(assets.image`shotspeedboostoutln`)
                            pause(150)
                           powerUp.setImage(assets.image`shotspeedboost`)
                            pause(150)
                        }
                    }
                    powerUp.destroy()
                })
                } else if (num == 3) {
                powerUp = sprites.create(assets.image`multiShot`, SpriteKind.PowerUp)
                powerUp.setPosition(Math.randomRange(40, 120), Math.randomRange(20, 100))
                curntPwrUp = 'multiShoot'

                timer.debounce("action", 5000, function () {

                    for (let i = 0; i < 5; i++) {
                        flash()

                        function flash() {
                           powerUp.setImage(assets.image`multiShotoutln`)
                            pause(150)
                      powerUp.setImage(assets.image`multiShot`)
                            pause(150)
                        }
                    }
                    powerUp.destroy()
                })
                }
        })
    })
}



music.play(music.createSong(assets.song`bacground1`), music.PlaybackMode.LoopingInBackground) // play the back ground music
mainMenue() // open the main menue

pauseUntil(() => isPlyin == true) // wait untill player 1 selects play


/*
start game
*/

scene.setBackgroundImage(assets.image`backGround`)

overlaps() // call the set up overlaps function

powerUps() // call the power up genorator function

plrSetUp(0) // spawn both ships


// enable shooting
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function(player: mp.Player) {

if (player.getProperty(mp.PlayerProperty.Number) == 1 && p1ReadyToFire == true) { // if player one shot and cooldown is not active
    

    p1Bullet = sprites.createProjectileFromSprite(assets.image`p1Shot`,mp.getPlayerSprite(player) , p1shotvlsty, 0) // shoot a projectile from player 1
    p1Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
    
    if (p1MultiShot == true) {
        p1Bullet2 = sprites.createProjectileFromSprite(assets.image`p1Shot`, mp.getPlayerSprite(player), p1shotvlsty, 50) // shoot a projectile from player 1
        p1Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
        p1Bullet3 = sprites.createProjectileFromSprite(assets.image`p1Shot`, mp.getPlayerSprite(player), p1shotvlsty, -50) // shoot a projectile from player 1
        p1Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
    }

    //shot cooldown
    p1ReadyToFire = false
    timer.after(p1shotcooldwn, function () { // Puase will not wrok. it will still shot even if you do not press the space bar
        p1ReadyToFire = true
    })

    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)

} else if (player.getProperty(mp.PlayerProperty.Number) == 2 && p2ReadyToFire == true){ // if player 2 shot and cooldown is not active
        
   
    
    p2Bullet = sprites.createProjectileFromSprite(assets.image`p2Shot`, mp.getPlayerSprite(player), p2shotvlsty, 0) // shoot a projectile from player 2
    p2Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
    
    if (p2MultiShot == true) {
        p2Bullet2 = sprites.createProjectileFromSprite(assets.image`p2Shot`, mp.getPlayerSprite(player), p2shotvlsty, 50) // shoot a projectile from player 2
        p2Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
        p2Bullet3 = sprites.createProjectileFromSprite(assets.image`p2Shot`, mp.getPlayerSprite(player), p2shotvlsty, -50) // shoot a projectile from player 2
        p2Bullet.setFlag(SpriteFlag.AutoDestroy, true) // atomaticly destroy projectile onc it leaves the screen
    }

    // shot cooldown
    p2ReadyToFire = false
    timer.after(p2Shotcooldwn, function () { // Puase will not wrok. it will still shot even if you do not press the space bar
        p2ReadyToFire = true
    })
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)

}

})



// end game function
mp.onScore(maxScore, function(player: mp.Player) {
    mp.gameOverPlayerWin(player)
})


