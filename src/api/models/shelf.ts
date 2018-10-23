// Модель полки
export default class Shelf {
  // Идентификатор полки
  public id: string;

  // Наименование полки
  public title: string;

  constructor(vm: any) {
    this.id = `${vm.id}`;
    this.title = vm.name;
  }
}
