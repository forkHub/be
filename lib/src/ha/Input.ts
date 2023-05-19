//TODO: depecreated
enum EInput {
	TOUCH = 'touch',
	MOUSE = 'mouse',
	KEYB = 'keyb',
	DEF = ''
}

//TODO: use static
namespace ha.be {

	/**
	 * Input
	 */
	class Input {
		private _inputs: IInput[] = [];	//any input,

		// private _touchGlobal: IInput;	//global touch
		// private _mouseGlobal: IInput;	//global mouse
		// private _keybGlobal: IInput;	//global keyb
		private _inputGlobal: IInput;	//global input

		private _event: EventHandler = new EventHandler();

		constructor() {
			// this._touchGlobal = this.buatInputDefault();
			// this._mouseGlobal = this.buatInputDefault();
			// this._keybGlobal = this.buatInputDefault();
			this._inputGlobal = this.buatInputDefault();

			// this._touchGlobal.type = EInput.TOUCH;
			// this._keybGlobal.type = EInput.KEYB;
			// this._mouseGlobal.type = EInput.MOUSE;
		}

		/**
		 * (depecreated) type input dari event terkhir
		 * @returns (EInput) 
		 */
		InputType(): EInput {
			return input.inputGlobal.type;
		}

		/**
		 * berapa kali pointer di tap sejak terakhir kali perintah dipanggil
		 * @returns (number)
		 */
		InputHit(): number {
			let hit: number = input.inputGlobal.hit;
			input.inputGlobal.hit = 0;

			return hit;
		}

		/**
		 * posisi x pointer
		 * @returns (number)
		 */
		InputX(): number {
			return input.inputGlobal.x;
		}

		/**
		 * posisi y pointer
		 * @returns 
		 */
		InputY(): number {
			return input.inputGlobal.y;
		}

		/**
		 * berapa jauh pointer digeser sejajar sumbu x
		 * @returns (number)
		 */
		GeserX(): number {
			return input.inputGlobal.xDrag
		}

		/**
		 * berapa jauh pointer di drag sejajar sumbu y
		 * @returns (number)
		 */
		GeserY(): number {
			return input.inputGlobal.yDrag
		}

		/**
		 * menghapus data input
		 */
		FlushInput(): void {
			input.flush();
		}

		/**
		 * mengecek apakah pointer sedang ditekan
		 * @returns (boolean) 
		 */
		Pencet(): boolean {
			return input.inputGlobal.isDown;
		}

		/**
		 * mengecheck apakah pointer sedang di drag
		 * @returns (boolean)
		 */
		Geser(): boolean {
			return input.inputGlobal.isDrag;
		}

		private getMouseKeyId(e: PointerEvent): string {
			if (e.pointerType == 'touch') {
				return e.pointerId + '';
			}
			else if (e.pointerType == 'mouse') {
				return e.button + '';
			}

			throw Error('');
		}

		init(buffer: IGambar): void {
			console.log('input init');

			buffer.canvas.style.touchAction = 'none';

			buffer.canvas.onpointerdown = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();

				let pos: any = ha.be.input.pos(e.clientX, e.clientY, buffer);
				let key: string = this.getMouseKeyId(e);
				let input: IInput = ha.be.input.baru(key, e.pointerType as EInput);

				ha.be.input.event.down(input, key, e.pointerType as EInput, pos);
				ha.be.input.event.down(this._inputGlobal, key, e.pointerType as EInput, pos);

				// if ("mouse" == e.pointerType) ha.be.input.event.down(this._mouseGlobal, key, EInput.MOUSE, pos);
				// if ("touch" == e.pointerType) ha.be.input.event.down(this._touchGlobal, key, EInput.TOUCH, pos);

				ha.sprInteraksi.inputDown(pos, e.pointerId);
			}

			buffer.canvas.onpointermove = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();

				let pos: any = ha.be.input.pos(e.clientX, e.clientY, buffer);
				let key: string = this.getMouseKeyId(e);
				let input: IInput = this.baru(key, e.pointerType as EInput);

				ha.be.input.event.move(input, buffer, e);
				ha.be.input.event.move(this.inputGlobal, buffer, e);

				// if (e.pointerType == 'touch') ha.be.input.event.move(ha.be.input.touchGlobal, buffer, e);
				// if (e.pointerType == 'mouse') ha.be.input.event.move(ha.be.input.mouseGlobal, buffer, e);

				//sprite
				ha.sprInteraksi.inputMove(pos, e.pointerId);
			}

			buffer.canvas.onpointerout = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();

				let key: string = ha.be.input.getMouseKeyId(e);
				let input: IInput = ha.be.input.baru(key, e.pointerType as EInput);

				ha.be.input.event.up(input);
				ha.be.input.event.up(ha.be.input.inputGlobal);

				// if (e.pointerType == 'touch') ha.be.input.event.up(ha.be.input.touchGlobal);
				// if (e.pointerType == 'mouse') ha.be.input.event.up(ha.be.input.mouseGlobal);
			}

			buffer.canvas.onpointercancel = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();
			}

			buffer.canvas.onpointerup = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();

				let key: string = this.getMouseKeyId(e);
				let input: IInput = this.baru(key, e.pointerType as EInput);

				ha.be.input.event.up(input);
				ha.be.input.event.up(this.inputGlobal);
				// if (e.pointerType == 'touch') ha.be.input.event.up(ha.be.input.touchGlobal);
				// if (e.pointerType == 'mouse') ha.be.input.event.up(ha.be.input.mouseGlobal);

				//sprite up
				//sprite hit
				ha.Sprite.daftar.forEach((item: ISprite) => {
					if (e.pointerId == item.inputId) {
						if (item.down) {
							item.hit++;
						}

						item.down = false;
						item.dragged = false;
					}
				});
			}

			// window.onkeydown = (e: KeyboardEvent) => {
			// 	// e.stopPropagation();
			// 	// e.preventDefault();

			// 	let input: IInput = ha.be.input.baru(e.key + '', EInput.KEYB);
			// 	ha.be.input.event.down(input, e.key, EInput.KEYB, ha.be.Point.create());
			// 	ha.be.input.event.down(this.inputGlobal, e.key, EInput.KEYB, ha.be.Point.create());
			// 	// ha.be.input.event.down(this._keybGlobal, e.key, EInput.KEYB, ha.be.Point.create());

			// 	// console.log('keydown');
			// };

			// window.onkeyup = (e: KeyboardEvent) => {
			// 	// e.stopPropagation();

			// 	let input: IInput = ha.be.input.baru(e.key + '', EInput.KEYB);
			// 	ha.be.input.event.up(input);
			// 	ha.be.input.event.up(this.inputGlobal);
			// 	// ha.be.input.event.up(this._keybGlobal);
			// }
		}

		private buatInputDefault(): IInput {
			return {
				id: 0,
				isDown: false,
				isDrag: false,
				// isHit: false,
				isTap: false,
				key: '',
				timerEnd: 0,
				timerStart: 0,
				type: EInput.DEF,
				x: 0,
				xDrag: 0,
				xStart: 0,
				y: 0,
				yDrag: 0,
				yStart: 0,
				hit: 0
			}
		}

		// private reset(input: IInput) {
		// 	input.id = 0;
		// 	input.isDown = false;
		// 	input.isDrag = false;
		// 	// input.isHit = false;
		// 	input.isTap = false;
		// 	input.key = '';
		// 	input.timerEnd = 0;
		// 	input.timerStart = 0;
		// 	input.type = EInput.DEF;
		// 	input.x = 0;
		// 	input.y = 0;
		// 	input.xDrag = 0;
		// 	input.yDrag = 0;
		// 	input.xStart = 0;
		// 	input.yStart = 0;
		// }

		private flush(): void {
			while (this.inputs.length > 0) {
				this.inputs.pop();
			}
			this.flushByInput(this._inputGlobal);
			// this.flushByInput(this._mouseGlobal);
			// this.flushByInput(this._touchGlobal);
			// this.flushByInput(this._keybGlobal);
		}

		// flushByType(type: string): void {
		// 	this._inputs.forEach((input: IInput) => {
		// 		if (type == input.type) {
		// 			this.flushByInput(input);
		// 		}
		// 	});
		// }

		private flushByInput(input: IInput): void {
			input.isDown = false;
			input.isDrag = false;
			// input.isHit = false;
			input.isTap = false;
			input.hit = 0;
		}

		private getInput(key: string, inputType: string): IInput {
			let inputHasil: IInput;

			for (let i: number = 0; i < this.inputs.length; i++) {
				let input: IInput = this.inputs[i];
				if (input.type == inputType && input.key == key) {
					inputHasil = input;
					return inputHasil;
				}
			}

			return inputHasil;
		}

		private baru(keyId: string, inputType: EInput): IInput {
			let input: IInput = this.getInput(keyId, inputType);

			if (!input) {
				input = {
					key: keyId,
					type: inputType,
					isDown: false,
					isDrag: false,
					isTap: false,
					timerEnd: 0,
					timerStart: 0,
					x: 0,
					xDrag: 0,
					xStart: 0,
					y: 0,
					yDrag: 0,
					yStart: 0,
					id: 0,
					hit: 0
				}

				this.inputs.push(input);
			}

			return input;
		}

		pos = (cx: number, cy: number, buffer: IGambar) => {
			let rect: DOMRect = buffer.canvas.getBoundingClientRect();

			let canvasScaleX = parseInt(window.getComputedStyle(buffer.canvas).width) / buffer.canvas.width;
			let canvasScaleY = parseInt(window.getComputedStyle(buffer.canvas).height) / buffer.canvas.height;

			let poslx: number = Math.floor((cx - rect.x) / canvasScaleX);
			let posly: number = Math.floor((cy - rect.y) / canvasScaleY);

			return {
				x: poslx,
				y: posly
			}
		}

		public get inputs(): IInput[] {
			return this._inputs;
		}

		public get event(): EventHandler {
			return this._event;
		}

		// public get touchGlobal(): IInput {
		// 	return this._touchGlobal;
		// }

		// public get mouseGlobal(): IInput {
		// 	return this._mouseGlobal;
		// }

		// public get keybGlobal(): IInput {
		// 	return this._keybGlobal;
		// }

		public get inputGlobal(): IInput {
			return this._inputGlobal;
		}

	}

	class EventHandler {

		move(input: IInput, buffer: IGambar, e: PointerEvent): void {
			let pos: any = ha.be.input.pos(e.clientX, e.clientY, buffer);
			input.x = pos.x;
			input.y = pos.y;
			input.id = e.pointerId;

			if (input.isDown) {
				input.isDrag = true;
				input.xDrag = input.x - input.xStart;
				input.yDrag = input.y - input.yStart;
			}


		}

		down(input: IInput, key: string, type: EInput, pos: IV2D): void {

			//TODO: refaktor 
			if (!input.isDown) {
				input.hit++;
			}

			input.xStart = pos.x
			input.yStart = pos.y;
			input.x = pos.x;
			input.y = pos.y;
			input.isDown = true;
			input.isTap = false;
			input.isDrag = false;
			input.key = key;
			input.type = type;
			input.timerStart = Date.now();
		}

		up(input: IInput): void {
			input.isDown = false;
			input.isDrag = false;
			input.timerEnd = Date.now();
			input.isTap = ((input.timerEnd - input.timerStart) < 500);
		}

	}

	export const input: Input = new Input();
}