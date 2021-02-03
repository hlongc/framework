import ButtonGroup from './button-group.vue';
import '../../style/button-group.scss';

const install = app => {
  app.component(ButtonGroup.name, ButtonGroup);
};

export default {
  install
};
