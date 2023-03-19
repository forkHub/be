Grafis(300, 300);
const snap: number = 10;
let pos: number = 0;

let spr: ISprite = Muat("./gbr/box.png", true);
Posisi(spr, 50, 100);

function Loop(): void {
	Bersih();

	//buat posisi agar snap 
	pos = PosisiX(spr);
	pos = Math.floor(pos / snap);
	pos = pos * snap;
	PosisiX(spr, pos);

	pos = PosisiY(spr);
	pos = Math.floor(pos / snap);
	pos = pos * snap;
	PosisiY(spr, pos);

	Gambar(spr);
}