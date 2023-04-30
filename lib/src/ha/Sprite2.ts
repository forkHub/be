namespace ha {
	enum TypeDrag {
		drag = 1,
		rotasi = 2
	}

	class Sprite2 {
		inputDown(pos: any, id: number): void {
			console.debug('input down');

			// ha.Sprite.daftar.forEach((item: ISprite) => {
			// 	item.down = false;
			// });

			//sprite down
			for (let i: number = ha.Sprite.daftar.length - 1; i >= 0; i--) {
				let item: ISprite;

				item = ha.Sprite.daftar[i];

				if (ha.be.Image.dotDidalamGambar(item.buffer, item.x, item.y, pos.x, pos.y)) {

					item.down = true;
					item.dragStartX = pos.x - item.x;
					item.dragStartY = pos.y - item.y;
					item.inputId = id;

					item.sudutTekanAwal = ha.Transform.deg(pos.x - item.x, pos.y - item.y);
					item.sudutAwal = item.buffer.rotasi;

					return;
				}
			}
		}

		inputMove(pos: any, pointerId: number): void {
			ha.Sprite.daftar.forEach((item: ISprite) => {

				if (item.down && item.dragable && (item.inputId == pointerId)) {
					item.dragged = true;

					if (item.tipeDrag == TypeDrag.drag) {
						item.x = pos.x - item.dragStartX
						item.y = pos.y - item.dragStartY
					}
					else if (item.tipeDrag == TypeDrag.rotasi) {
						//TODO: peruban sudut
						let sudut2: number = ha.Transform.deg(pos.x - item.x, pos.y - item.y);
						let perbedaan: number = sudut2 - item.sudutTekanAwal;
						item.buffer.rotasi = item.sudutAwal + perbedaan;

						// console.debug('item drag move');
						// console.debug('sudut ptr: ' + sudut2);
						// console.debug('perbedaan: ' + perbedaan);
						// console.debug('item rotasi: ' + item.buffer.rotasi);
					}

				}
			});
		}

		inputUp(): void {
			ha.Sprite.daftar.forEach((item: ISprite) => {
				if (item.down) {
					item.hit++;
				}

				if (item.dragged) {
					console.log('input up: item rotasi ' + item.buffer.rotasi)
				}

				item.down = false;
				item.dragged = false;
			});
		}
	}

	export const sprite2: Sprite2 = new Sprite2();
}