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

interface ClassProvider<T> extends BaseProvider<T> {
  useClass: Type<T>;
}

interface ValueProvider<T> extends BaseProvider<T> {
  useValue: T;
}

interface FactoryProvider<T> extends BaseProvider<T> {
  useFactory: () => T;
}

export type ProviderType<T> =
  | ClassProvider<T>
  | ValueProvider<T>
  | FactoryProvider<T>;

// 自定义类型保护
export function isClassProvider<T>(
  provider: BaseProvider<T>,
): provider is ClassProvider<T> {
  return (provider as any).useClass !== undefined;
}
