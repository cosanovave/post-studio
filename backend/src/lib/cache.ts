interface EntradaCache<T> {
  valor: T;
  expiraEn: number;
}

const TTL_MS = 10 * 60 * 1000; // 10 minutos

export class CacheSimple<T> {
  private mapa = new Map<string, EntradaCache<T>>();

  get(clave: string): T | undefined {
    const entrada = this.mapa.get(clave);
    if (!entrada) return undefined;
    if (Date.now() > entrada.expiraEn) {
      this.mapa.delete(clave);
      return undefined;
    }
    return entrada.valor;
  }

  set(clave: string, valor: T): void {
    this.mapa.set(clave, { valor, expiraEn: Date.now() + TTL_MS });
  }
}
