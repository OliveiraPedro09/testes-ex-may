import { Cargo } from './Cargo';
import { Funcionario } from './Funcionario';

type RegraDesconto = {
  limite: number;
  descontoAcimaOuIgual: number;
  descontoAbaixo: number;
};

const REGRAS: Record<Cargo, RegraDesconto> = {
  [Cargo.DESENVOLVEDOR]: {
    limite: 3000,
    descontoAcimaOuIgual: 0.2,
    descontoAbaixo: 0.1
  },
  [Cargo.DBA]: {
    limite: 2000,
    descontoAcimaOuIgual: 0.25,
    descontoAbaixo: 0.15
  },
  [Cargo.TESTADOR]: {
    limite: 2000,
    descontoAcimaOuIgual: 0.25,
    descontoAbaixo: 0.15
  },
  [Cargo.GERENTE]: {
    limite: 5000,
    descontoAcimaOuIgual: 0.3,
    descontoAbaixo: 0.2
  }
};

export class CalculadoraSalario {
  public calcular(funcionario: Funcionario): number {
    if (funcionario.salarioBase < 0) {
      throw new Error('O salario base nao pode ser negativo');
    }

    const regra = REGRAS[funcionario.cargo];
    const desconto =
      funcionario.salarioBase >= regra.limite
        ? regra.descontoAcimaOuIgual
        : regra.descontoAbaixo;

    return funcionario.salarioBase * (1 - desconto);
  }
}
