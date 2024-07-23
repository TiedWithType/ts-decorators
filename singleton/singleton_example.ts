function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
    let instance: T;

    const handler = {
        construct(target: T, args: any[]) {
            if (!instance) {
                instance = Reflect.construct(target, args);
            }
            return instance;
        }
    };

    return new Proxy(constructor, handler);
}

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

const serviceA1 = new MyServiceA();
const serviceA2 = new MyServiceA();

const serviceB1 = new MyServiceB();
const serviceB2 = new MyServiceB();

const serviceC1 = new MyServiceC();
const serviceC2 = new MyServiceC();

console.log('MyServiceA instances are the same:', serviceA1 === serviceA2); // true
console.log('MyServiceB instances are the same:', serviceB1 === serviceB2); // true
console.log('MyServiceC instances are the same:', serviceC1 === serviceC2); // true

console.log('MyServiceA and MyServiceB instances are the same:', serviceA1 === serviceB1); // false
console.log('MyServiceA and MyServiceC instances are the same:', serviceA1 === serviceC1); // false
console.log('MyServiceB and MyServiceC instances are the same:', serviceB1 === serviceC1); // false

console.log('MyServiceA1 data:', serviceA1.getData());
console.log('MyServiceA2 data:', serviceA2.getData());

console.log('MyServiceB1 data:', serviceB1.getData());
console.log('MyServiceB2 data:', serviceB2.getData());

console.log('MyServiceC1 data:', serviceC1.getData());
console.log('MyServiceC2 data:', serviceC2.getData());
