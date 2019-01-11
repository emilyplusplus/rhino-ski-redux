class Rhino {
    constructor() {
        this.x = GAME_WIDTH;
        this.y = (GAME_HEIGHT / 2) - 16;
        this.animationFrame = 0
        this.ticks = 0
        this.eating = false;
    }

    getAsset() {
        var assetName;
        switch(this.animationFrame) {
            case 0:
                assetName = 'rhinoRunLeft';
                break;
            case 1:
                assetName = 'rhinoRunLeft2';
                break;
            case 2:
                assetName = 'rhinoLift';
                break;
            case 3:
                assetName = 'rhinoLiftMouthOpen';
                break;
            case 4:
                assetName = 'rhinoEat1';
                break;
            case 5:
                assetName = 'rhinoEat2';
                break;
            case 6:
                assetName = 'rhinoEat3';
                break;
            case 7:
                assetName = 'rhinoEat4';
                break;
        }
        return assetName;
    };

    update() {
        if(scoreboard.score < 2000) return;

        this.ticks++

        if(this.ticks > GAME_TICKS_PER_FRAME) {
            this.ticks = 0;
            this.animationFrame++
        }
        
        if(!this.eating && this.animationFrame == 2) {
            this.animationFrame = 0;
        } else if(this.animationFrame == 8) {
            this.animationFrame = 6;
        }

        if(this.x >= GAME_WIDTH / 2 - 16) {
            this.x -= 4;
        } else {
            this.eating = true;
            player.skierDirection = 0;
        }
    }

    render(ctx) {
        var assetName = this.getAsset();
        var rhinoImage = AssetManager.getInstance().getImage(assetName);
        var x = (GAME_WIDTH - rhinoImage.width) / 2;
        var y = (GAME_HEIGHT - rhinoImage.height) / 2;

        ctx.drawImage(rhinoImage, this.x, this.y, rhinoImage.width, rhinoImage.height);
    }
}

if(typeof window === 'undefined') module.exports = Rhino // export for unit testing if running in node
