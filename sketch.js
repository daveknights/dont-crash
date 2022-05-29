const laneXs = [-35, 0 ,35];
let carX, car1X, car2X, newXs, fillColour, timer;

function preload() {
  timer = loadFont('roboto.ttf');
}

function setup() {
    const canvas = createCanvas(400, 450, WEBGL);
    canvas.position(innerWidth/2 - width/2);
    newXs = [];
    car1X = laneXs[0];
    car2X = laneXs[1];
    carX = 0;
    fillColour = 'white';
    perspective(1, 1, 0.1, 500);
    textFont(timer);
    textSize(24);
    textAlign(LEFT, CENTER);
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
            (carX < -2 || carX > 37) && (hasCollided = true);           
            break;
        case 3:
            carX < 33 && (hasCollided = true);
            break; 
        default:
            hasCollided = false;   
    }

    return hasCollided;
}
  
function draw() {
    const myCar = car();
    const car1 = car();
    const car2 = car();

    background(200);    
    rotateX(-0.2);  

    stroke(0)
    line(-215, 20, 215, 20);
    line(-60, 20, -195, 245);
    line(-18, 20, -71, 245);
    line(18, 20, 71, 245);
    line(60, 20, 195, 245);

    fill(0, 250, 0);
    text(int(millis()/1000), -180, -180);

    fill('white');    
    car1.coords = [car1X, 0, frameCount * 3.75];
    car1.show();
    car2.coords = [car2X, 0, frameCount * 3.75];
    car2.show();

    fill(fillColour);
    myCar.coords = [carX, 0, 260];
    myCar.show();    

    if (keyIsDown(LEFT_ARROW)) {
        if (carX < -35) {
            cax = -35;
        } else {
            carX -= 1;
        }        
    }
    if (keyIsDown(RIGHT_ARROW)) {
        if (carX > 35) {
            cax = 35;
        } else {
            carX += 1;
        } 
    }
    if (frameCount === 120)  {
        newXs = shuffle(laneXs)
        frameCount = 0;
        car1X = newXs[0];
        car2X = newXs[1];
    }

    if ((car1.coords.z > 230 && car1.coords.z < 260) && collisionTest(myCar.coords.x, laneXs.indexOf(newXs[2]) + 1)){        
        fillColour = 'red';
    } else {
        fillColour = 'white';
    }    
}
