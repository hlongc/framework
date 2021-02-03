import Button from './button.vue';
import '../../style/button.scss';

const install = app => {
  app.component(Button.name, Button);
};

export default {
  install
};
