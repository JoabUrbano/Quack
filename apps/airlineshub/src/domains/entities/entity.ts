export abstract class Entity {
  protected _id: string;

  equals(other: unknown): boolean {
    if (!(other instanceof Entity)) {
      return false;
    }

    if (other === this) {
      return true;
    }

    return this._id === other._id;
  }

  get id(): string {
    return this._id;
  }

  abstract raw(): Record<string, unknown>;
}
