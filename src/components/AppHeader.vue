<template>
  <div class="header">
    <wrapper-page>
      <tabs
        :tabs="shelves"
        :current="current"
        @select="onSelect"/>
      <p class="title">{{current && current.title}}</p>
      <sort
        :list="sortList"
        @select="onSelectSort"/>
    </wrapper-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

// Сортировка
class Sort {
  // Направление сортировки - прямое
  public isDirect: boolean = true;

  // Сортировка активирована
  public isActive: boolean = false;

  // eslint-disable-next-line
  constructor(public title: string, public name: string) {}
}

@Component
export default class AppHeader extends Vue {
  // Изменение маршрута
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange() {
    // Список сортировки
    const readedId = this.$store.state.READED.id;
    this.sortList = this.$route.params.shelfId === readedId
      ? [
        this.ALL_SORT_LIST.byReadedDate,
        this.ALL_SORT_LIST.byRate,
      ]
      : [
        this.ALL_SORT_LIST.byDate,
        this.ALL_SORT_LIST.byTitle,
        this.ALL_SORT_LIST.bySharedRate,
      ];

    // Обновление данных
    const { sort, dir } = this.$route.query;
    this.sortList.forEach((item: any) => {
      // eslint-disable-next-line
      item.isActive = item.name === sort;
      // eslint-disable-next-line
      item.isDirect = dir || dir == null;
    });
  }

  // Текущая полка
  public get current() {
    return this.$store.getters.shelf;
  }

  // Полки пользователя
  public get shelves() {
    return this.$store.getters.shelves;
  }

  // Поля сорировки
  public sortList: Sort[] = [];

  // Все поля сортировки
  private readonly ALL_SORT_LIST = {
    byDate: new Sort('По дате добавления', 'created'),
    byTitle: new Sort('По названию', 'work__default_edition__title'),
    bySharedRate: new Sort('По общему рейтингу', 'work__rating_score'),
    byReadedDate: new Sort('По дате добавления', 'id'),
    byRate: new Sort('По оценке', 'score'),
  };

  // Выбор полки
  public onSelect(shelf: any) {
    this.$router.push({ name: 'shelf', params: { shelfId: shelf.id } });
  }

  // Выбор сортировки
  public onSelectSort(item: any) {
    let { isActive, isDirect } = item;

    if (isActive) {
      if (isDirect) {
        isDirect = false;
      } else {
        isActive = false;
        isDirect = true;
      }
    } else {
      isActive = true;
    }

    if (isActive) {
      this.$router.push({ query: { sort: item.name, dir: isDirect } });
    } else {
      this.$router.push({ query: {} });
    }
  }
}
</script>

<style scoped lang="scss">

.header {
  @include col-auto();
  padding: 12px 24px;
  z-index: 1000;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 0 4px 3px rgba(26,75,122,0.09);
}

.title {
  @include line();
  height: 46px;
  padding: 0 12px;
  line-height: 46px;
  font-size: 32px;
  color: $base-title-2;
}

</style>
