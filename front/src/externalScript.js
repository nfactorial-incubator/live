import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2.2.4/core/lit-core.min.js';

export class NameTag extends LitElement {
  static properties = {
    name: {},
  };

  constructor() {
    super();
    this.name = 'Your name here';
  }

  render() {
    return html`
      <p>Hello, ${this.name}</p>
      <input @input=${this.changeName} placeholder="Enter your name">
    `;
  }

  changeName(event) {
    const input = event.target;
    this.name = input.value;
    this.dispatchEvent(new Event('textChange'));
  }
}
customElements.define('my-element', NameTag);
