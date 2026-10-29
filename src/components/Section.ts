export interface SectionProps<T> {
  items: T[];
  renderer: (item: T) => HTMLElement;
}

export class Section<T> {
  private readonly _items: T[];
  private readonly _renderer: (item: T) => HTMLElement;
  private readonly _container: HTMLElement;

  constructor({ items, renderer }: SectionProps<T>, containerSelector: string) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector<HTMLElement>(containerSelector)!;
  }

  public renderItems(): void {
    this._items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }

  public addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}
