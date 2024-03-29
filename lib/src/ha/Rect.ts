namespace ha.be {
	/** internal class untuk menghandle geometri 
	 * Kotak
	 * 
	 */
	export class Rect {

		static create(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): IRect {
			let r: IRect = {}
			r.vs = [];
			r.vs.push(Point.create(x1, y1));
			r.vs.push(Point.create(x2, y1));
			r.vs.push(Point.create(x2, y2));
			r.vs.push(Point.create(x1, y2));

			r.segs = [];
			r.segs.push(Segment.create(r.vs[0], r.vs[1]));
			r.segs.push(Segment.create(r.vs[1], r.vs[2]));
			r.segs.push(Segment.create(r.vs[2], r.vs[3]));
			r.segs.push(Segment.create(r.vs[3], r.vs[0]));

			return r;
		}

		private static copy(r: IRect): IRect {
			// console.log('copy:');
			// console.log(r.vs);

			// let hasil: IRect = Rect.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
			let hasil: IRect = Rect.create();
			Rect.copyInfo(r, hasil);

			// console.log(hasil.vs);

			return hasil;
		}

		private static copyInfo(r1: IRect, r2: IRect): void {
			for (let i: number = 0; i < r1.segs.length; i++) {
				Segment.copy(r1.segs[i], r2.segs[i]);
			}
		}

		private static collideBound(r1: IRect, r2: IRect): boolean {
			// console.debug('collide bound');

			if (Rect.maxX(r1) < Rect.minX(r2)) {
				// console.debug('maxX gagal');
				return false;
			}

			// console.log('maxx ' + Rect.maxX(r1));
			// console.log('minx ' + Rect.minX(r2));

			if (Rect.minX(r1) > Rect.maxX(r2)) {
				// console.debug('min x gagal');
				return false;
			}

			if (Rect.maxY(r1) < Rect.minY(r2)) {
				// console.debug('max y gagal');
				return false;
			}

			if (Rect.minY(r1) > Rect.maxY(r2)) {
				// console.debug('min y gagal');
				return false;
			}

			return true;
		}

		static collide(r1: IRect, r2: IRect): boolean {
			let bound: boolean = Rect.collideBound(r1, r2);
			if (!bound) return false;

			for (let i: number = 0; i < r1.segs.length; i++) {
				for (let j: number = 0; j < r2.segs.length; j++) {
					if (Segment.collide(r1.segs[i], r2.segs[j])) {
						return true;
					}
				}
			}

			return false;
		}

		private static collideDotBound(r: IRect, d: IPoint2D): boolean {
			if (d.x < Rect.minX(r)) {
				// console.log('minx failed');
				return false;
			}

			if (d.x > Rect.maxX(r)) {
				// console.log('maxX failed');
				// console.log(d);
				// console.log(Rect.maxX(r));
				// console.log(r.vs);
				return false;
			}

			if (d.y < Rect.minY(r)) {
				// console.log('minY failed');
				return false;
			}

			if (d.y > Rect.maxY(r)) {
				// console.log('maxY failed');
				return false;
			}

			return true;
		}

		static collideDot(r: IRect, x: number, y: number): boolean {
			let r2: IRect = Rect.copy(r);
			let p: IPoint2D = Point.create(x, y);
			let d: number = Segment.deg(r2.segs[0]);
			let pRot: IPoint2D = r2.vs[0];

			if (!Rect.collideDotBound(r, p)) {
				return false;
			}

			Rect.rotate(r2, -d, pRot.x, pRot.y, false);
			Point.putarPoros(p, pRot.x, pRot.y, -d);

			if (!Rect.collideDotBound(r2, p)) {
				// console.log('collide bound 2 failed');
				// console.log('deg ' + d);
				// console.log('rect');
				// console.log(r2);
				return false;
			}

			return true;
		}

		private static minX(r: IRect): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: IPoint2D) => {
				if (item.x < x) x = item.x
			})

			return x;
		}

		private static maxX(r: IRect): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: IPoint2D) => {
				if (item.x > x) x = item.x
			})

			return x;
		}

		private static minY(r: IRect): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: IPoint2D) => {
				if (item.y < y) y = item.y
			})

			return y;
		}

		private static maxY(r: IRect): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: IPoint2D) => {
				if (item.y > y) y = item.y
			})

			return y;
		}

		// static scale(r: IRect): void {
		// 	r;
		// }

		static translate(rect: IRect, x: number, y: number): void {
			rect.vs.forEach((v: IPoint2D) => {
				v.x += x;
				v.y += y;
			})
		}

		static rotate(r: IRect, deg: number, xc: number = 0, yc: number, copy: boolean = true): IRect {
			let r2: IRect;

			if (copy) {
				r2 = Rect.copy(r);
			}
			else {
				r2 = r;
			}

			r2.vs.forEach((p: IPoint2D) => {
				Point.putarPoros(p, xc, yc, deg);
			});

			return r2;
		}

	}

	// export var rect: Rect = new Rect();
}