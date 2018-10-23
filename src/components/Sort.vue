<template>
  <ul class="list">
    <li class="item"
      :class="{
        'item--active' : item.isActive,
        'item--dir' : item.isDirect,
      }"
      :key="index"
      v-for="(item, index) in list"
      @click="select(item)">
      <p class="item__title">{{item.title}}</p>
      <div class="item__dir"></div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

// Интерфейс поля сортировки
interface ISortItem {

  // Наименование
  title: string;

  // Направление сортировки - прямое
  isDirect: boolean;

  // Сортировка активирована
  isActive: boolean;
}

@Component
export default class Sort extends Vue {
  // Список сортировки
  @Prop() public list!: ISortItem[];

  // Событие нажатия на поле сортировки
  @Emit() public select(item: ISortItem) {}
}
</script>

<style scoped lang="scss">

.list {
  @include row-auto();
  flex-wrap: wrap;
}

.item {
  @include row-auto();
  align-items: center;
  position: relative;
  min-width: 18px;
  height: 32px;
  padding-left: 12px;
  margin-right: 12px;
  margin-top: 6px;
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;
  background: $base-border;
  transition: background 0.2s ease;
}
.item--active {
  background: $base-active;
  .item__title {
    color: #FFFFFF;
  }
  .item__dir {
    opacity: 1;
  }
}
.item--dir {
  .item__dir {
    transform: rotate(270deg);
  }
}
.item__title {
  @include line();
  font-size: 14px;
  user-select: none;
  color: $base-title-2;
  transition: color 0.2s ease;
}
.item__dir {
  @include col-auto();
  width: 32px;
  height: 32px;
  background: url('../assets/arrow.svg') center no-repeat;
  background-size: 12px 12px;
  transform: rotate(90deg);
  opacity: 0;
}

</style>
