import { Container } from './container';

class Base {}

const container = new Container();
// container.addProvider({ provide: Base, useClass: Base });
container.addProvider({ provide: Base, useValue: new Base() });
// container.addProvider({ provide: Base, useFactory: () => new Base() });
console.log(container.providers);
