class OneBtn extends HTMLElement {
  constructor() {
    super();
    this.state = {
      name: 'Click This Button',
      stopMsg: "Stop, That's enough!",
      hexa: 0x1000000,
      padAt: 6,
      clicks: 0,
    };
  }

  generateRandomColor() {
    const { hexa, padAt } = this.state;
    return `#${Math.floor(Math.random() * hexa).toString(16).padStart(padAt, 0)}`;
  }

  updateClicks() {
    const { clicks } = this.state;
    this.state.clicks = clicks + 1;
  }

  changeColors(target) {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    const anchor = target;
    const buttonBgColor = this.generateRandomColor();
    anchor.style.color = this.generateRandomColor();
    anchor.style.backgroundColor = buttonBgColor;

    if (metaTheme) {
      metaTheme.setAttribute('content', buttonBgColor);
    }
  }

  activeStopMsg(target) {
    const anchor = target;
    const { stopMsg } = this.state;
    anchor.innerText = stopMsg;
  }

  blowUpLogo() {
    const parent = this.parentElement;
    const logo = parent.querySelector('logo-elm');

    logo.setAttribute('blowup', true);
  }

  calculation(e) {
    e.preventDefault();
    if (e.target) {
      const target = e.composedPath()[0];
      if (target.classList.contains('btn')) {
        const { clicks } = this.state;

        this.updateClicks();
        this.changeColors(target);

        if (clicks > 5) {
          this.activeStopMsg(target);
          this.blowUpLogo();
        }
      }
    }
  }

  eventsList() {
    this.addEventListener('click', (e) => {
      this.calculation(e);
    });
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const { name } = this.state;
    const styles = `
      :host {
        display: block;
        position: relative;
      }

      * {
        box-sizing: border-box;
      }

      .btn {
        background-color: #ff276b;
        border: 1px solid transparent;
        border-radius: 2px;
        color: #b5d2ff;
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: .4px;
        padding: 8px 10px;
        text-decoration: none;
      }
    `;

    shadowRoot.innerHTML = `
      <style>${styles}</style>
      <a href="#" class="btn btn--primary">${name}</a>
    `;
    this.eventsList();
  }
}

customElements.define('one-btn', OneBtn);
