import { title } from '../project.json';
import icon from '../images/icon.png';
import '../components/SomeApp';
import '../components/LogoElm';
import '../components/OneBtn';

export default function () {
  return `
    <some-app class="home-container">
      <logo-elm src="${icon}"></logo-elm>
      <h2>This is</h3>
      <h1>${title}</h1>
      <one-btn></one-btn>
    </some-app>
  `;
}
