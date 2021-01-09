interface Type<T> {
  new (...args: any[]): T;
}

class StringToken {
  constructor(private name: string) {}
}

export type Token<T> = Type<T> | StringToken;

class BaseProvider<T> {
  provide: Type<T> | StringToken;
}

class ClassProvider<T> extends BaseProvider<T> {
  useClass: Type<T>;
}

class ValueProvider<T> extends BaseProvider<T> {
  useValue: T;
}

class FactoryProvider<T> extends BaseProvider<T> {
  useFactory: () => T;
}

export type ProviderType<T> =
  | ClassProvider<T>
  | ValueProvider<T>
  | FactoryProvider<T>;
