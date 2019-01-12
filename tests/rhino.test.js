import test from 'ava';
import Rhino from '../js/Rhino'
import Scoreboard from '../js/Scoreboard'

test('rhino update ticks', t => {
    global.scoreboard = new Scoreboard()
    global.scoreboard.score = 2001

    global.GAME_WIDTH = 1920
    global.GAME_HEIGHT = 1080

    global.GAME_END_FT = 2000
    global.GAME_TICKS_PER_FRAME = 6

    let rhino = new Rhino()

    for(let i = 0; i < 4; i++) rhino.update()

	if(rhino.ticks === 4)
		t.pass()
	else
		t.fail()
})
