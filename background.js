const canvas = document.getElementById("bcgr");
const c = canvas.getContext("2d");
const body = document.body, html = document.documentElement;
const CANVAS_WIDTH = canvas.width = body.clientWidth;
const CANVAS_HEIGHT = canvas.height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

function Circle(x, y, dx, dy, radius, stroke) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.stroke = stroke;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.stroke;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > CANVAS_WIDTH || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > CANVAS_HEIGHT || this.y - this.radius < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let circles = [];
for (let i = 0; i < 25; i++) {
    let radius = 250;
    let x = (Math.random() * CANVAS_WIDTH) - radius;
    let y = (Math.random() * CANVAS_HEIGHT) - radius;
    let dx = (Math.random() - .5);
    let dy = (Math.random() - .5);
    const r = parseInt(Math.random() * 255);
    const g = parseInt(Math.random() * 255);
    const b = parseInt(Math.random() * 255);
    let stroke = "rgba("+r+","+g+","+b+",0.09)";
    circles.push(new Circle(x, y, dx, dy, radius, stroke));
}

function animate() {
    c.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
    requestAnimationFrame(animate);
}

animate();