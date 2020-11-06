class MoveStraightLineBehaviour {
    constructor(form) {
        this.speed = 1;
        this.form = form;
    }

    update() {
        const myForm = this.form;

        const dx = this.speed * cos(myForm.heading);
        const dy = this.speed * sin(myForm.heading);
        myForm.x += dx;
        myForm.y += dy;
    }
}

class ConstrainToSurface {
    constructor(form, respectRadius = false) {
        this.respectRadius = respectRadius;
        this.form = form;
    }

    update() {
        const myForm = this.form;
        const r = this.respectRadius ? myForm.radius : 0;
        myForm.x = constrain(myForm.x, r,width-r);
        myForm.y = constrain(myForm.y, r,height-r);
      }
}

class CycleSurface {
    constructor(form) {
        this.form = form;
    }

    update() {
        const myForm = this.form;
        const r = this.respectRadius ? myForm.radius : 0;
        if (myForm.x > width) {
            myForm.x = 0;
        } else if (myForm.x < 0) {
            myForm.x = width;
        }
  
        if (myForm.y > height) {
            myForm.y = 0;
        } else if (myForm.y < 0) {
            myForm.y = height;
        }
      }
}

class ChangeDirectionWhileTouchingAnother {
    constructor(form, deltaAng = TWO_PI / 360, randomized = false, signalCol = color(0,50,50)) {
        this.form = form;
        this.signalCol = signalCol;
        this.deltaAngle = randomized ? random(deltaAng*2): deltaAng;
    }

    update(touchedElements) {
        const myForm = this.form;
        touchedElements.forEach((el) => myForm.heading += this.deltaAngle);
    }

    draw(currentlyTouchingElements) {
        if (!currentlyTouchingElements) return;
        push();
        stroke(this.signalCol);
        currentlyTouchingElements.forEach(anotherEl => line(this.form.x, this.form.y, anotherEl.form.x, anotherEl.form.y));
        pop();
    }
}

class MoveAwayWhileTouchingAnother {
    constructor(form, speed = 0.1, signalCol = color(100,50,50)) {
        this.form = form;
        this.speed = speed;
        this.signalCol = signalCol;
    }

    update(touchedElements) {
        const myForm = this.form;
        touchedElements.forEach((anotherEl) => {
            const anotherForm = anotherEl.form;
            const movementAway = moveAwayFrom(myForm, anotherForm);
            myForm.x += this.speed * movementAway.x;
            myForm.y += this.speed * movementAway.y;    
        });
    }

    draw(currentlyTouchingElements) {
        if (!currentlyTouchingElements) return;
        const myForm = this.form;
        push();
        stroke(this.signalCol);
        currentlyTouchingElements.forEach(
            anotherElement => {
                const anotherForm = anotherElement.form;
                const vecAway = moveAwayFrom(myForm, anotherForm).mult(this.form.radius);
                const end = createVector(myForm.x + vecAway.x, myForm.y + vecAway.y);
                
                push();
                translate(end.x, end.y);
                rotate(vecAway.heading());
                const height = 7;
                triangle(0,-height/2, 0, height/2, height, 0);
                pop();
            }
        );
        pop();
    }
}