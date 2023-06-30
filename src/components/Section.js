export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  render() {
    this.items
      .map((item) => this.renderer(item))
      .forEach((element) => this.addItem(element));
  }

  addItem(element, prepend = false) {
    if (prepend) {
      this.container.prepend(element);
    } else {
      this.container.append(element);
    }
  }
}
