import test from 'ava';
import Obstacles from '../js/Obstacles'

test('obstacle types length', t => {
    let obstacles = new Obstacles()
	if(obstacles.obstacleTypes.length === 4)
		t.pass()
	else
		t.fail()
})
