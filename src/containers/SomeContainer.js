import Logo from '../components/Logo';
import OneBtn from '../components/OneBtn';
import { title } from '../project.json';

export default function () {
  const oneBtn = new OneBtn();

  return `
    <div class="home-container">
      ${Logo()}
      <h2>This is</h3>
      <h1>${title}</h1>
      ${oneBtn.Render()}
    </div>
  `;
}
