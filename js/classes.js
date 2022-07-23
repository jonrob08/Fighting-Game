class Sprite {
    // Since we always want to set a position first and a velocity second, we will wrap the two parameters in {} to create a singular object
    constructor({ 
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = {
            x: 0, y: 0
        } 
    }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 15
        this.offset = offset
    }

    draw() {
        ctx.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
            )
    }

    animateFrames() {
        this.framesElapsed++

        if(this.framesElapsed % this.framesHold === 0){
            if (this.framesCurrent < this.framesMax - 1)
        {
            this.framesCurrent++
        } else {
            this.framesCurrent = 0
        }
    }
    }
    
    update() {
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite {
    // Since we always want to set a position first and a velocity second, we will wrap the two parameters in {} to create a singular object
    constructor({ 
        position, 
        velocity, 
        color = 'red',  
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {
            x: 0, y: 0
        },
        sprites
    }) {
        super({
            position, 
            imageSrc, 
            scale, 
            framesMax,
            offset
        })

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
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 15
        this.sprites = sprites

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    // draw() {
    //     ctx.fillStyle = this.color
    //     ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    //     // hit box is drawn here
    //     if (this.isAttacking) {
    //         ctx.fillStyle = 'green'
    //         ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
    //      }
    // }

    update() {
        this.draw()
        this.animateFrames()
        this.framesElapsed++

        this.hitBox.position.x = this.position.x - this.hitBox.offset.x
        this.hitBox.position.y = this.position.y


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // GRAVITY - if sprite hits the bottom of our canvas or canvas.height (576), stop the sprite from falling or set velocity on the y axis to 0
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0
            this.position.y = 330
        } else this.velocity.y += gravity

    }

    attack() {
        if (this.lastKey === 'a') {
            this.switchSprite('revattack1')
        }
        this.switchSprite('attack1')
        
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 1000)
    }

    switchSprite(sprite) {
        if (
            this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax -1
            ) {
                return
            }else if (
                this.image === this.sprites.revattack1.image && this.framesCurrent < this.sprites.revattack1.framesMax -1
            ) {
                return
            }
            

        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image)
                {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break
            case 'revidle':
                if(this.image !== this.sprites.revidle.image)
                {
                this.image = this.sprites.revidle.image;
                this.framesMax = this.sprites.revidle.framesMax;
                this.framesCurrent = 0;
                }
            break
            case 'run':
                if(this.image !== this.sprites.run.image)
                {
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
                this.framesCurrent = 0;
                }
                break
            case 'revrun':
                if(this.image !== this.sprites.revrun.image)
                {
                this.image = this.sprites.revrun.image;
                this.framesMax = this.sprites.revrun.framesMax;
                this.framesCurrent = 0;
                }
            break
            case 'jump':
                if(this.image !== this.sprites.jump.image)
                {
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax;
                this.framesCurrent = 0;
                }
                break
            case 'revjump':
                if(this.image !== this.sprites.revjump.image)
                {
                this.image = this.sprites.revjump.image;
                this.framesMax = this.sprites.revjump.framesMax;
                this.framesCurrent = 0;
                }
            break
            case 'fall':
                if(this.image !== this.sprites.fall.image)
                {
                this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax;
                this.framesCurrent = 0;
                }
            break
            case 'revfall':
                if(this.image !== this.sprites.revfall.image)
                {
                this.image = this.sprites.revfall.image;
                this.framesMax = this.sprites.revfall.framesMax;
                this.framesCurrent = 0;
                }
            break
            case 'attack1':
                if(this.image !== this.sprites.attack1.image)
                {
                this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax;
                this.framesCurrent = 0;
                }
            break
            case 'revattack1':
                if(this.image !== this.sprites.revattack1.image)
                {
                this.image = this.sprites.revattack1.image;
                this.framesMax = this.sprites.revattack1.framesMax;
                this.framesCurrent = 0;
                }
            break
        }
    }
}
