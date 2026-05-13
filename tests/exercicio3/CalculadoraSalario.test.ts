import { CalculadoraSalario } from '../../src/exercicio3/CalculadoraSalario';
import { Funcionario } from '../../src/exercicio3/Funcionario';
import { Cargo } from '../../src/exercicio3/Cargo';

describe('Exercicio 3 - CalculadoraSalario', () => {
  let calc: CalculadoraSalario;

  beforeEach(() => {
    calc = new CalculadoraSalario();
  });

  describe('DESENVOLVEDOR', () => {
    test('salario 2999 -> desconto de 10%', () => {
      const f = new Funcionario('A B', 'a@b.com', 2999, Cargo.DESENVOLVEDOR);
      expect(calc.calcular(f)).toBeCloseTo(2999 * 0.9, 2);
    });

    test('salario 3000 -> desconto de 20% (limite inferior do alto)', () => {
      const f = new Funcionario('A B', 'a@b.com', 3000, Cargo.DESENVOLVEDOR);
      expect(calc.calcular(f)).toBeCloseTo(3000 * 0.8, 2);
    });

    test('salario 5000 -> desconto de 20%', () => {
      const f = new Funcionario('A B', 'a@b.com', 5000, Cargo.DESENVOLVEDOR);
      expect(calc.calcular(f)).toBeCloseTo(5000 * 0.8, 2);
    });
  });

  describe('DBA', () => {
    test('salario 1999 -> desconto de 15%', () => {
      const f = new Funcionario('A B', 'a@b.com', 1999, Cargo.DBA);
      expect(calc.calcular(f)).toBeCloseTo(1999 * 0.85, 2);
    });

    test('salario 2000 -> desconto de 25% (limite)', () => {
      const f = new Funcionario('A B', 'a@b.com', 2000, Cargo.DBA);
      expect(calc.calcular(f)).toBeCloseTo(2000 * 0.75, 2);
    });

    test('salario 4000 -> desconto de 25%', () => {
      const f = new Funcionario('A B', 'a@b.com', 4000, Cargo.DBA);
      expect(calc.calcular(f)).toBeCloseTo(4000 * 0.75, 2);
    });
  });

  describe('TESTADOR', () => {
    test('salario 1500 -> desconto de 15%', () => {
      const f = new Funcionario('A B', 'a@b.com', 1500, Cargo.TESTADOR);
      expect(calc.calcular(f)).toBeCloseTo(1500 * 0.85, 2);
    });

    test('salario 2000 -> desconto de 25% (limite)', () => {
      const f = new Funcionario('A B', 'a@b.com', 2000, Cargo.TESTADOR);
      expect(calc.calcular(f)).toBeCloseTo(2000 * 0.75, 2);
    });

    test('salario 3500 -> desconto de 25%', () => {
      const f = new Funcionario('A B', 'a@b.com', 3500, Cargo.TESTADOR);
      expect(calc.calcular(f)).toBeCloseTo(3500 * 0.75, 2);
    });
  });

  describe('GERENTE', () => {
    test('salario 4999 -> desconto de 20%', () => {
      const f = new Funcionario('A B', 'a@b.com', 4999, Cargo.GERENTE);
      expect(calc.calcular(f)).toBeCloseTo(4999 * 0.8, 2);
    });

    test('salario 5000 -> desconto de 30% (limite)', () => {
      const f = new Funcionario('A B', 'a@b.com', 5000, Cargo.GERENTE);
      expect(calc.calcular(f)).toBeCloseTo(5000 * 0.7, 2);
    });

    test('salario 10000 -> desconto de 30%', () => {
      const f = new Funcionario('A B', 'a@b.com', 10000, Cargo.GERENTE);
      expect(calc.calcular(f)).toBeCloseTo(10000 * 0.7, 2);
    });
  });

  describe('Casos de borda', () => {
    test('salario 0 e valido (desconto aplicado sobre zero)', () => {
      const f = new Funcionario('A B', 'a@b.com', 0, Cargo.DESENVOLVEDOR);
      expect(calc.calcular(f)).toBe(0);
    });

    test('salario negativo lanca erro', () => {
      const f = new Funcionario('A B', 'a@b.com', -1, Cargo.DESENVOLVEDOR);
      expect(() => calc.calcular(f)).toThrow(/negativo/);
    });
  });
});
