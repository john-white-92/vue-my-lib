<template>
  <ul class="tabs">
    <li class="tab"
      :class="{ 'tab--current' : tab === current }"
      :key="index"
      v-for="(tab, index) in tabs"
      @click="select(tab)">
      <p class="tab__title">{{tab.title}}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

// Интерфейс вкладки
interface ITab {

  // Наименование
  title: string;
}

@Component
export default class Tabs extends Vue {
  // Вкладки
  @Prop() public tabs!: ITab[];

  // Текущая вкладка
  @Prop() public current!: ITab;

  // Событие выбора вкладки
  @Emit() public select(tab: ITab) {}
}
</script>

<style scoped lang="scss">

$tab-height: 42px;
$tab-padding: 12px;

$tab-border: $base-border;
$tab-border-current: $base-active;
$tab-title: $base-title;

.tabs {
  @include row-auto();
  flex-wrap: wrap;
}

.tab {
  @include row-auto();
  align-items: center;
  position: relative;
  min-width: 18px;
  height: $tab-height;
  &,
  & * {
    cursor: pointer;
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: $tab-border;
    transition: background 0.2s ease;
  }
}

.tab--current {
  &:after {
    background: $tab-border-current;
  }
}

.tab__title {
  @include line();
  padding: 0 $tab-padding;
  font-size: 16px;
  text-align: center;
  user-select: none;
  color: $tab-title;
}

</style>
