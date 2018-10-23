<template>
  <div class="view">
    <wrapper-page>
      <div class="canvas">
        <div class="list">
          <component
            v-for="(item, index) in list"
            :key="index"
            :is="item.component"
            v-bind="item.data">
          </component>
        </div>
      </div>
    </wrapper-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

// Сенсор
const { ResizeSensor } = require('css-element-queries');

// Интерфейс списка
interface IListItem {
  // Компонент
  component: any,

  // Данные
  data: any,
}

@Component
export default class Books extends Vue {
  // Идентификатор полки
  @Prop() public shelfId!: string;

  // Изменение маршрута
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange() {
    this.$store.dispatch(
      'selectShelf',
      {
        shelfId: this.shelfId,
        ...this.$route.query,
      },
    );
  }

  // Кол-во книг на страницу
  PER_PAGE = 12;

  // Область просмотра
  view!: HTMLElement;

  // Холст
  canvas!: HTMLElement;

  // Сенсор области просмотра
  resizeSensorView: any;

  // Сенсор холста
  resizeSensorCanvas: any;

  // Хук на подключение html
  mounted() {
    this.view = this.$el;
    // eslint-disable-next-line
    this.canvas = this.$el.getElementsByClassName('canvas')[0] as HTMLElement;

    this.resizeSensorView = new ResizeSensor(
      this.view,
      this.onResize.bind(this),
    );
    this.resizeSensorCanvas = new ResizeSensor(
      this.canvas,
      this.onResize.bind(this),
    );

    this.view.addEventListener(
      'scroll',
      this.onScroll.bind(this),
    );
  }

  // Хук на уничтожение
  beforeDestroy() {
    this.removeSensors();
    this.view.removeEventListener(
      'scroll',
      this.onScroll.bind(this),
    );
  }

  // Удалить сенсоры
  removeSensors(): void {
    if (this.resizeSensorView) { this.resizeSensorView.detach(); }
    if (this.resizeSensorCanvas) { this.resizeSensorCanvas.detach(); }
  }

  // Обработчик изменения размеров
  onResize() {
    if (this.canvas.offsetHeight < this.view.offsetHeight) {
      this.$store.dispatch('loadMoreBooks');
    }
  }

  // Обработчик скролла
  onScroll() {
    if (!this.$store.getters.books.length) {
      return;
    }

    const { scrollTop, scrollHeight, offsetHeight } = this.view;
    const scrollMax = scrollHeight - offsetHeight;

    if (scrollTop > scrollMax - (offsetHeight / 2)) {
      this.$store.dispatch('loadMoreBooks');
    }
  }

  // Список книг по страницам
  get list(): IListItem[] {
    const { books } = this.$store.getters;
    const result: IListItem[] = [];
    let page = 1;

    for (let i = 0; i < books.length; i += 1) {
      if (i && i % this.PER_PAGE === 0) {
        page += 1;
        result.push({
          component: 'delimiter',
          data: { page },
        });
      }
      result.push({
        component: 'book-item',
        data: { book: books[i] },
      });
    }

    return result;
  }
}
</script>

<style scoped lang="scss">

.view {
  @include col-max();
  overflow: auto;
}
.canvas {
  @include col-auto();
}

.list {
  @include row-auto();
  flex-wrap: wrap;
  justify-content: center;
  padding: 24px 36px;
}

</style>
