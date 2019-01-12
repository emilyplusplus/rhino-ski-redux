import test from 'ava';
import Player from '../js/Player'

test('player intersect rect', t => {
    let player = new Player()

	if(player.intersectRect({
        left: 4,
        right: 5,
        top: 1,
        bottom: 6
    },{
        left: 4,
        right: 7,
        top: 1,
        bottom: 6
    }))
		t.pass()
	else
		t.fail()
})
