import { describe, it, expect } from 'vitest';
import { Singleton } from './singleton_example';

// Dekorowana klasa dla testów
@Singleton
class MyClass {
    public value: number;

    constructor(value: number) {
        this.value = value;
    }
}

describe('Singleton', () => {
    it('should return the same instance', () => {
        const instance1 = new MyClass(1);
        const instance2 = new MyClass(2);

        expect(instance1).toBe(instance2);
    });

    it('should preserve initial values', () => {
        const instance1 = new MyClass(1);
        const instance2 = new MyClass(2);

        expect(instance1.value).toBe(1);
        expect(instance2.value).toBe(1);  // since instance2 is the same as instance1
    });
});
