class Player {
    constructor() {
        this.skierDirection = 5;
        this.skierMapX = 0;
        this.skierMapY = 0;
        this.skierSpeed = 0.1;
        this.jumping = false
        this.animationFrame = 0
        this.ticks = 0
    }

    keyListener(event) {
        switch(event.key) {
            case 'ArrowLeft':
                if(this.skierDirection === 0) {
                    this.skierDirection = 1
                }
                else if(this.skierDirection === 1) {
                    this.skierMapX -= this.skierSpeed;
                    obstacles.placeNewObstacle(this.skierDirection, this, obstacles, GAME_WIDTH, GAME_HEIGHT);
                }
                else {
                    this.skierDirection--;
                }
                event.preventDefault();
                break;
            case 'ArrowRight':
                if(this.skierDirection === 0) {
                    this.skierDirection = 5
                }
                else if(this.skierDirection === 5) {
                    this.skierMapX += this.skierSpeed;
                    obstacles.placeNewObstacle(this.skierDirection, this, obstacles, GAME_WIDTH, GAME_HEIGHT);
                }
                else {
                    this.skierDirection++;
                }
                event.preventDefault();
                break;
            case 'ArrowUp':
                if(this.skierDirection === 1 || this.skierDirection === 5) {
                    this.skierMapY -= this.skierSpeed;
                    obstacles.placeNewObstacle(6, this, obstacles, GAME_WIDTH, GAME_HEIGHT);
                }
                event.preventDefault();
                break;
            case 'ArrowDown':
                if(this.skierDirection == 0) {
                    this.skierMapY += 16;
                }
                $('#tooltip').removeClass('active')
                this.skierDirection = 3;
                event.preventDefault();
                break;
            case ' ': //Space
                if(this.skierDirection != 0) this.jumping = true
                break;
        }
    }

    intersectRect(r1, r2) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };

    getSkierAsset() {
        var skierAssetName;
        switch(this.skierDirection) {
            case 0:
                skierAssetName = 'skierCrash';
                break;
            case 1:
                skierAssetName = 'skierLeft';
                break;
            case 2:
                skierAssetName = 'skierLeftDown';
                break;
            case 3:
                skierAssetName = 'skierDown';
                break;
            case 4:
                skierAssetName = 'skierRightDown';
                break;
            case 5:
                skierAssetName = 'skierRight';
                break;
        }

        if(this.jumping) {
            skierAssetName = 'skierJump' + (this.animationFrame + 1)
        }

        return skierAssetName;
    };

    update() {
        switch(this.skierDirection) {
            case 2:
                if(this.skierSpeed < 8) this.skierSpeed += .1
                this.skierMapX -= Math.round(this.skierSpeed / 1.4142);
                this.skierMapY += Math.round(this.skierSpeed / 1.4142);

                obstacles.placeNewObstacle(this.skierDirection, this, obstacles, GAME_WIDTH, GAME_HEIGHT);
                break;
            case 3:
                if(this.skierSpeed < 8) this.skierSpeed += .1
                this.skierMapY += this.skierSpeed;

                obstacles.placeNewObstacle(this.skierDirection, this, obstacles, GAME_WIDTH, GAME_HEIGHT);
                break;
            case 4:
                if(this.skierSpeed < 8) this.skierSpeed += .1
                this.skierMapX += this.skierSpeed / 1.4142;
                this.skierMapY += this.skierSpeed / 1.4142;

                obstacles.placeNewObstacle(this.skierDirection, this, obstacles, GAME_WIDTH, GAME_HEIGHT);
                break;
        }

        if(this.jumping) {
            if(this.ticks > GAME_TICKS_PER_FRAME) {
                if(this.animationFrame == 4) {
                    this.animationFrame = 0;
                    this.jumping = false;
                    this.ticks = 0;
                    return;
                }
                this.animationFrame++;
                this.ticks = 0;
            }

            this.ticks++;
        }

        this.checkIfHitObstacle()
    }

    checkIfHitObstacle() {
        if(this.jumping) return false;

        var skierAssetName = this.getSkierAsset();
        var skierImage = AssetManager.getInstance().getImage(skierAssetName);
        var skierRect = {
            left: this.skierMapX + GAME_WIDTH / 2,
            right: this.skierMapX + skierImage.width + GAME_WIDTH / 2,
            top: this.skierMapY + skierImage.height - 5 + GAME_HEIGHT / 2,
            bottom: this.skierMapY + skierImage.height + GAME_HEIGHT / 2
        };

        var collision = _.find(obstacles.obstacles, (obstacle) => {
            var obstacleImage = AssetManager.getInstance().getImage(obstacle.type);
            var obstacleRect = {
                left: obstacle.x,
                right: obstacle.x + obstacleImage.width,
                top: obstacle.y + obstacleImage.height - 5,
                bottom: obstacle.y + obstacleImage.height
            };

            return this.intersectRect(skierRect, obstacleRect);
        });

        if(collision) {
            this.skierDirection = 0;
            this.skierSpeed = 0.1;

            /*this.animationFrame = 0;
            this.jumping = false;
            this.ticks = 0;*/
            return true;
        }

        return false;
    }

    render(ctx) {
        if(rhino.eating) return;

        var skierAssetName = this.getSkierAsset();
        var skierImage = AssetManager.getInstance().getImage(skierAssetName);
        var x = (GAME_WIDTH - skierImage.width) / 2;
        var y = (GAME_HEIGHT - skierImage.height) / 2;

        ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
    }
}

if(typeof window === 'undefined') module.exports = Player // export for unit testing if running in node
