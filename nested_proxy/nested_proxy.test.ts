import { describe, it, expect } from "vitest";
import { createNestedProxy } from "./nested_proxy"; // Zaktualizuj ścieżkę do pliku z funkcją

describe("createNestedProxy", () => {
  it("should create nested proxy objects dynamically", () => {
    const proxy = createNestedProxy();

    // Ustawiamy głęboko zagnieżdżoną wartość
    proxy.a.b.c.d = 42;

    // Sprawdzamy, czy dostęp do tej wartości zwraca poprawny wynik
    expect(proxy.a.b.c.d).toBe(42);
  });

  it("should allow setting and getting properties on the proxy", () => {
    const proxy = createNestedProxy();

    // Ustawiamy proste wartości
    proxy.foo = "bar";
    proxy.num = 123;

    // Sprawdzamy, czy właściwości zostały poprawnie ustawione
    expect(proxy.foo).toBe("bar");
    expect(proxy.num).toBe(123);
  });

  it("should inherit properties from the provided object", () => {
    const baseObject = { existing: 100 };
    const proxy = createNestedProxy(baseObject);

    // Sprawdzamy, czy odziedziczone właściwości są dostępne
    expect(proxy.existing).toBe(100);

    // Ustawiamy nową wartość w zagnieżdżonym obiekcie
    proxy.newProp = "test";

    // Sprawdzamy, czy nowa właściwość została poprawnie ustawiona
    expect(proxy.newProp).toBe("test");
  });

  it("should not overwrite existing properties in inherited object", () => {
    const baseObject = { existing: 100 };
    const proxy = createNestedProxy(baseObject);

    // Próbujemy nadpisać istniejącą właściwość
    proxy.existing = 200;

    // Sprawdzamy, czy właściwość została poprawnie nadpisana
    expect(proxy.existing).toBe(200);
  });

  it("should create nested proxies for missing properties", () => {
    const proxy = createNestedProxy();

    // Sprawdzamy, czy zagnieżdżone właściwości są tworzone dynamicznie
    expect(proxy.foo.bar.baz).toEqual({});
  });
});
