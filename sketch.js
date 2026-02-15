// Mariam Barakat - mb10568
let binaryGrid = []; // Array to store all Bit objects
let humanWords = ["HEART", "SOUL", "FEEL", "LOVE", "WANT", "PAIN", "HOPE"]; // Semantic data pool
let gridSpacing = 25; // Pixel distance between each text element

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER); // Ensures text is centered on its grid coordinate
  
  // NESTED LOOP: Populates the canvas with Bit objects in a grid layout
  for (let x = gridSpacing/2; x < width; x += gridSpacing) {
    for (let y = gridSpacing/2; y < height; y += gridSpacing) {
      binaryGrid.push(new Bit(x, y));
    }
  }
}

function draw() {
  background(5, 10, 5); // Deep green-black for a terminal aesthetic

  // Iterate through the array to update logic and render each object
  for (let b of binaryGrid) {
    b.update();
    b.display();
  }
}

//Class representing a single unit of data on the grid.
class Bit {
  constructor(x, y) {
    this.pos = createVector(x, y); // Position of the text
    this.binaryState = round(random(1)).toString(); // Initial 0 or 1
    this.currentText = this.binaryState; // Current string being displayed
  }

  update() {
    // 1. FLICKERING: 
    // Small probability to flip bits, simulating active data processing
    if (random(1) < 0.02) {
      this.binaryState = this.binaryState === "0" ? "1" : "0";
    }

    // 2. COORDINATE NORMALIZATION:
    // Transforms pixel coordinates into a math-friendly scale (-x to +x) centered on the mouse position.
    let x = (this.pos.x - mouseX) / 150; 
    let y = (this.pos.y - mouseY) / 150;
    
    // 3. ALGEBRAIC HEART CURVE:
    // Formula: (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
    // If the result is negative, the coordinate is inside the heart shape.
    let heartEquation = pow(x*x + pow(-y, 2) - 1, 3) - pow(x, 2) * pow(-y, 3);

    // INTERACTION LOGIC
    if (mouseIsPressed && heartEquation < 0) {
      // If inside the heart boundary, reveal a human word
      // 'frameCount % 20' creates a shifting glitch effect within the heart
      if (this.currentText.length === 1 || frameCount % 20 === 0) {
        this.currentText = random(humanWords);
      }
    } else {
      // Revert to background binary logic
      this.currentText = this.binaryState;
    }
  }

  display() {
    // 4. TRIGONOMETRIC PULSING:
    // Uses a sine wave to cycle brightness based on time and X-position
    let pulse = sin(frameCount * 0.05 + this.pos.x * 0.02);
    let brightness = map(pulse, -1, 1, 60, 200);
    
    // 5. DYNAMIC TYPOGRAPHY:
    // Toggles font and color based on whether the data is 'Machine' or 'Human'
    if (this.currentText.length > 1) {
      // Human Layer: Pink, Larger, Serif
      fill(255, 50, 100); 
      textSize(14);
      textFont("Georgia");
    } else {
      // Machine Layer: Green, Smaller, Monospaced
      fill(0, brightness, brightness / 2);
      textSize(10);
      textFont("Courier New");
    }
    
    // Render the text at the calculated position
    text(this.currentText, this.pos.x, this.pos.y);
  }
}