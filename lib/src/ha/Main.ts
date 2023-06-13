namespace ha.be {

	export class Main {
		private static _canvasAr: IGambar[] = [];
		private static _canvasAktif: IGambar;
		private static _skalaOtomatis: boolean = true;

		private static _merah: number = 0;
		private static _hijau: number = 0;
		private static _biru: number = 0;
		private static _transparan: number = 0;

		private static warnaBackup: IWarna = {
			m: 0,
			b: 0,
			h: 0,
			t: 1
		}

		/**
		 * Handle saat window di resize
		 */
		private static windowResize(): void {
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = Main.canvasAktif.canvas;

			let cp = Main.canvasAktif.canvas.width;
			let cl = Main.canvasAktif.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			Main.canvasAktif.ratioX = ratio;
			Main.canvasAktif.ratioY = ratio;

			canvas.style.position = 'fixed';
			canvas.style.zIndex = '1';
			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}

		/**
		 * mengeset/mengembalikan Kontek yang sedang aktif
		 * 
		 * @param ctx (CanvasRenderingContext2D) | null
		 * @returns CanvasRenderingContext2D
		 */
		static Kontek(ctx?: CanvasRenderingContext2D): CanvasRenderingContext2D {
			if (ctx) {
				Main.canvasAktif.ctx = ctx;
			}

			return Main.canvasAktif.ctx;
		}

		static buatCanvas(canvasEl: HTMLCanvasElement): IGambar {
			let canvas: IGambar = {
				canvas: canvasEl,
				ctx: canvasEl.getContext('2d'),
				lebar: canvasEl.height,
				// scaleX: 1,
				// scaleY: 1,
				panjang: canvasEl.width,
				frameH: canvasEl.height,
				frameW: canvasEl.width,
				handleX: 0,
				handleY: 0,
				img: null,
				isAnim: false,
				rotasi: 0,
				alpha: 1,
				rect: Rect.create(),
				load: true,
				panjangDiSet: true,
				lebarDiSet: true,
				ratioX: 1,
				ratioY: 1
			}

			return canvas;
		}

		static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void {
			let canvas: IGambar = Main.buatCanvas(canvasBelakang);
			Main._canvasAr.push(canvas);

			canvas = Main.buatCanvas(canvasDepan);
			Main._canvasAr.push(canvas);

			Main.canvasAktif = canvas;
		}

		static backupWarna(): void {
			Main.warnaBackup.b = Main.biru;
			Main.warnaBackup.h = Main.hijau;
			Main.warnaBackup.m = Main.merah;
			Main.warnaBackup.t = Main.transparan;
		}

		static restoreWarna(): void {
			Main.biru = Main.warnaBackup.b;
			Main.hijau = Main.warnaBackup.h;
			Main.merah = Main.warnaBackup.m;
			Main.transparan = Main.warnaBackup.t;
			Main.updateStyleWarna();
		}

		/**
		 * Membersihkan layar dengan warna tertentu, default hitam
		 * @param m (number) merah
		 * @param h (number) hijau
		 * @param b (b) biru
		 * @param t (t) transparan (0-100)
		 */
		static Bersih(m: number = 0, h: number = 0, b: number = 0, t: number = 100): void {
			let ctx: CanvasRenderingContext2D = Main.canvasAktif.ctx;
			Main.backupWarna();
			ctx.clearRect(0, 0, Main.canvasAktif.panjang, Main.canvasAktif.lebar);
			ctx.fillStyle = `rgba(${m}, ${h}, ${b}, ${t / 100})`;
			ctx.fillRect(0, 0, Main.canvasAktif.panjang, Main.canvasAktif.lebar);
			Main.restoreWarna();
		}

		/**
		 * Mengeset warna untuk dipakai pada perintah menggambar setelahnya
		 * @param r (number) merah
		 * @param g (number) hijau
		 * @param b (number) biru
		 * @param a (number) alpha (0-100)
		 */
		static Warna(r: number = 0, g: number = 0, b: number = 0, a: number = 100): void {
			let h = Main;

			h.merah = r;
			h.biru = b;
			h.hijau = g;
			h.transparan = a / 100;
			h.updateStyleWarna();
		}

		private static updateStyleWarna(): void {
			let ctx: CanvasRenderingContext2D = Main.canvasAktif.ctx;
			ctx.fillStyle = `rgba(${Main.merah}, ${Main.hijau}, ${Main.biru}, ${Main.transparan})`;
		}

		/**
		 * Mengembalikan warna merah dari perintah AmbilPixel terakhir
		 * @returns (number) warna merah
		 */
		static Hijau(): number {
			return Main.hijau;
		}

		/**
		 * Mengembalikan warna merah dari perintah AmbilPixel terakhir
		 * @returns (number) warna merah
		 */
		static Merah(): number {
			return Main.merah;
		}

		/**
		 * Mengembalikan warna biru dari perintah AmbilPixel terakhir
		 * @returns (number) warna biru
		 */
		static Biru(): number {
			return Main.biru;
		}

		/**
		 * 
		 * @returns 
		 */
		static Transparan(): number {
			return Math.floor(Main.transparan * 100);
		}

		/**
		 * 
		 * @returns 
		 */
		static Kanvas(): HTMLCanvasElement {
			return Main.canvasAktif.canvas;
		}

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

			Main.skalaOtomatis = fullScreen;
			// ha.be.Blijs._inputStatus = input

			//sudah diinisialisasi atau belum
			if (Main.canvasAktif) {
				console.warn('init lebih dari sekali');
				Main.Grafis2(panjang, lebar, Main.skalaOtomatis);
			}
			else {
				console.log('inisialisasi');
				Main.init(canvas, canvas);
				Main.Grafis2(panjang, lebar, Main.skalaOtomatis);

				if (input) {
					Input.init(Main.canvasAktif);
				}

				if (Main.skalaOtomatis) {
					window.onresize = (): void => {
						if (Main.skalaOtomatis) {
							Main.windowResize();
						}
					}
				}

				if (Main.skalaOtomatis) {
					Main.windowResize();
				}

				setTimeout(() => {
					if (Main.skalaOtomatis) {
						Main.windowResize();
					}
				}, 100);

				// setTimeout(() => {
				// 	ha.be.Blijs.repeat();
				// }, 0);

				//font default
				ha.be.Teks.Font("12px sans-serif");
				ha.be.Teks.Rata("center");
				Main.Warna(255, 255, 255, 100);
				Main.canvasAktif.ctx.strokeStyle = "#ffffff";
			}
		}


		static Grafis2(p: number = 320, l: number = 240, ubahStyle: boolean): void {
			let canvas: IGambar = Main.canvasAktif;

			canvas.canvas.width = p;
			canvas.canvas.height = l;

			if (ubahStyle) {
				canvas.canvas.style.width = p + 'px';
				canvas.canvas.style.height = l + 'px';
				canvas.canvas.style.padding = '0px';
				canvas.canvas.style.margin = '0px';
			}

			canvas.panjang = p;
			canvas.lebar = l;

			setTimeout(() => {
				if (Main.skalaOtomatis) {
					Main.windowResize();
				}
				else {

				}
			}, 0);

			// if (canvas2) {
			// 	Main.canvasAktif.canvas.classList.add('gl');
			// }
			// else {
			// 	Main.canvasAktif.canvas.classList.remove('gl');
			// }

			// if (skalaOtomatis) {
			// 	Main.canvasAktif.canvas.classList.add('pixel');
			// }

			// ha_blitz.Main.windowResize();
		}

		/**
		 * 
		 * @param x1 
		 * @param y1 
		 * @param x2 
		 * @param y2 
		 */
		static Garis(x1: number, y1: number, x2: number, y2: number) {
			let ctx: CanvasRenderingContext2D = Main.canvasAktif.ctx;

			x1 = Math.floor(x1);
			y1 = Math.floor(y1);
			x2 = Math.floor(x2);
			y2 = Math.floor(y2);

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}

		/**
		 * 
		 * @param x1 
		 * @param y1 
		 * @param x2 
		 * @param y2 
		 * @param isi 
		 * @param garis 
		 * @param rotasi 
		 */
		static Kotak(x1: number, y1: number, x2: number, y2: number, isi: boolean = false, garis: boolean = true, rotasi: number = 0) {
			let ctx: CanvasRenderingContext2D = Main.canvasAktif.ctx;

			//TODO: rotasi
			rotasi;

			if (isi) {
				ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
			}

			if (garis) {
				ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
			}
		}

		/**
		 * 
		 * @param x 
		 * @param y 
		 * @param radius 
		 * @param skalaX 
		 * @param skalaY 
		 * @param rotasi 
		 */
		static Oval(x: number = 0, y: number = 0, radius: number, skalaX: number = 1, skalaY = .5, rotasi: number = 0) {
			let ctx: CanvasRenderingContext2D = Main.canvasAktif.ctx;

			// save state
			ctx.save();

			// translate context
			ctx.translate(x, y);

			ctx.rotate(rotasi * (Math.PI / 180));

			// scale context horizontally
			ctx.scale(skalaX, skalaY);

			// draw circle which will be stretched into an oval
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);

			// restore to original state
			ctx.restore();

			// apply styling
			// ctx.fillStyle = '#8ED6FF';
			// ctx.fill();
			// ctx.lineWidth = 5;
			// ctx.strokeStyle = 'black';

			ctx.stroke();

			// ctx.beginPath();
			// ctx.moveTo(x - w / 2, y);
			// ctx.quadraticCurveTo(x - w / 2, y + h / 2, x, y + h / 2);
			// ctx.quadraticCurveTo(x + w / 2, y + h / 2, x + w / 2, y);
			// ctx.quadraticCurveTo(x + w / 2, y - h / 2, x, y - h / 2);
			// ctx.quadraticCurveTo(x - w / 2, y - h / 2, x - w / 2, y);
			// ctx.stroke();

		}

		// static SetBuffer(buffer: IGambar) {
		// 	Main.canvasAktif = buffer
		// }

		public static get canvasAktif(): IGambar {
			return Main._canvasAktif;
		}

		public static set canvasAktif(value: IGambar) {
			Main._canvasAktif = value;
		}

		public static get canvasAr(): IGambar[] {
			return Main._canvasAr;
		}
		public static set canvasAr(value: IGambar[]) {
			Main._canvasAr = value;
		}

		// public static get origin(): IV2D {
		// 	return Main._origin;
		// }

		// public static set origin(value: IV2D) {
		// 	Main._origin = value;
		// }

		// public static get fps(): number {
		// 	return Main._fps;
		// }

		// public static set fps(value: number) {
		// 	Main._fps = value;
		// }

		public static get skalaOtomatis(): boolean {
			return Main._skalaOtomatis;
		}

		public static set skalaOtomatis(value: boolean) {
			Main._skalaOtomatis = value;
		}

		public static get merah(): number {
			return Main._merah;
		}

		public static set merah(value: number) {
			Main._merah = value;
		}

		public static get hijau(): number {
			return Main._hijau;
		}

		public static set hijau(value: number) {
			Main._hijau = value;
		}

		public static get biru(): number {
			return Main._biru;
		}

		public static set biru(value: number) {
			Main._biru = value;
		}

		public static get transparan(): number {
			return Main._transparan;
		}

		public static set transparan(value: number) {
			Main._transparan = value;
		}
	}

	interface IWarna {
		m: number,
		h: number,
		b: number,
		t: number
	}
}