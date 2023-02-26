Grafis(160, 160);

let jam: ISprite = Muat('gbr/jam.png');
Handle(jam, 64, 64);
Posisi(jam, 80, 80);

let jarumPanjang: ISprite = Muat('gbr/jarum_panjang.png', true, 2);
Handle(jarumPanjang, 5, 50);
Posisi(jarumPanjang, 80, 80);

let jarumPendek: ISprite = Muat('gbr/jarum_pendek.png', true, 2);
Handle(jarumPendek, 5, 30);
Posisi(jarumPendek, 80, 80);

function Loop(): void {
	Bersih();

	Gambar(jam);
	Gambar(jarumPanjang);
	Gambar(jarumPendek);
}
