const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;
const GAME_PIXEL_RATIO = window.devicePixelRatio; //should be ~2 for retina screens, ~1 for regular screens
const GAME_TICKS_PER_FRAME = 6; //determines animation speed

class Game {
    constructor() {
        this.fontColor = 'black'
    }

    darkMode(enabled) {
        if(enabled) {
            this.fontColor = 'white';
            $('body').css("background","#111").css("color","#eee");
        } else {
            this.fontColor = 'black';
            $('body').css("background","#eee").css("color","#111");
        }
    }

    setup() {
        let canvas = $('<canvas></canvas>')
            .attr('width', GAME_WIDTH * GAME_PIXEL_RATIO)
            .attr('height', GAME_HEIGHT * GAME_PIXEL_RATIO)
            .css({
                width: GAME_WIDTH + 'px',
                height: GAME_HEIGHT + 'px'
            });
        $('body').append(canvas);
        let ctx = canvas[0].getContext('2d');

        let player = new Player()
        let obstacles = new Obstacles()
        let scoreboard = new Scoreboard()
        let requestedFrame = null;

        let game = this

        let gameLoop = function() {
            ctx.save();

            ctx.scale(GAME_PIXEL_RATIO, GAME_PIXEL_RATIO); //retina support
            ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            /* Update/Move/Animate */
            player.move(obstacles.placeNewObstacle, obstacles)
            let hit = player.checkIfHitObstacle(obstacles.obstacles)
            scoreboard.update(hit, player.skierDirection == 2 || player.skierDirection == 3 ||player.skierDirection == 4)

            /* Render/Draw */
            obstacles.drawObstacles(ctx, player);
            player.render(ctx)
            scoreboard.render(ctx, game.fontColor)
            
            ctx.restore();

            requestedFrame = requestAnimationFrame(gameLoop);
        };

        function keyPressed(event) {
            switch(event.key) {
                case 'p':
                    if(requestedFrame) {
                        cancelAnimationFrame(requestedFrame);
                        requestedFrame = null;
                    } else {
                        requestedFrame = requestAnimationFrame(gameLoop);
                    }

                    event.preventDefault();
                    break;
                case 'r':
                    gameOver = false
                    player = new Player()
                    obstacles = new Obstacles()
                    score = 0;
                    obstacles.placeInitialObstacles();
                    if(!requestedFrame) requestedFrame = requestAnimationFrame(gameLoop);
                    
                    event.preventDefault();
                    break;
            }
        }

        $(window).keydown(event => {
            player.update(event, obstacles.placeNewObstacle, obstacles)
            keyPressed(event)
        });

        AssetManager.getInstance().setup().then(() => {
            obstacles.placeInitialObstacles();
            requestedFrame = requestAnimationFrame(gameLoop);
        }).catch((err) => {
            console.error(err)
        });
    }
}

$(document).ready(() => {
    let game = new Game()
    game.setup()

    $('#darkMode').click((event) => {
        game.darkMode(event.target.checked)
    });
})