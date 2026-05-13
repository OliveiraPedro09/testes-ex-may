import { Triangle, TriangleType } from '../../src/exercicio1/Triangle';

describe('Exercicio 1 - Triangle', () => {
  describe('Triangulos validos', () => {
    test('Escaleno valido (3, 4, 5)', () => {
      expect(new Triangle(3, 4, 5).classify()).toBe(TriangleType.ESCALENO);
    });

    test('Equilatero valido (5, 5, 5)', () => {
      expect(new Triangle(5, 5, 5).classify()).toBe(TriangleType.EQUILATERO);
    });

    test('Isosceles valido (5, 5, 3)', () => {
      expect(new Triangle(5, 5, 3).classify()).toBe(TriangleType.ISOSCELES);
    });

    describe('Permutacoes de isosceles validos com os mesmos valores', () => {
      test('Isosceles - permutacao (5, 5, 3)', () => {
        expect(new Triangle(5, 5, 3).classify()).toBe(TriangleType.ISOSCELES);
      });

      test('Isosceles - permutacao (5, 3, 5)', () => {
        expect(new Triangle(5, 3, 5).classify()).toBe(TriangleType.ISOSCELES);
      });

      test('Isosceles - permutacao (3, 5, 5)', () => {
        expect(new Triangle(3, 5, 5).classify()).toBe(TriangleType.ISOSCELES);
      });
    });
  });

  describe('Valores invalidos', () => {
    test('Um valor zero (0, 4, 5) -> deve lancar erro', () => {
      expect(() => new Triangle(0, 4, 5).classify()).toThrow(
        /maiores que zero/
      );
    });

    test('Um valor negativo (-1, 4, 5) -> deve lancar erro', () => {
      expect(() => new Triangle(-1, 4, 5).classify()).toThrow(
        /maiores que zero/
      );
    });

    test('Tres valores iguais a zero (0, 0, 0) -> deve lancar erro', () => {
      expect(() => new Triangle(0, 0, 0).classify()).toThrow(
        /maiores que zero/
      );
    });
  });

  describe('Soma de dois lados igual ao terceiro (degenerado) - todas permutacoes', () => {
    test('(1, 2, 3) -> 1+2 = 3', () => {
      expect(() => new Triangle(1, 2, 3).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(1, 3, 2) -> 1+2 = 3', () => {
      expect(() => new Triangle(1, 3, 2).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(2, 1, 3) -> 1+2 = 3', () => {
      expect(() => new Triangle(2, 1, 3).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(2, 3, 1) -> 1+2 = 3', () => {
      expect(() => new Triangle(2, 3, 1).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(3, 1, 2) -> 1+2 = 3', () => {
      expect(() => new Triangle(3, 1, 2).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(3, 2, 1) -> 1+2 = 3', () => {
      expect(() => new Triangle(3, 2, 1).classify()).toThrow(
        /soma de dois lados/
      );
    });
  });

  describe('Soma de dois lados menor que o terceiro - todas permutacoes', () => {
    test('(1, 2, 10) -> 1+2 < 10', () => {
      expect(() => new Triangle(1, 2, 10).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(1, 10, 2) -> 1+2 < 10', () => {
      expect(() => new Triangle(1, 10, 2).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(2, 1, 10) -> 1+2 < 10', () => {
      expect(() => new Triangle(2, 1, 10).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(2, 10, 1) -> 1+2 < 10', () => {
      expect(() => new Triangle(2, 10, 1).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(10, 1, 2) -> 1+2 < 10', () => {
      expect(() => new Triangle(10, 1, 2).classify()).toThrow(
        /soma de dois lados/
      );
    });

    test('(10, 2, 1) -> 1+2 < 10', () => {
      expect(() => new Triangle(10, 2, 1).classify()).toThrow(
        /soma de dois lados/
      );
    });
  });
});
