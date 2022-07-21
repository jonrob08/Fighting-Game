const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    ImageSrc: "./assets/background/background.png"
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x: 0,
        y: 0
    }
})

player.draw()


const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x:0,
        y:0
    },
    color: 'blue',
    offset: {
        x: 50,
        y: 0
    }
})

enemy.draw()

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function rectangularCollisionDetect({
    rectangle1, rectangle2
}) {
    return (
        rectangle1.hitBox.position.x + rectangle1.hitBox.width >= rectangle2.position.x 
        && rectangle1.hitBox.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.hitBox.position.y + rectangle1.hitBox.height >= rectangle2.position.y 
        && rectangle1.hitBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayResult').style.display = 'flex'
    if (player.health > enemy.health) {
        document.querySelector('#displayResult').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayResult').innerHTML = 'Player 2 Wins'
    } else {
        document.querySelector('#displayResult').innerHTML = 'issa tie'
    } 
}

let timer = 60
let timerId
function decreaseTimer(){ 
    if(timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {
        determineWinner({ player, enemy, timerId })
    } 
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()

    // Player Movement
    player.velocity.x = 0

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3
    }

    // Enemy Movement
    enemy.velocity.x = 0
    
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3
    }

    // Detect Collision 
        // Player Attack
    if ( 
        rectangularCollisionDetect({
            rectangle1: player,
            rectangle2: enemy
        }) && player.isAttacking
    ) {
        player.isAttacking = false;
        enemy.health -= 20
        console.log('PLAYER HIT ENEMY!');
        document.querySelector('#enemyHealth').style.width = enemy.health + "%"
    }
        // Enemy Attack
    if ( 
        rectangularCollisionDetect({
            rectangle1: enemy,
            rectangle2: player
        }) && enemy.isAttacking
    ) {
        enemy.isAttacking = false;
        player.health -= 20
        console.log('ENEMY HIT PLAYER!');
        document.querySelector('#playerHealth').style.width = player.health + "%"
    }

    // end the game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (e) => {
    // Player 1 Keys
    switch (e.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    // Enemy Keys
    switch (e.key) {
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
            break
    }
})