

namespace ha.be {

	/**
	 * Depecreated dan akan digabung ke Main
	 * */
	export class Blijs {
		private static _skalaOtomatis: boolean = true;
		// private static _inputStatus: boolean = true;
		// public static get inputStatus(): boolean {
		// 	return Blijs._inputStatus;
		// }
		// public static set inputStatus(value: boolean) {
		// 	Blijs._inputStatus = value;
		// }

		/**
		 * Setup Blitz Edu
		 * @param panjang (angka) panjang dari kanvas
		 * @param lebar (angka) lebar dari kanvs
		 * @param canvas (HTMLCanvasElement) referensi ke kanvas
		 * @param fullScreen (boolean) apakah akan men-skala kanvas mengikuti ukuran layar/fullscreen  
		 * @returns 
		 */
		static Grafis(panjang: number = 320, lebar: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true, input: boolean = true) {

			//coba cari canvas
			if (!canvas) {
				canvas = document.body.querySelector('canvas') as HTMLCanvasElement;
			}

			if (!canvas) {
				document.body.appendChild(document.createElement('canvas'));
			}

			ha.be.Blijs.skalaOtomatis = fullScreen;
			// ha.be.Blijs._inputStatus = input

			//sudah diinisialisasi atau belum
			if (ha.be.Main.canvasAktif) {
				console.warn('init lebih dari sekali');
				ha.be.Main.Grafis(panjang, lebar, ha.be.Blijs.skalaOtomatis);
			}
			else {
				console.log('inisialisasi');
				ha.be.Main.init(canvas, canvas);
				ha.be.Main.Grafis(panjang, lebar, ha.be.Blijs.skalaOtomatis);

				if (input) {
					ha.be.input.init(ha.be.Main.canvasAktif);
				}

				if (ha.be.Blijs.skalaOtomatis) {
					window.onresize = (): void => {
						if (ha.be.Blijs.skalaOtomatis) {
							ha.be.Blijs.windowResize();
						}
					}
				}

				if (ha.be.Blijs.skalaOtomatis) {
					ha.be.Blijs.windowResize();
				}

				setTimeout(() => {
					if (ha.be.Blijs.skalaOtomatis) {
						ha.be.Blijs.windowResize();
					}
				}, 100);

				// setTimeout(() => {
				// 	ha.be.Blijs.repeat();
				// }, 0);

				//font default
				ha.be.Teks.font("12px sans-serif");
				ha.be.Teks.rata("center");
				ha.be.Main.Warna(255, 255, 255, 100);
				ha.be.Main.canvasAktif.ctx.strokeStyle = "#ffffff";
			}
		}

		/** depecreated */
		// static loop(): void {
		// 	let _window: any = window;
		// 	if (typeof (_window.Loop) == 'function') {
		// 		//TODO: pre loop
		// 		_window.Loop();
		// 		//TODO: post loop
		// 	}
		// 	else if (typeof (_window.Update) == 'function') {
		// 		//TODO: pre loop
		// 		_window.Update();
		// 		//TODO: post loop

		// 	}
		// }

		/** depecreated */
		// static repeat() {
		// 	//check semua image sudah diload

		// 	ha.be.Blijs.loop();

		// 	setTimeout(() => {
		// 		// requestAnimationFrame(() => {
		// 		// 	ha.be.Blijs.repeat();
		// 		// });
		// 		requestAnimationFrame(ha.be.Blijs.repeat);
		// 	}, ha.be.Main.fps);
		// }

		/**
		 * Handle saat window di resize
		 */
		static windowResize(): void {
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = ha.be.Main.canvasAktif.canvas;

			let cp = ha.be.Main.canvasAktif.canvas.width;
			let cl = ha.be.Main.canvasAktif.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			ha.be.Main.canvasAktif.ratioX = ratio;
			ha.be.Main.canvasAktif.ratioY = ratio;

			canvas.style.position = 'fixed';
			canvas.style.zIndex = '9999';
			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}

		public static get skalaOtomatis(): boolean {
			return Blijs._skalaOtomatis;
		}
		public static set skalaOtomatis(value: boolean) {
			Blijs._skalaOtomatis = value;
		}

	}
}

// setTimeout(() => {
// 	ha.be.Blijs.init()
// }, 0);