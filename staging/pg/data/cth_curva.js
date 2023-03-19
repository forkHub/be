Grafis(480, 640);

let spr1 = buatTombol(20, 20);
let spr2 = buatTombol(20, 100);
let spr3 = buatTombol(200, 100);
let spr4 = buatTombol(200, 20);

function Loop() {
    Bersih();
    gambarKurva();

    //gambar semua sprite
    GambarSemua();
}

function gambarKurva() {
    let ctx = Kontek();
    ctx.beginPath();
    ctx.moveTo(PosisiX(spr1), PosisiY(spr1));
    ctx.bezierCurveTo(PosisiX(spr2), PosisiY(spr2), PosisiX(spr3), PosisiY(spr3), PosisiX(spr4), PosisiY(spr4));
    ctx.stroke();
}

function buatTombol(x, y) {
    let spr = Muat("./gbr/knob_tombol.png", true);
    Handle(spr, 16, 16);
    Posisi(spr, x, y);
    return spr;
}
