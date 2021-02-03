import Button from './button';
import ButtonGroup from './button-group';
import Icon from './icon';
import Carousel from './carousel';
import CarouselItem from './carousel-item';
import Message from './message';
import Tree from './tree';

const plugins = [Button, ButtonGroup, Icon, Carousel, CarouselItem, Tree];

export default {
  install(app) {
    plugins.forEach(plugin => app.use(plugin));
  }
};

export { Message };
