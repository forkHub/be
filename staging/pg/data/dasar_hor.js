Grafis(300, 300);

let spr = Muat("./gbr/box.png", true);
Posisi(spr, 150, 100);

function Loop() {
    Bersih();

    //kunci psosi y pada posisi 100
    PosisiY(spr, 100);
    Gambar(spr);
    Tulis("Kotak ini bisa di drag horizontal", 300 / 2, 300 / 2);
}
