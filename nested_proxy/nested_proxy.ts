function createNestedProxy() {
 return new Proxy({ }, {
  get: (target, prop, receiver) => {
   if (!(prop in target)) {
    target[prop] = createNestedProxy();
   }
   return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
   return Reflect.set(target, prop, value, receiver);
  }
 });
}

export function NestedProxy(a, b) {
 return a[b] = createNestedProxy();
}