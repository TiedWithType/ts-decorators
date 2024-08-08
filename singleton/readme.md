# Singleton Decorator Example in TypeScript

This repository demonstrates how to use a Singleton decorator in TypeScript to ensure that classes always return the same instance. We define a Singleton decorator using `Proxy` and `Reflect`, apply it to multiple service classes, and compare their instances.

## Table of Contents

- [Singleton Decorator](#singleton-decorator)
- [Service Classes](#service-classes)
- [Instance Comparison](#instance-comparison)
- [How to Run](#how-to-run)
- [Output](#output)

## Singleton Decorator

The `Singleton` decorator ensures that a class always returns the same instance, no matter how many times its constructor is called.

```typescript
function Singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
  let instance: T;

  const handler = {
    construct(target: T, args: any[]) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  };

  return new Proxy(constructor, handler);
}
```

## Service Classes

We define three service classes (`MyServiceA`, `MyServiceB`, `MyServiceC`), each decorated with the `Singleton` decorator.

```typescript
@Singleton
class MyServiceA {
  private data: number;

  constructor() {
    this.data = Math.random();
  }

  public getData(): number {
    return this.data;
  }
}

@Singleton
class MyServiceB {
  private data: number;

  constructor() {
    this.data = Math.random();
  }

  public getData(): number {
    return this.data;
  }
}

@Singleton
class MyServiceC {
  private data: number;

  constructor() {
    this.data = Math.random();
  }

  public getData(): number {
    return this.data;
  }
}
```

## Instance Comparison

We create instances of these service classes and compare them to demonstrate the Singleton pattern.

```typescript
const serviceA1 = new MyServiceA();
const serviceA2 = new MyServiceA();

const serviceB1 = new MyServiceB();
const serviceB2 = new MyServiceB();

const serviceC1 = new MyServiceC();
const serviceC2 = new MyServiceC();

console.log("MyServiceA instances are the same:", serviceA1 === serviceA2); // true
console.log("MyServiceB instances are the same:", serviceB1 === serviceB2); // true
console.log("MyServiceC instances are the same:", serviceC1 === serviceC2); // true

console.log(
  "MyServiceA and MyServiceB instances are the same:",
  serviceA1 === serviceB1,
); // false
console.log(
  "MyServiceA and MyServiceC instances are the same:",
  serviceA1 === serviceC1,
); // false
console.log(
  "MyServiceB and MyServiceC instances are the same:",
  serviceB1 === serviceC1,
); // false

console.log("MyServiceA1 data:", serviceA1.getData());
console.log("MyServiceA2 data:", serviceA2.getData());

console.log("MyServiceB1 data:", serviceB1.getData());
console.log("MyServiceB2 data:", serviceB2.getData());

console.log("MyServiceC1 data:", serviceC1.getData());
console.log("MyServiceC2 data:", serviceC2.getData());
```

## How to Run

1. Clone the repository.
2. Install TypeScript if not already installed:
   ```sh
   npm install -g typescript
   ```
3. Compile the TypeScript files:
   ```sh
   tsc
   ```
4. Run the compiled JavaScript:
   ```sh
   node <compiled_file>.js
   ```

## Output

You should see the following output, demonstrating that each service class returns the same instance for multiple instantiations and different instances between different classes:

```sh
MyServiceA instances are the same: true
MyServiceB instances are the same: true
MyServiceC instances are the same: true

MyServiceA and MyServiceB instances are the same: false
MyServiceA and MyServiceC instances are the same: false
MyServiceB and MyServiceC instances are the same: false

MyServiceA1 data: <random_number>
MyServiceA2 data: <same_random_number_as_A1>

MyServiceB1 data: <random_number>
MyServiceB2 data: <same_random_number_as_B1>

MyServiceC1 data: <random_number>
MyServiceC2 data: <same_random_number_as_C1>
```

Replace `<compiled_file>.js` with the actual name of the compiled JavaScript file. The `<random_number>` placeholders will be different for each service but consistent within each service class pair.
