let kalemRengi = "#000000";
let silgiRengi = '#ffffff';
let kalemBoyutu = 1;
let cizimModu = true;
let fosforluKalemAktif = false;
let silmeModu = false;
let canvas = new fabric.Canvas('canvas');
let renkSecBtn = document.getElementById('renkSecBtn');
let canvasGecmisi = [];
var isRedoing = false;

function boyutlariAyarla() {
    canvas.setWidth(window.innerWidth);
    canvas.setHeight(window.innerHeight);
}

window.addEventListener('resize', function() {
    boyutlariAyarla();
});

boyutlariAyarla();

canvas.isDrawingMode = false
canvas.freeDrawingBrush.width = kalemBoyutu;
canvas.freeDrawingBrush.color = kalemRengi;


canvas.on('object:added', function() {
    if (!isRedoing) {
        canvasGecmisi = [];
    }
    isRedoing = false;
});

document.getElementById('geriAlBtn').addEventListener('click', () => {
    if (canvas._objects.length > 0) {
        canvasGecmisi.push(canvas._objects.pop());
        canvas.renderAll();
    }
});

document.getElementById('ileriAlBtn').addEventListener('click', () => {
    if (canvasGecmisi.length > 0) {
        isRedoing = true;
        canvas.add(canvasGecmisi.pop());
    }
});


function renkDegistir(renk) {
    if (cizimModu) {
        kalemRengi = renk;
        canvas.freeDrawingBrush.color = kalemRengi;
        if (fosforluKalemAktif) {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = kalemRengi + 60;
        } else {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = kalemRengi;
        }
    }
}

function boyutDegistir(boyut) {
    kalemBoyutu = parseInt(boyut);
    canvas.freeDrawingBrush.width = kalemBoyutu;
}

function silgiCiz() {
    fosforluKalemAktif = false;
    cizimModu = false;
    silmeModu = true;
    canvas.isDrawingMode = false;
    canvas.freeDrawingBrush.color = silgiRengi;
    canvas.freeDrawingBrush.width = kalemBoyutu * 5;
}

function temizle() {
    fosforluKalemAktif = false;
    cizimModu = false;
    silmeModu = true;
    canvas.isDrawingMode = false;
    canvas.freeDrawingBrush.color = silgiRengi;
    canvas.clear();
}

function kalem() {
    fosforluKalemAktif = false;
    cizimModu = true;
    silmeModu = false;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = kalemRengi;
    canvas.freeDrawingBrush.width = kalemBoyutu;
}

function fosforluKalem() {
    fosforluKalemAktif = true;
    cizimModu = true;
    silmeModu = false;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = kalemRengi + 60;
}

function silgi() {
    fosforluKalemAktif = false;
    cizimModu = false;
    silmeModu = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = silgiRengi;
    canvas.freeDrawingBrush.width = kalemBoyutu * 5;
}

function tasi() {
    cizimModu = false;
    silmeModu = true;
    canvas.isDrawingMode = false;
}


function dikdortgenCiz() {
    fosforluKalemAktif = false;
    cizimModu = true;
    silmeModu = false;
    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.defaultCursor = 'crosshair';
    canvas.forEachObject(function(obj) {
        obj.selectable = false;
    });

    let dikdortgen;
    canvas.on('mouse:down', function(event) {
        if (cizimModu && event.e.which === 1) {
            let pointer = canvas.getPointer(event.e);
            let startX = pointer.x;
            let startY = pointer.y;
            dikdortgen = new fabric.Rect({
                left: startX,
                top: startY,
                width: 0,
                height: 0,
                fill: 'transparent',
                stroke: kalemRengi,
                strokeWidth: kalemBoyutu,
                selectable: false
            });
            canvas.add(dikdortgen);
        }
    });

    canvas.on('mouse:move', function(event) {
        if (cizimModu && event.e.which === 1) {
            let pointer = canvas.getPointer(event.e);
            let currentX = pointer.x;
            let currentY = pointer.y;
            let width = currentX - dikdortgen.top;
            let height = currentY - dikdortgen.top;
            dikdortgen.set({
                width: Math.abs(width),
                height: Math.abs(height),
                left: width < 0 ? currentX : dikdortgen.left,
                top: height < 0 ? currentY : dikdortgen.top
            });
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function(event) {
        if (cizimModu && event.e.which === 1) {
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.defaultCursor = 'default';
            dikdortgen.selectable = true;
            canvas.forEachObject(function(obj) {
                obj.selectable = true;
            });
            canvas.isDrawingMode = false;
        }
    });
}

function daireCiz() {
    fosforluKalemAktif = false;
    cizimModu = true;
    silmeModu = false;
    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.defaultCursor = 'crosshair';
    canvas.forEachObject(function(obj) {
        obj.selectable = false;
    });

    let daire;
    canvas.on('mouse:down', function(event) {
        if (cizimModu && event.e.which === 1) {
            let pointer = canvas.getPointer(event.e);
            let startX = pointer.x;
            let startY = pointer.y;
            daire = new fabric.Circle({
                left: startX,
                top: startY,
                radius: 1,
                fill: 'transparent',
                stroke: kalemRengi,
                strokeWidth: kalemBoyutu,
                cornerStrokeColor: kalemRengi,
                selectable: false
            });
            canvas.add(daire);
        }
    });
    canvas.on('mouse:move', function(event) {
        if (cizimModu && event.e.which === 1) {
            let pointer = canvas.getPointer(event.e);
            let currentX = pointer.x;
            let currentY = pointer.y;
            let dx = currentX - daire.left;
            let dy = currentY - daire.top;
            let radius = Math.sqrt(dx * dx + dy * dy);
            daire.set({
                radius: radius
            });
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function(event) {
        if (cizimModu && event.e.which === 1) {
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.defaultCursor = 'default';
            daire.selectable = true;
            canvas.forEachObject(function(obj) {
                obj.selectable = true;
            });
            canvas.isDrawingMode = false;
        }
    });
}


function metinEkle() {
    let metin = document.getElementById('metin').value;
    let metinNesnesi = new fabric.Text(metin, {
        left: 50,
        top: 50,
        fill: kalemRengi,
        fontSize: 24

    });
    canvas.add(metinNesnesi);
}


let renkPaleti = document.querySelector('.renk-paleti');
let renkDugmeleri = renkPaleti.querySelectorAll('.renk-dugmesi');
let mevcutRenkler = Array.from(renkDugmeleri).map((dugme) => dugme.dataset.renk);

function renkSecimiIsle(event) {
    let secilenRenk = event.target.dataset.renk;
    renkDegistir(secilenRenk);
}


renkDugmeleri.forEach((dugme) => {
    dugme.addEventListener('click', renkSecimiIsle);
});

let renkEkleBtn = document.getElementById('renkEkleBtn');

let yeniRenkler = ['#800080', '#00FFFF', '#FFC0CB', '#792408', '#db95ae', '#b8b598', '#0d4f69', '#8b1a00', '#b56614', '#e5e5e5', '#7f7778', '#133b2f', '#ff70bc', '#6c9534', '#ac0e2f', '#ff0080', '#ffff66', '#c0c0c0', '#ffd700', ];


renkEkleBtn.addEventListener('click', function() {
    let renkPaleti = document.querySelector('.renk-paleti');
    let kalanRenkSayisi = yeniRenkler.length;

    if (kalanRenkSayisi > 0) {

        let randomIndex = Math.floor(Math.random() * kalanRenkSayisi);
        let secilenRenk = yeniRenkler[randomIndex];

        let renkDugmesi = document.createElement('button');
        renkDugmesi.classList.add('renk-dugmesi');
        renkDugmesi.style.backgroundColor = secilenRenk;
        renkDugmesi.dataset.renk = secilenRenk;
        renkPaleti.appendChild(renkDugmesi);

        renkDugmesi.addEventListener('click', renkSecimiIsle);

        yeniRenkler.splice(randomIndex, 1);
    }
});

renkSecBtn.addEventListener('click', function() {
    renkPaleti.classList.toggle('open');
});