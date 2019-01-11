import test from 'ava';
import Scoreboard from '../js/Scoreboard'

let scoreboard = new Scoreboard()

test('score updates', t => {
	for(let i = 0; i < 300; i++) scoreboard.update(false, true)
	if(Math.round(scoreboard.score) === 108)
		t.pass()
	else
		t.fail()
})