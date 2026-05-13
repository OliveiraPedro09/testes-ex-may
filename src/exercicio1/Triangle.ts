export enum TriangleType {
  EQUILATERO = 'EQUILATERO',
  ISOSCELES = 'ISOSCELES',
  ESCALENO = 'ESCALENO'
}

export class Triangle {
  constructor(
    private readonly a: number,
    private readonly b: number,
    private readonly c: number
  ) {}

  public classify(): TriangleType {
    if (this.a <= 0 || this.b <= 0 || this.c <= 0) {
      throw new Error('Os lados devem ser maiores que zero');
    }

    if (
      this.a + this.b <= this.c ||
      this.a + this.c <= this.b ||
      this.b + this.c <= this.a
    ) {
      throw new Error(
        'A soma de dois lados deve ser maior que o terceiro lado'
      );
    }

    if (this.a === this.b && this.b === this.c) {
      return TriangleType.EQUILATERO;
    }

    if (this.a === this.b || this.a === this.c || this.b === this.c) {
      return TriangleType.ISOSCELES;
    }

    return TriangleType.ESCALENO;
  }
}
