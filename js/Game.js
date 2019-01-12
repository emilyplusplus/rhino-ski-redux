const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;
const GAME_PIXEL_RATIO = window.devicePixelRatio; //should be ~2 for retina screens, ~1 for regular screens
const GAME_TICKS_PER_FRAME = 6; //determines animation speed

let rhino = null;
let player = null;
let obstacles = null;
let scoreboard = null;
let game = null;

class Game {
    constructor() {
        this.requestedFrame = null
        this.context = null;
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
        this.context = canvas[0].getContext('2d');

        //Setup game objects
        rhino = new Rhino();
        player = new Player();
        obstacles = new Obstacles();
        scoreboard = new Scoreboard();

        $(window).keydown(event => {
            player.keyListener(event);
            game.keyListener(event);
        });

        AssetManager.getInstance().setup().then(() => {
            obstacles.placeInitialObstacles();
            this.requestedFrame = requestAnimationFrame(this.gameLoop);
        }).catch((err) => {
            console.error(err)
        });
    }

    gameLoop() {
        game.context.save();

        game.context.scale(GAME_PIXEL_RATIO, GAME_PIXEL_RATIO); //retina support
        game.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        /* Update Game Objects */
        rhino.update()
        player.update()
        scoreboard.update()

        /* Render Game Objects */
        obstacles.render(game.context)
        rhino.render(game.context)
        player.render(game.context)
        scoreboard.render(game.context)
        
        game.context.restore();
        game.requestedFrame = requestAnimationFrame(game.gameLoop);
    }

    keyListener(event) {
        switch(event.key) {
            case 'p':
                if(this.requestedFrame) {
                    cancelAnimationFrame(this.requestedFrame);
                    this.requestedFrame = null;
                } else {
                    this.requestedFrame = requestAnimationFrame(this.gameLoop);
                }

                event.preventDefault();
                break;
            case 'r':
                let scoreboardColorSaved  = scoreboard.color
                rhino = new Rhino();
                player = new Player();
                obstacles = new Obstacles();
                scoreboard = new Scoreboard();
                scoreboard.color = scoreboardColorSaved

                obstacles.placeInitialObstacles();
                if(!this.requestedFrame) this.requestedFrame = requestAnimationFrame(this.gameLoop);
                
                event.preventDefault();
                break;
        }
    }
}

$(document).ready(() => {
    game = new Game()
    game.setup()

    if(!localStorage.getItem('highScore')) {
        $('#tooltip').addClass('active')
    }

    $('#darkMode').click((event) => {
        localStorage.setItem('darkMode', event.target.checked)
        if(event.target.checked) {
            scoreboard.color = 'white';
            $('body').css("background","#1B1D22").css("color","#fff");
        } else {
            scoreboard.color = 'black';
            $('body').css("background","#fff").css("color","#1B1D22");
        }
    });

    let darkMode = localStorage.getItem('darkMode')
    if(darkMode && darkMode === 'true') {
        $('#darkMode')[0].click(this);
    }
})