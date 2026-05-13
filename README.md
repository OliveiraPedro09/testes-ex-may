# Testes de Software - Exercícios (FATEC)

Repositório com três exercícios de Testes de Software implementados em **TypeScript** com framework **Jest**.

- **Exercício 1** — Classificação de triângulos (Escaleno, Isósceles, Equilátero)
- **Exercício 2** — Validação de inclusão de `Person` com `Email` (TDD)
- **Exercício 3** — Calculadora de salário líquido de funcionários (TDD)

## Estrutura do projeto

```
testes-ex-may/
├── src/
│   ├── exercicio1/
│   │   └── Triangle.ts
│   ├── exercicio2/
│   │   ├── Email.ts
│   │   └── Person.ts
│   └── exercicio3/
│       ├── Cargo.ts
│       ├── Funcionario.ts
│       └── CalculadoraSalario.ts
├── tests/
│   ├── exercicio1/Triangle.test.ts
│   ├── exercicio2/Person.test.ts
│   └── exercicio3/CalculadoraSalario.test.ts
├── jest.config.js
├── tsconfig.json
└── package.json
```

## Pré-requisitos

- Node.js >= 18
- npm >= 9

## Build

Instala as dependências e compila o TypeScript:

```bash
npm install
npm run build
```

> A compilação não é necessária para rodar os testes — o `ts-jest` cuida disso em tempo de execução.

## Execução dos testes

Rodar **todos** os testes:

```bash
npm test
```

Rodar apenas um exercício:

```bash
npm run test:ex1   # Triangle
npm run test:ex2   # Person/Email
npm run test:ex3   # CalculadoraSalario
```

Rodar com **cobertura** (gera `coverage/` com relatório HTML em `coverage/lcov-report/index.html`):

```bash
npm run test:coverage
```

---

## Cobertura de código

O comando `npm run test:coverage` gera o relatório abaixo. Todos os testes foram executados via `jest --coverage` e os 3 exercícios atingiram **100% em statements, branches, functions e lines**.

```
PASS tests/exercicio1/Triangle.test.ts
PASS tests/exercicio3/CalculadoraSalario.test.ts
PASS tests/exercicio2/Person.test.ts
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------|---------|----------|---------|---------|-------------------
All files               |     100 |      100 |     100 |     100 |
 exercicio1             |     100 |      100 |     100 |     100 |
  Triangle.ts           |     100 |      100 |     100 |     100 |
 exercicio2             |     100 |      100 |     100 |     100 |
  Email.ts              |     100 |      100 |     100 |     100 |
  Person.ts             |     100 |      100 |     100 |     100 |
 exercicio3             |     100 |      100 |     100 |     100 |
  CalculadoraSalario.ts |     100 |      100 |     100 |     100 |
  Cargo.ts              |     100 |      100 |     100 |     100 |
  Funcionario.ts        |     100 |      100 |     100 |     100 |
------------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 100% ( 64/64 )
Branches     : 100% ( 32/32 )
Functions    : 100% ( 14/14 )
Lines        : 100% ( 60/60 )
================================================================================

Test Suites: 3 passed, 3 total
Tests:       53 passed, 53 total
```

Após executar `npm run test:coverage`, abra o relatório navegável em [coverage/lcov-report/index.html](coverage/lcov-report/index.html).

---

## Exercício 1 — Classificação de Triângulos

**Enunciado:** o programa lê três valores inteiros que representam os lados de um triângulo e informa se os lados formam um triângulo **isósceles**, **escaleno** ou **equilátero**. Condição: a soma de dois lados deve ser maior que o terceiro.

### Esqueleto da classe

Arquivo: [src/exercicio1/Triangle.ts](src/exercicio1/Triangle.ts)

```ts
export enum TriangleType {
  EQUILATERO = 'EQUILATERO',
  ISOSCELES  = 'ISOSCELES',
  ESCALENO   = 'ESCALENO'
}

export class Triangle {
  constructor(
    private readonly a: number,
    private readonly b: number,
    private readonly c: number
  ) {}

  public classify(): TriangleType { /* ... */ }
}
```

### Casos de teste

Arquivo: [tests/exercicio1/Triangle.test.ts](tests/exercicio1/Triangle.test.ts)

| # | Caso de teste | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Escaleno válido | `(3, 4, 5)` | `ESCALENO` |
| 2 | Equilátero válido | `(5, 5, 5)` | `EQUILATERO` |
| 3 | Isósceles válido | `(5, 5, 3)` | `ISOSCELES` |
| 4 | Isósceles — permutação | `(5, 5, 3)` | `ISOSCELES` |
| 5 | Isósceles — permutação | `(5, 3, 5)` | `ISOSCELES` |
| 6 | Isósceles — permutação | `(3, 5, 5)` | `ISOSCELES` |
| 7 | Um valor zero | `(0, 4, 5)` | erro `"maiores que zero"` |
| 8 | Um valor negativo | `(-1, 4, 5)` | erro `"maiores que zero"` |
| 9 | Três valores zero | `(0, 0, 0)` | erro `"maiores que zero"` |
| 10 | Soma de 2 = terceiro | `(1, 2, 3)` | erro `"soma de dois lados"` |
| 11 | Soma de 2 = terceiro (perm.) | `(1, 3, 2)` | erro |
| 12 | Soma de 2 = terceiro (perm.) | `(2, 1, 3)` | erro |
| 13 | Soma de 2 = terceiro (perm.) | `(2, 3, 1)` | erro |
| 14 | Soma de 2 = terceiro (perm.) | `(3, 1, 2)` | erro |
| 15 | Soma de 2 = terceiro (perm.) | `(3, 2, 1)` | erro |
| 16 | Soma de 2 < terceiro | `(1, 2, 10)` | erro |
| 17 | Soma de 2 < terceiro (perm.) | `(1, 10, 2)` | erro |
| 18 | Soma de 2 < terceiro (perm.) | `(2, 1, 10)` | erro |
| 19 | Soma de 2 < terceiro (perm.) | `(2, 10, 1)` | erro |
| 20 | Soma de 2 < terceiro (perm.) | `(10, 1, 2)` | erro |
| 21 | Soma de 2 < terceiro (perm.) | `(10, 2, 1)` | erro |

### Cobertura do Exercício 1

```
File           | % Stmts | % Branch | % Funcs | % Lines
Triangle.ts    |     100 |      100 |     100 |     100
```

---

## Exercício 2 — Person / Email (TDD)

**Enunciado:** implementar o método `isValidToInclude()` que retorna uma lista de erros validando:

1. O nome deve ter ao menos 2 partes e ser composto **apenas de letras**.
2. A idade deve estar no intervalo `[1, 200]`.
3. O objeto `Person` deve ter ao menos um objeto `Email` associado.
4. O nome do `Email` deve estar no formato `____@____.____` (cada parte com ao menos 1 caractere).

### Diagrama de classes

```
+------------------+              +-------------+
|     Person       |  1     1..*  |   Email     |
+------------------+--------------+-------------+
| name: string     |              | name: string|
| age: number      |              +-------------+
| emails: Email[]  |
+------------------+
| +addEmail(e)     |
| +isValidToInclude(): string[] |
+------------------+
```

### Arquivos

- [src/exercicio2/Email.ts](src/exercicio2/Email.ts)
- [src/exercicio2/Person.ts](src/exercicio2/Person.ts)
- [tests/exercicio2/Person.test.ts](tests/exercicio2/Person.test.ts)

### Casos de teste implementados

- Pessoa totalmente válida → lista vazia
- Nome com apenas 1 parte → erro
- Nome com números → erro
- Nome vazio → erro
- Nome com 3 partes → válido
- Idade `0`, negativa, `201` → erro
- Idade `1` e `200` (limites) → válida
- `Person` sem nenhum email → erro
- Email sem `@`, sem `.`, sem domínio, sem TLD, sem parte local → erro
- Vários emails, um válido + um inválido → erro só para o inválido
- Nome inválido + idade inválida + sem email → 3 erros simultâneos

### Cobertura do Exercício 2

```
File        | % Stmts | % Branch | % Funcs | % Lines
Email.ts    |     100 |      100 |     100 |     100
Person.ts   |     100 |      100 |     100 |     100
```

---

## Exercício 3 — Calculadora de Salário (TDD)

**Enunciado:** calcular o salário líquido de um funcionário (`nome`, `email`, `salarioBase`, `cargo`) aplicando descontos conforme o cargo:

| Cargo | Limite | Desconto se `salário ≥ limite` | Desconto se `salário < limite` |
|---|---|---|---|
| `DESENVOLVEDOR` | 3.000,00 | 20% | 10% |
| `DBA`           | 2.000,00 | 25% | 15% |
| `TESTADOR`      | 2.000,00 | 25% | 15% |
| `GERENTE`       | 5.000,00 | 30% | 20% |

### Arquivos

- [src/exercicio3/Cargo.ts](src/exercicio3/Cargo.ts)
- [src/exercicio3/Funcionario.ts](src/exercicio3/Funcionario.ts)
- [src/exercicio3/CalculadoraSalario.ts](src/exercicio3/CalculadoraSalario.ts)
- [tests/exercicio3/CalculadoraSalario.test.ts](tests/exercicio3/CalculadoraSalario.test.ts)

### Casos de teste (resumo)

Para cada cargo são cobertos:

- Salário **abaixo** do limite (desconto menor)
- Salário **exatamente no limite** (desconto maior — borda)
- Salário **bem acima** do limite (desconto maior)

E ainda:
- Salário 0 → resultado 0
- Salário negativo → lança erro

### Cobertura do Exercício 3

```
File                    | % Stmts | % Branch | % Funcs | % Lines
CalculadoraSalario.ts   |     100 |      100 |     100 |     100
Cargo.ts                |     100 |      100 |     100 |     100
Funcionario.ts          |     100 |      100 |     100 |     100
```
