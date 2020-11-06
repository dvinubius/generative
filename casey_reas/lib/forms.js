class Form {
    constructor(x,y,radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.heading = random(TWO_PI);
    }
}

class Circle extends Form { 
    constructor(x,y,radius) {
        super(x,y,radius);
    }

    draw() {
        stroke(0);
        strokeWeight(1); 
        this.drawPerimeter();
        stroke(0);
        this.drawDirectionLine();
    }

    drawDirectionLine() {
        push(); 
        translate(this.x, this.y);
        rotate(this.heading);
        line(0,0,this.radius, 0);
        pop(); 
    }

    drawPerimeter() {
        push(); 
        noFill();
        ellipse(this.x, this.y, this.radius*2, this.radius*2); 
        pop(); 
    }

    drawFill() {
        push(); 
        ellipse(this.x, this.y, this.radius*2, this.radius*2); 
        pop(); 
    }

    drawCenter() {
        push(); 
        point(this.x, this.y);
        pop(); 
    }

    get position() {
        return createVector(this.x, this.y);
    }
}
