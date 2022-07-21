const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5

class Sprite {
    // Since we always want to set a position first and a velocity second, we will wrap the two parameters in {} to create a singular object
    constructor({ position, velocity, color = 'red' }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
        this.hitBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, 50, this.height)

        // hit box is drawn here
        ctx.fillStyle = 'green'
        ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
    }

    update() {
        this.draw()


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // if sprite hits the bottom of our canvas or canvas.height (576), stop the sprite from falling or set velocity on the y axis to 0
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x:0,
        y:0
    }
})

player.draw()


const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x:0,
        y:0
    },
    color: 'blue'
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

let lastKey

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    // Player Movement
    player.velocity.x = 0

    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -3
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 3
    }

    // Enemy Movement
    enemy.velocity.x = 0
    
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3
    }
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
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
    }
    console.log(e.key)
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
    console.log(e.key)
})