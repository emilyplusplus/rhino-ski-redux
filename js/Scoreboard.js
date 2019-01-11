class Scoreboard {
    constructor() {
        this.score = 0;
        this.color = 'black';
        this.highScore = 0

        if(typeof window !== 'undefined') {
            this.highScore = parseFloat(localStorage.getItem('highScore')) || 0
        }
    }

    update() {
        if(player.skierDirection == 0) {
            if(this.score > this.highScore) {
                if(typeof window !== 'undefined') localStorage.setItem('highScore', this.score)
                this.highScore = this.score
            }
        }

        if(player.skierDirection == 2 || player.skierDirection == 3 ||player.skierDirection == 4) this.score += 0.36;
    }

    render(ctx) {
        ctx.font = '48px Arial';
        ctx.fillStyle = this.color
        ctx.fillText(Math.floor(this.score) + '\'', GAME_WIDTH / 2 - ctx.measureText(Math.floor(this.score) + '\'').width / 2, 60);

        ctx.font = '12px Arial';
        ctx.fillStyle = this.color
        ctx.fillText('Personal Best: ' + Math.floor(this.highScore) + '\'', GAME_WIDTH / 2 - ctx.measureText('Personal Best: ' + Math.floor(this.highScore) + '\'').width / 2, 80);
    }
}

if(typeof window === 'undefined') module.exports = Scoreboard //export for unit testing if running in node
