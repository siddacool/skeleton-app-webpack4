import './App';
import './styles/main.scss';
import { isPwa } from './project.json';
import pwa from './pwa';

if (isPwa) {
  pwa();
}
