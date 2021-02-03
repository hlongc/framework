import Icon from './icon.vue';
import '../../style/icon.scss';

const install = app => {
  app.component(Icon.name, Icon);
};

export default {
  install
};
