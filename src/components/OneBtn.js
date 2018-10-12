import { Component } from 'domr-framework';

export default class extends Component {
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


  Markup() {
    const { name } = this.state;
    return `
      <a href="#" class="btn btn--primary">${name}</a>
    `;
  }

  Events() {
    this.Click((self, e) => {
      e.preventDefault();
      const thisSelf = self;
      const parent = thisSelf.parentElement;
      const logo = parent.querySelector('.logo');
      const { clicks, stopMsg } = this.state;
      this.state.clicks = clicks + 1;
      thisSelf.style.color = this.generateRandomColor();
      thisSelf.style.backgroundColor = this.generateRandomColor();

      if (clicks > 5) {
        thisSelf.innerText = stopMsg;
        logo.style.transform = 'scale(5)';
      }
    });
  }
}
