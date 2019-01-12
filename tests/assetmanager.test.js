import test from 'ava';
import AssetManager from '../js/AssetManager'

test('verify singleton is working', t => {
    global.assetManagerInstance = null;

	if(AssetManager.getInstance() === AssetManager.getInstance())
		t.pass()
	else
		t.fail()
})
