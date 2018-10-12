import { Router } from 'domr-framework';
import Home from './views/Home';

const routes = [
  {
    path: '/',
    view: Home,
    title: 'homepage',
    isDefault: true,
  },
];

const router = new Router(routes);

router.Start();
