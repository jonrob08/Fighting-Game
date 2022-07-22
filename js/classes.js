class Sprite {
    // Since we always want to set a position first and a velocity second, we will wrap the two parameters in {} to create a singular object
    constructor({ position, imageSrc }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
    
    update() {
        this.draw()
    }
}

class Fighter {
    // Since we always want to set a position first and a velocity second, we will wrap the two parameters in {} to create a singular object
    constructor({ position, velocity, color = 'red', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y 
            },
            // equal to offset: offset,
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        // hit box is drawn here
        if (this.isAttacking) {
            ctx.fillStyle = 'green'
            ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
         }
    }

    update() {
        this.draw()
        this.hitBox.position.x = this.position.x - this.hitBox.offset.x
        this.hitBox.position.y = this.position.y


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // if sprite hits the bottom of our canvas or canvas.height (576), stop the sprite from falling or set velocity on the y axis to 0
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}
