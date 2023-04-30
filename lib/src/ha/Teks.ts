namespace ha.be {
	export class Teks {

		private static get ctx(): CanvasRenderingContext2D {
			return Main.canvasAktif.ctx;
		}

		static font(font: string = '30px Arial'): void {
			Teks.ctx.font = font;
		}

		static rata(rata: CanvasTextAlign = "left"): void {
			Teks.ctx.textAlign = rata;
		}

		static tulis(teks: string, x: number, y: number, warna: boolean = true, garis: boolean = false): void {

			if (warna) {
				Teks.ctx.fillText(teks, x, y);
			}

			if (garis) {
				Teks.ctx.strokeText(teks, x, y);
			}
		}

	}
}