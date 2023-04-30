///<reference path="./Route.ts"/>

/**
 * shortcut buat perintah input 
 * BLITZ-INPUT.TS
 */
const InputHit = ha.be.input.InputHit;
const InputX = ha.be.input.InputX;
const InputY = ha.be.input.InputY;
const GeserX = ha.be.input.GeserX;
const GeserY = ha.be.input.GeserY;
const FlushInput = ha.be.input.FlushInput;
const Pencet = ha.be.input.Pencet;
const Geser = ha.be.input.Geser;
const InputType = ha.be.input.InputType;

// const FlushKeys = () => {
// 	// ha.be.input.flushByInput(ha.be.input.keybGlobal);
// 	ha.be.input.flushByType('keyb');
// }

// const GetKey = (): string => {
// 	return ha.be.input.keybGlobal.key;
// }

// const KeybDiPencet = (key: string = ''): boolean => {
// 	if ("" == key) {
// 		return ha.be.input.keybGlobal.isDown;
// 	}
// 	else {
// 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// 		if (input) {
// 			return input.isDown;
// 		}

// 		return false;
// 	}
// }

// const KeybHit = (key: string = ''): number => {
// 	if ("" == key) {
// 		let n: number = ha.be.input.keybGlobal.hit;
// 		ha.be.input.keybGlobal.hit = 0;
// 		return (n);
// 	}
// 	else {
// 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// 		let n: number = 0;

// 		if (input) {
// 			n = input.hit;
// 			input.hit = 0;
// 		}

// 		return n;
// 	}
// }
