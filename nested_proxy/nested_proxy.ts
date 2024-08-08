export const createNestedProxy = <T extends object>(inheritFrom?: T): T => {
  return new Proxy(inheritFrom ?? ({} as T), {
    get(target: T, property: string | symbol): any {
      const value = Reflect.get(target, property);

      if (
        typeof property === "string" &&
        (value === undefined || value === null)
      ) {
        const newProxy = createNestedProxy();
        Reflect.set(target, property, newProxy);
        return newProxy;
      }

      return value;
    },
    set(
      target: T,
      property: string | symbol,
      value: any,
      receiver: any,
    ): boolean {
      return Reflect.set(target, property, value, receiver);
    },
  });
};
