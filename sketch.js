const laneXs = [-35, 0 ,35];
let myCar, car1, car2, myCarX, car1X, car2X, newXs, fillColour, timer;

function preload() {
  timer = loadFont('roboto.ttf');
}

function car() {
    return {
        /**
         * @param {number} x
         * @param {number} y
         * @param {number} z
         */
        set coords([newX, newY, newZ]) {
            this.x = newX;
            this.y = newY;
            this.z = newZ;
        },           
        get coords() {
            return {
                x: this.x,
                y: this.y,
                z: this.z
            }
        },
        show: function() {
            push();
            translate(this.x, this.y, this.z);             
            box(20, 20, 30);
            pop();
            push();
            translate(this.x, this.y + 5, this.z - 8);              
            rotateZ(1.57);
            rotateY(frameCount);
            cylinder(5, 30);
            pop();
            push();
            translate(this.x, this.y + 5, this.z + 8);             
            rotateZ(1.57);
            rotateY(frameCount);
            cylinder(5, 30);
            pop();
        }, 
     };
}

function collisionTest(carX, emptyLane) {
    let hasCollided; 
    emptyLane === 0 && (emptyLane = 3);       

    switch (emptyLane) {
        case 1:
            carX > -33 && (hasCollided = true);            
            break;
        case 2:
            (carX < -5 || carX > 5) && (hasCollided = true);
            break;
        case 3:
            carX < 33 && (hasCollided = true);
            break; 
        default:
            hasCollided = false;   
    }

    return hasCollided;
}

function setup() {
    const canvas = createCanvas(400, 450, WEBGL);
    canvas.position(innerWidth/2 - width/2);
    myCar = car();
    car1 = car();
    car2 = car();
    newXs = [];
    car1X = laneXs[0];
    car2X = laneXs[1];
    myCarX = 0;
    fillColour = 'white';
    perspective(1, 1, 0.1, 500);
    textFont(timer);
    textSize(24);
    textAlign(LEFT, CENTER);
  }
  
function draw() {
    background(200);
    rotateX(-0.2);  
    // Road lanes
    stroke(0)
    line(-215, 20, 215, 20);
    line(-60, 20, -195, 245);
    line(-18, 20, -71, 245);
    line(18, 20, 71, 245);
    line(60, 20, 195, 245);
    // Timer
    fill(0, 250, 0);
    text(int(millis()/1000), -180, -180);
    // Traffic
    fill('white');    
    car1.coords = [car1X, 0, frameCount * 3.75];
    car1.show();
    car2.coords = [car2X, 0, frameCount * 3.75];
    car2.show();
    // My car
    fill(fillColour);
    myCar.coords = [myCarX, 0, 260];
    myCar.show();    
    // Controls
    if (keyIsDown(LEFT_ARROW)) {
        if (myCarX <= -35) {
            myCarX = -35;
        } else {
            myCarX -= 1;
        }        
    }
    if (keyIsDown(RIGHT_ARROW)) {
        if (myCarX >= 35) {
            myCarX = 35;
        } else {
            myCarX += 1;
        } 
    }
    // Set new traffic position
    if (frameCount === 120)  {
        newXs = shuffle(laneXs)
        frameCount = 0;
        car1X = newXs[0];
        car2X = newXs[1];
    }
    // Check for collisions
    if ((car1.coords.z > 230 && car1.coords.z < 260) && collisionTest(myCar.coords.x, laneXs.indexOf(newXs[2]) + 1)){        
        fillColour = 'red';
    } else {
        fillColour = 'white';
    }    
}
