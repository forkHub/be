Grafis(300, 300);

let jam = Muat('gbr/jam_dasar.png');
Handle(jam, 160, 160);
Posisi(jam, 150, 150);
let jarumPanjang = MuatAnimasi('gbr/jam_jarum.png', 124, 28, true, 1);
Handle(jarumPanjang, 14, 14);
Posisi(jarumPanjang, 150, 150);
let jarumPendek = Copy(jarumPanjang);
Handle(jarumPendek, 14, 14);
Posisi(jarumPendek, 150, 150);
let db = document.querySelector('div.debug');

function Loop() {
    Bersih(255, 255, 0);
    Gambar(jam);
    Gambar(jarumPanjang, 1);
    Gambar(jarumPendek, 2);
    db.innerHTML = jarumPanjang.buffer.rotasi + '';
}
