export class SwipeObserver {
  constructor({ ref, offset = 20 }) {
    this.ref = ref;
    this.isMoving = false;
    this.startX = undefined;
    this.startY = undefined;
    this.currentX = undefined;
    this.currentY = undefined;

    this.offset = offset;

    this.observe = this.observe.bind(this);
    this.unobserve = this.unobserve.bind(this);
    this.addListeners = this.addListeners.bind(this);
    this.removeListeners = this.removeListeners.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
    this.update = this.update.bind(this);
  }

  observe() {
    this.ref.addEventListener("touchstart", this.start);
    this.ref.addEventListener("mousedown", this.start);
  }

  unobserve() {
    this.ref.removeEventListener("touchstart", this.start);
    this.ref.removeEventListener("mousedown", this.start);
  }

  addListeners() {
    document.addEventListener("touchmove", this.update);
    document.addEventListener("touchend", this.end);
    document.addEventListener("mousemove", this.update);
    document.addEventListener("mouseup", this.end);
  }

  removeListeners() {
    document.removeEventListener("touchmove", this.update);
    document.removeEventListener("touchend", this.end);
    document.removeEventListener("mousemove", this.update);
    document.removeEventListener("mouseup", this.end);
  }

  start(e) {
    if (!this.isMoving) {
      this.startX = e.touches ? e.touches[0].pageX : e.pageX;
      this.startY = e.touches ? e.touches[0].pageY : e.pageY;
      this.currentX = this.startX;
      this.currentY = this.startY;
      this.isMoving = true;

      this.unobserve();
      this.addListeners();
    }
    e.preventDefault();
  }

  update(e) {
    if (this.isMoving) {
      this.currentX = e.touches ? e.touches[0].pageX : e.pageX;
      this.currentY = e.touches ? e.touches[0].pageY : e.pageY;
    }
  }

  end() {
    this.evaluate();

    this.startX = undefined;
    this.startY = undefined;
    this.currentX = undefined;
    this.currentY = undefined;
    this.isMoving = false;

    this.removeListeners();
    this.observe();
  }

  evaluate() {
    const x = this.currentX;
    const y = this.currentY;
    const dx = x - this.startX;
    const dy = y - this.startY;
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);

    const toRight = dx > 0 ? true : false;
    const toBottom = dy > 0 ? true : false;

    if (ax >= this.offset) {
      if (toRight) {
        this.ref.dispatchEvent(new Event("swipe-right"));
      } else {
        this.ref.dispatchEvent(new Event("swipe-left"));
      }
    }

    if (ay >= this.offset) {
      if (toBottom) {
        this.ref.dispatchEvent(new Event("swipe-down"));
      } else {
        this.ref.dispatchEvent(new Event("swipe-up"));
      }
    }
  }
}
