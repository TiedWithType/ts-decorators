import { describe, it, expect } from 'vitest';
import { NestedProxy } from "./nested_proxy";

class ExampleClass {
 @NestedProxy static Store;
}

const { Store } = ExampleClass;

describe('Store Proxy', () => {
    it('should dynamically create nested properties', () => {
        Store.x.y.z = 1;
        Store.a.b = 2;

        expect(Store.x.y.z).toBe(1);
        expect(Store.a.b).toBe(2);
    });

    it('should handle deeply nested properties', () => {
        Store.level1.level2.level3.level4.value = 'test';

        expect(Store.level1.level2.level3.level4.value).toBe('test');
    });

    it('should allow modification of existing properties', () => {
        Store.x.y.z = 10;
        Store.a.b = 20;

        expect(Store.x.y.z).toBe(10);
        expect(Store.a.b).toBe(20);
    });

    it('should not affect other properties when a new property is added', () => {
        Store.newProp = 'newValue';

        expect(Store.newProp).toBe('newValue');
        expect(Store.x.y.z).toBe(10);  // Sprawdzamy, czy istniejące właściwości są nienaruszone
        expect(Store.a.b).toBe(20);
    });
});
