import Carousel from './carousel.vue';
import '../../style/carousel.scss';

Carousel.install = app => {
  app.component(Carousel.name, Carousel);
};

export default Carousel;
