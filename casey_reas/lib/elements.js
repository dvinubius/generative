class Element1 {
    constructor(x, y, radius, respectRadiusOnConstrain, changeDirDiff, moveAwayIntensityRatio) {
        this.updates = [];
        this.draws = [];
        this.form = new Circle(x,y,radius);
        this.moveAwayFact = moveAwayIntensityRatio;

        this.moveStraightBV = new MoveStraightLineBehaviour(this.form);
        this.updates.push(() => this.moveStraightBV.update());

        this.constrainToSurfaceBV = new ConstrainToSurface(this.form, respectRadiusOnConstrain);
        this.updates.push(() => this.constrainToSurfaceBV.update());

        this.changeDirectionOnTouchBV = new ChangeDirectionWhileTouchingAnother(this.form, changeDirDiff);
        this.updates.push(() => this.changeDirectionOnTouchBV.update(this.currentlyTouchingEls));
        this.draws.push(() => this.changeDirectionOnTouchBV.draw(this.currentlyTouchingEls));

        this.moveAwayOnTouchBV = new MoveAwayWhileTouchingAnother(this.form);
        this.updates.push(() => this.moveAwayOnTouchBV.update(this.currentlyTouchingEls));
        this.draws.push(() => this.moveAwayOnTouchBV.draw(this.currentlyTouchingEls));
       
    }

    set speed(val) {
        this.moveStraightBV.speed = val;
        this.moveAwayOnTouchBV.speed = val * this.moveAwayFact;
    }

    update(allElements) {
        this.currentlyTouchingEls = this.elementsThatITouch(allElements);
        this.updates.forEach(u => u());
    }

    elementsThatITouch(allElements) {
        const currentlyTouchingEls = [];
        const myForm = this.form;
        for (let i = 0; i < allElements.length; i++) {
            const anotherEl = allElements[i];
            const anotherForm = anotherEl.form;
            if (anotherForm != myForm && touchingForms(myForm, anotherForm)) {
                currentlyTouchingEls.push(anotherEl);
            }
        }
        return currentlyTouchingEls;
    }

    draw() {
        this.form.draw();
        this.draws.forEach(d => d());
    }
}

class ElementY1 {
    constructor(x, y, radius) {
        this.updates = [];
        this.draws = [];
        this.form = new Circle(x,y,radius);

        this.moveStraightBV = new MoveStraightLineBehaviour(this.form);
        this.updates.push(() => this.moveStraightBV.update());

        this.cycleSurface = new CycleSurface(this.form);
        this.updates.push(() => this.cycleSurface.update());
    }

    set speed(val) {
        this.moveStraightBV.speed = val;
    }

    update(allElements) {
        this.currentlyTouchingEls = this.elementsThatITouch(allElements);
        this.updates.forEach(u => u());
    }

    elementsThatITouch(allElements) {
        const currentlyTouchingEls = [];
        const myForm = this.form;
        for (let i = 0; i < allElements.length; i++) {
            const anotherEl = allElements[i];
            const anotherForm = anotherEl.form;
            if (anotherForm != myForm && touchingForms(myForm, anotherForm)) {
                currentlyTouchingEls.push(anotherEl);
            }
        }
        return currentlyTouchingEls;
    }

    draw() {
        this.form.draw();
        this.draws.forEach(d => d());
    }
}

class ElementX1 {
    constructor(x, y, radius, moveAwayIntensityRatio) {
        this.updates = [];
        this.form = new Circle(x,y,radius);
        this.moveAwayFact = moveAwayIntensityRatio;

        this.moveStraightBV = new MoveStraightLineBehaviour(this.form);
        this.updates.push(() => this.moveStraightBV.update());

        this.cycleSurface = new CycleSurface(this.form);
        this.updates.push(() => this.cycleSurface.update());

        this.moveAwayOnTouchBV = new MoveAwayWhileTouchingAnother(this.form);
        this.updates.push(() => this.moveAwayOnTouchBV.update(this.currentlyTouchingEls));
    }

    set speed(val) {
        this.moveStraightBV.speed = val;
        this.moveAwayOnTouchBV.speed = val * this.moveAwayFact;
    }

    update(allElements) {
        this.currentlyTouchingEls = this.elementsThatITouch(allElements);        
        this.updates.forEach(u => u());
    }

    elementsThatITouch(allElements) {
        const currentlyTouchingEls = [];
        const myForm = this.form;
        for (let i = 0; i < allElements.length; i++) {
            const anotherEl = allElements[i];
            const anotherForm = anotherEl.form;
            if (anotherForm != myForm && touchingForms(myForm, anotherForm)) {
                currentlyTouchingEls.push(anotherEl);
            }
        }
        return currentlyTouchingEls;
    }

    draw() {
        this.form.draw();
    }
}

class ElementX2 {
    constructor(x, y, radius, changeDirDiff, moveAwayFactor) {
        this.updates = [];
        this.form = new Circle(x,y,radius);
        this.moveAwayFact = moveAwayFactor;

        this.cycleSurface = new CycleSurface(this.form);
        this.updates.push(() => this.cycleSurface.update());

        this.changeDirectionOnTouchBV = new ChangeDirectionWhileTouchingAnother(this.form, changeDirDiff);
        this.updates.push(() => this.changeDirectionOnTouchBV.update(this.currentlyTouchingEls));

        this.moveAwayOnTouchBV = new MoveAwayWhileTouchingAnother(this.form);
        this.updates.push(() => this.moveAwayOnTouchBV.update(this.currentlyTouchingEls));
    }

    set speed(val) {
        this.moveAwayOnTouchBV.speed = val * this.moveAwayFact;
    }

    update(allElements) {
        this.currentlyTouchingEls = this.elementsThatITouch(allElements);        
        this.updates.forEach(u => u());
    }

    elementsThatITouch(allElements) {
        const currentlyTouchingEls = [];
        const myForm = this.form;
        for (let i = 0; i < allElements.length; i++) {
            const anotherEl = allElements[i];
            const anotherForm = anotherEl.form;
            if (anotherForm != myForm && touchingForms(myForm, anotherForm)) {
                currentlyTouchingEls.push(anotherEl);
            }
        }
        return currentlyTouchingEls;
    }

    draw() {
        this.form.draw();
    }
}
class ElementX3 {
    constructor(x, y, radius, changeDirDiff, moveAwayFactor) {
        this.updates = [];
        this.form = new Circle(x,y,radius);
        this.moveAwayFact = moveAwayFactor;

        this.moveStraightBV = new MoveStraightLineBehaviour(this.form);
        this.updates.push(() => this.moveStraightBV.update());

        this.cycleSurface = new CycleSurface(this.form);
        this.updates.push(() => this.cycleSurface.update());

        this.changeDirectionOnTouchBV = new ChangeDirectionWhileTouchingAnother(this.form, changeDirDiff);
        this.updates.push(() => this.changeDirectionOnTouchBV.update(this.currentlyTouchingEls));
    }

    set speed(val) {
        this.moveStraightBV.speed = val;
    }

    update(allElements) {
        this.currentlyTouchingEls = this.elementsThatITouch(allElements);        
        this.updates.forEach(u => u());
    }

    elementsThatITouch(allElements) {
        const currentlyTouchingEls = [];
        const myForm = this.form;
        for (let i = 0; i < allElements.length; i++) {
            const anotherEl = allElements[i];
            const anotherForm = anotherEl.form;
            if (anotherForm != myForm && touchingForms(myForm, anotherForm)) {
                currentlyTouchingEls.push(anotherEl);
            }
        }
        return currentlyTouchingEls;
    }

    draw() {
        this.form.draw();
    }
}

class ElementX4 {
    constructor(x, y, radius, respectRadiusOnConstrain, changeDirDiff, moveAwayFactor) {
        this.updates = [];
        this.form = new Circle(x,y,radius);
        this.moveAwayFact = moveAwayFactor;

        this.constrainToSurfaceBV = new ConstrainToSurface(this.form, respectRadiusOnConstrain);
        this.updates.push(() => this.constrainToSurfaceBV.update());

        this.changeDirectionOnTouchBV = new ChangeDirectionWhileTouchingAnother(this.form, changeDirDiff);
        this.updates.push(() => this.changeDirectionOnTouchBV.update(this.currentlyTouchingEls));

        this.moveAwayOnTouchBV = new MoveAwayWhileTouchingAnother(this.form);
        this.updates.push(() => this.moveAwayOnTouchBV.update(this.currentlyTouchingEls));
    }

    set speed(val) {
        this.moveAwayOnTouchBV.speed = val * this.moveAwayFact;
    }

    update(allElements) {
        this.currentlyTouchingEls = this.elementsThatITouch(allElements);        
        this.updates.forEach(u => u());
    }

    elementsThatITouch(allElements) {
        const currentlyTouchingEls = [];
        const myForm = this.form;
        for (let i = 0; i < allElements.length; i++) {
            const anotherEl = allElements[i];
            const anotherForm = anotherEl.form;
            if (anotherForm != myForm && touchingForms(myForm, anotherForm)) {
                currentlyTouchingEls.push(anotherEl);
            }
        }
        return currentlyTouchingEls;
    }

    draw() {
        this.form.draw();
    }
}