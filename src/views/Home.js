import SomeContainer from '../containers/SomeContainer';

export default function () {
  const someContainer = SomeContainer();

  const wrapper = document.getElementById('wrapper');
  wrapper.innerHTML = someContainer;
}
