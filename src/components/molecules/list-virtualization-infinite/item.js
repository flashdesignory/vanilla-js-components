export class Item {
  constructor(props) {
    this.container = document.createElement("div");
    this.container.classList.add("item-container");

    if (props) this.update(props);
  }

  update(props) {
    const { index, height, id, ...post } = props;
    this.index = index;
    this.height = height;
    this.id = id;
    this.post = post;
  }

  render() {
    this.container.id = this.id;
    this.container.style.transform = `translateY(${
      this.index * this.height
    }px)`;
    this.container.style.height = `${this.height}px`;

    const content = document.createElement('div');
    content.classList.add('item-content');
    this.container.appendChild(content);

    const left = document.createElement("div");
    left.classList.add("left");
    content.appendChild(left);

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");
    left.appendChild(avatar);

    const image = document.createElement("img");
    image.classList.add("avatar");
    image.src = this.post.image;
    avatar.appendChild(image);

    const right = document.createElement("div");
    right.classList.add("right");
    content.appendChild(right);

    const quote = document.createElement('div');
    quote.classList.add('item-quote');
    quote.textContent = `${this.id}: ${this.post.quote}`;

    const author = document.createElement('div');
    author.classList.add('item-author');
    author.textContent = this.post.author;

    right.appendChild(quote);
    right.appendChild(author);
    return this.container;
  }
}
