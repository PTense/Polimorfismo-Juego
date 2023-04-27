//Inicialización de variables y del arreglo "formas"
let formas = [];
radio = 50;
puntos = 0;
x = 0;
y = 0;

//Crea 10 figuras aleatorias entre circulos y rectangulos
function setup() {
  createCanvas(400, 400);
  for (n = 0; n < 10; n++) {
    if (random() < 0.5) { //Si el numero aleatorio es menor a 0.5m genera un circulo
      formas.push(new Circulo(random(width), random(height), 25));
    } else { //Si el numero aleatorio es mayor a 0.5, genera un rectangulo
      formas.push(new Rectangulo(random(width), random(height), 50, 25));
    }
  }
}

//Dibuja las formas en el canvas
function draw() {
  background(220);
  for (let forma of formas) {
    forma.draw();
  }
  
  //Muestra el puntaje en la pantalla
  fill(0);
  textSize(20);
  text("Puntos: " + puntos, 10, 30);
}

//Verifica la forma a la que se da click y aumenta o reduce el puntaje con base en la forma clickeada.
function mouseClicked() {
  for (let forma of formas) {
    if (forma.contains(mouseX, mouseY)) {
        //Click a forma Rectangle aumenta puntaje
        if(forma instanceof Rectangulo){
      puntos++;
         }
        //Click a forma Circle reduce puntaje
        if(forma instanceof Circulo){
          puntos--;
        }
      forma.onClick();
      break;
    }
  }
}

//Clase Forma y constructor
class Forma {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //Verifica si el punto dado está dentro de la forma
  contains(x, y) {
    return false;
  }

  draw() {
    fill(255, 0, 0);
  }

  onClick() {
  }
}
//Clase Circle que hereda atributos de Forma
class Circulo extends Forma {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
    this.x = constrain(random(width), this.radius, width - this.radius);
    this.y = constrain(random(height), this.radius, height - this.radius);
  }

  contains(x, y) {
    return dist(x, y, this.x, this.y) < this.radius;
  }
  
  draw() {
    super.draw();
    ellipse(this.x, this.y, this.radius * 2);
  }
   //Dibuja nueva forma ellipse en posicion aleatoria al click
  onClick() {
  let nuevoX = random(this.radius, width - this.radius);
  let nuevoY = random(this.radius, height - this.radius);
  this.x = nuevoX;
  this.y = nuevoY;
  }
}

//Clase Rectangle que hereda de Forma
class Rectangulo extends Forma {
  constructor(x, y, width, height) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.x = constrain(random(width), this.width, width - this.width);
    this.y = constrain(random(height), this.height, height - this.height);
  }

  contains(x, y) {
    return x > this.x && x < this.x + this.width &&
           y > this.y && y < this.y + this.height;
  }

  draw() {
    super.draw();
    rect(this.x, this.y, this.width, this.height);
  }
  //Dibuja nueva forma rectangle en posicion aleatoria al click 
  onClick() {
    let nuevoX = random(this.width/2, width - this.width/2);
  let nuevoY = random(this.height/2, height - this.height/2);
  this.x = nuevoX;
  this.y = nuevoY;
  }
}