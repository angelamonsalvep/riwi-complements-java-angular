export interface Stats {
  fuerza: number;
  agilidad: number;
}

export class Character {
  constructor(
    public name: string,
    private life: number,
    public stats: Stats,
    public arma?: string
  ) {}

  getVida(): number {
    return this.life;
  }
}
