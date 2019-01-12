import test from 'ava';
import Scoreboard from '../js/Scoreboard'
import Player from '../js/Player'

test('score updates moving', t => {
	global.player = new Player()
	global.player.skierDirection = 3; //down

	let scoreboard = new Scoreboard()

	for(let i = 0; i < 300; i++) scoreboard.update()
	if(Math.round(scoreboard.score) === 108)
		t.pass()
	else
		t.fail()
})

test('score updates not moving', t => {
	global.player = new Player()
	global.player.skierDirection = 5; //right

	let scoreboard = new Scoreboard()

	for(let i = 0; i < 10; i++) scoreboard.update()
	if(scoreboard.score === 0)
		t.pass()
	else
		t.fail()
})

test('highscore updates', t => {
	global.player = new Player()
	global.player.skierDirection = 0; //right

	let scoreboard = new Scoreboard()
	scoreboard.score = 32

	scoreboard.update()

	if(scoreboard.highScore === scoreboard.score)
		t.pass()
	else
		t.fail()
})
