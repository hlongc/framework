import CarouselItem from './carousel-item.vue';
import '../../style/carousel-item.scss';

CarouselItem.install = app => {
  app.component(CarouselItem.name, CarouselItem);
};

export default CarouselItem;
