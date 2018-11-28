class LogoElm extends HTMLElement {
  constructor() {
    super();
    this.preConnectedCallback();
  }

  updateImg(src) {
    const img = this.shadowRoot.querySelector('img');

    img.setAttribute('src', src);
  }

  blowUpImage(newValue) {
    const img = this.shadowRoot.querySelector('img');
    const isBlow = JSON.parse(newValue);

    if (isBlow) {
      img.style.transform = 'scale(5)';
    }
  }

  static get observedAttributes() {
    return ['src', 'blowup'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src') {
      this.updateImg(newValue);
    } else if (name === 'blowup') {
      this.blowUpImage(newValue);
    }
  }

  preConnectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const styles = `
      :host {
        display: block;
        position: relative;
      }

      * {
        box-sizing: border-box;
      }

      .logo {
        display: block;
        margin-bottom: 2rem;
        max-width: 100px;
        transform: scale(1);
        transition: transform 1s;
      }

      .logo img {
        display: block;
        height: auto;
        width: 100%;
      }
    `;

    shadowRoot.innerHTML = `
      <style>${styles}</style>
      <span class="logo">
        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" alt="" />
      </span>
    `;
  }
}

customElements.define('logo-elm', LogoElm);
