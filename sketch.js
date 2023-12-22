let t; 
let speed = 0.02; // Aumenta la velocidad
let xCenter; // Posición inicial en el centro
let particles = []; // Array para almacenar las partículas
let ballOffset; // Desplazamiento horizontal de las pelotas

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  t = 0;
  xCenter = width / 2;
  ballOffset = width / 4; // Desplazamiento de las pelotas
}

function draw() {
  // Desvanece el fondo dándole una baja opacidad
  background(0, 5);

  let x1 = xCenter + ballOffset * noise(t); // Posición de la primera pelota
  let x2 = xCenter - ballOffset * noise(t); // Posición de la segunda pelota
  let y = height * noise(t + 5);
  let r = 255 * noise(t + 10);
  let g = 255 * noise(t + 15);
  let b = 255 * noise(t + 20);

  noStroke();
  fill(r, g, b);

  ellipse(x1, y, 120, 120); // Pelota original
  ellipse(x2, y, 120, 120); // Pelota invertida en el eje X

  // Genera partículas en el fondo (solo caen desde arriba)
  let particleX = map(noise(t + 30), 0, 1, 0, width); // Posición horizontal
  let particleY = 0; // Comienzan desde arriba
  let particleSize = map(noise(t + 40), 0, 1, 5, 50); // Tamaño aleatorio
  let particleColor = color(0, 255, 0, 150); // Color verde fosforescente con transparencia

  particles.push({ x: particleX, y: particleY, size: particleSize, color: particleColor });

  // Dibuja las partículas
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    fill(p.color);
    ellipse(p.x, p.y, p.size, p.size);
    p.y += 2; // Mueve las partículas hacia abajo
  }

  // Elimina las partículas que están fuera de la pantalla
  particles = particles.filter(p => p.y <= height);

  // Incrementa t con la velocidad
  t += speed;
}