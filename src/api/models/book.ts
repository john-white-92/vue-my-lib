import SITE_URL from '@/api/url';

// Модель книги
export default class Book {
  // Идентификатор книги
  public id: string;

  // Название книги
  public title: string;

  // URL обложки
  public cover: string;

  // Авторы
  public authorsTitles: string;

  // Рейтинг
  public rate: number;

  constructor(vm: any) {
    this.id = `${vm.id}`;
    this.title = vm.work && vm.work.title;
    this.cover = `${SITE_URL}${vm.work && vm.work.cover}`;
    this.authorsTitles = vm.work && vm.work.authors_titles;
    this.rate = vm.work && vm.work.rating && vm.work.rating.score;
  }
}
