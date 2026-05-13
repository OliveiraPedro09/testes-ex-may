import { Person } from '../../src/exercicio2/Person';
import { Email } from '../../src/exercicio2/Email';

const buildValidPerson = (): Person => {
  const p = new Person('Joao Silva', 30);
  p.addEmail(new Email('joao@email.com'));
  return p;
};

describe('Exercicio 2 - Person.isValidToInclude', () => {
  describe('Pessoa totalmente valida', () => {
    test('Retorna lista vazia quando nome, idade e email sao validos', () => {
      const person = buildValidPerson();
      expect(person.isValidToInclude()).toEqual([]);
    });
  });

  describe('Validacao de nome', () => {
    test('Nome com apenas uma parte deve retornar erro', () => {
      const p = new Person('Joao', 30);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toContain(
        'O nome deve ter pelo menos 2 partes e conter apenas letras'
      );
    });

    test('Nome com numeros deve retornar erro', () => {
      const p = new Person('Joao S1lva', 30);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toContain(
        'O nome deve ter pelo menos 2 partes e conter apenas letras'
      );
    });

    test('Nome vazio deve retornar erro', () => {
      const p = new Person('', 30);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toContain(
        'O nome deve ter pelo menos 2 partes e conter apenas letras'
      );
    });

    test('Nome com tres partes e valido', () => {
      const p = new Person('Joao da Silva', 30);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toEqual([]);
    });
  });

  describe('Validacao de idade', () => {
    test('Idade 0 deve retornar erro', () => {
      const p = new Person('Joao Silva', 0);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toContain(
        'A idade deve estar no intervalo [1, 200]'
      );
    });

    test('Idade negativa deve retornar erro', () => {
      const p = new Person('Joao Silva', -1);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toContain(
        'A idade deve estar no intervalo [1, 200]'
      );
    });

    test('Idade 201 deve retornar erro', () => {
      const p = new Person('Joao Silva', 201);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toContain(
        'A idade deve estar no intervalo [1, 200]'
      );
    });

    test('Idade 1 (limite inferior) e valida', () => {
      const p = new Person('Joao Silva', 1);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toEqual([]);
    });

    test('Idade 200 (limite superior) e valida', () => {
      const p = new Person('Joao Silva', 200);
      p.addEmail(new Email('joao@email.com'));
      expect(p.isValidToInclude()).toEqual([]);
    });
  });

  describe('Validacao de email', () => {
    test('Pessoa sem emails deve retornar erro', () => {
      const p = new Person('Joao Silva', 30);
      expect(p.isValidToInclude()).toContain(
        'A pessoa deve ter pelo menos um email associado'
      );
    });

    test('Email sem @ deve retornar erro', () => {
      const p = new Person('Joao Silva', 30);
      p.addEmail(new Email('joaoemail.com'));
      expect(
        p.isValidToInclude().some((e) => e.startsWith('Email invalido'))
      ).toBe(true);
    });

    test('Email sem ponto deve retornar erro', () => {
      const p = new Person('Joao Silva', 30);
      p.addEmail(new Email('joao@emailcom'));
      expect(
        p.isValidToInclude().some((e) => e.startsWith('Email invalido'))
      ).toBe(true);
    });

    test('Email sem dominio antes do ponto deve retornar erro', () => {
      const p = new Person('Joao Silva', 30);
      p.addEmail(new Email('joao@.com'));
      expect(
        p.isValidToInclude().some((e) => e.startsWith('Email invalido'))
      ).toBe(true);
    });

    test('Email sem TLD deve retornar erro', () => {
      const p = new Person('Joao Silva', 30);
      p.addEmail(new Email('joao@email.'));
      expect(
        p.isValidToInclude().some((e) => e.startsWith('Email invalido'))
      ).toBe(true);
    });

    test('Email sem parte local deve retornar erro', () => {
      const p = new Person('Joao Silva', 30);
      p.addEmail(new Email('@email.com'));
      expect(
        p.isValidToInclude().some((e) => e.startsWith('Email invalido'))
      ).toBe(true);
    });

    test('Multiplos emails - um invalido deve retornar erro apenas para ele', () => {
      const p = new Person('Joao Silva', 30);
      p.addEmail(new Email('joao@email.com'));
      p.addEmail(new Email('invalido'));
      const errors = p.isValidToInclude();
      expect(errors.length).toBe(1);
      expect(errors[0]).toContain('invalido');
    });
  });

  describe('Combinacao de erros', () => {
    test('Nome invalido, idade invalida e sem email retorna 3 erros', () => {
      const p = new Person('A', 0);
      const errors = p.isValidToInclude();
      expect(errors).toHaveLength(3);
    });
  });
});
