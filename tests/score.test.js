import test from 'ava';
import Scoreboard from '../js/Scoreboard'
import Player from '../js/Player'

test('score updates', t => {
	global.player = new Player()
	global.player.skierDirection = 3; //down

	let scoreboard = new Scoreboard()

	for(let i = 0; i < 300; i++) scoreboard.update()
	if(Math.round(scoreboard.score) === 108)
		t.pass()
	else
		t.fail()
})

test('score construction test', t => {
	let scoreboard = new Scoreboard()

	if(scoreboard.color == 'black')
		t.pass()
	else
		t.fail()
})
