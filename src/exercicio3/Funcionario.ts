import { Cargo } from './Cargo';

export class Funcionario {
  constructor(
    public readonly nome: string,
    public readonly email: string,
    public readonly salarioBase: number,
    public readonly cargo: Cargo
  ) {}
}
