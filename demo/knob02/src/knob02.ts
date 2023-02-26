Grafis(200, 200);

//buat tombol yang bisa di rotasi
let tombol: ISprite = Muat("./gbr/tombol2.png", true, 2);
Handle(tombol, 64, 64);
Posisi(tombol, 100, 100);

function Loop(): void {
	Bersih();

	Gambar(tombol);

	Tulis("Tombol ini bisa diputar", 100, 190);
}