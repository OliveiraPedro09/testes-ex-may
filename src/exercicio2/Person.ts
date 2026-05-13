import { Email } from './Email';

export class Person {
  public readonly emails: Email[] = [];

  constructor(public name: string, public age: number) {}

  public addEmail(email: Email): void {
    this.emails.push(email);
  }

  public isValidToInclude(): string[] {
    const errors: string[] = [];

    if (!this.hasValidName()) {
      errors.push(
        'O nome deve ter pelo menos 2 partes e conter apenas letras'
      );
    }

    if (!this.hasValidAge()) {
      errors.push('A idade deve estar no intervalo [1, 200]');
    }

    if (this.emails.length === 0) {
      errors.push('A pessoa deve ter pelo menos um email associado');
    } else {
      for (const email of this.emails) {
        if (!Person.isValidEmail(email.name)) {
          errors.push(
            `Email invalido: "${email.name}" - formato esperado "____@____.____"`
          );
        }
      }
    }

    return errors;
  }

  private hasValidName(): boolean {
    if (!this.name) return false;
    const parts = this.name.trim().split(/\s+/);
    if (parts.length < 2) return false;
    const onlyLetters = /^[A-Za-zÀ-ÿ]+$/;
    return parts.every((p) => onlyLetters.test(p));
  }

  private hasValidAge(): boolean {
    return Number.isFinite(this.age) && this.age >= 1 && this.age <= 200;
  }

  private static isValidEmail(value: string): boolean {
    const regex = /^[^@.\s]+@[^@.\s]+\.[^@.\s]+$/;
    return regex.test(value);
  }
}
