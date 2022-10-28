// import sheet from './image.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./image.css";

export class Image {
    constructor({
        src,
        alt,
        width,
        height,
    }) {
        this.src = src;
        this.alt = alt;
        this.width = width;
        this.height = height;
    }

    render() {
        const container = document.createElement("div");
        container.classList.add("image-container");

        const image = document.createElement("img");
        image.src = this.src;
        if (this.alt) image.alt = this.alt;
        if (this.width) image.width = this.width;
        if (this.height) image.height = this.height;
        container.appendChild(image);

        return container;
    }
}

