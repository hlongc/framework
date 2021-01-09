import type { ProviderType, Token } from './type';

export class Container {
  public providers = new Map<Token<any>, ProviderType<any>>();
  addProvider<T>(provider: ProviderType<T>) {
    this.providers.set(provider.provide, provider);
  }
}
