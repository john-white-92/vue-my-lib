<template>
  <div class="delimiter">
    <p class="delimiter__page">{{page}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Delimiter extends Vue {
  // Номер страницы
  @Prop() public page!: number;
}
</script>

<style scoped lang="scss">

$delimiter-bg: #c4d3d6;

.delimiter {
  @include col-auto();
  margin: 24px;
  position: relative;
  width: 100%;
  height: 16px;
  &:after {
    content: '';
    position: absolute;
    top: 8px - 1px;
    left: 0;
    right: 0;
    border: solid 1px $delimiter-bg;
  }
}
.delimiter__page {
  @include col-auto();
  justify-content: center;
  align-items: center;
  min-width: 16px;
  height: 16px;
  margin: auto;
  padding: 0 4px;
  font-size: 11px;
  font-weight: bold;
  border-radius: 16px;
  background: $delimiter-bg;
  color: #FFFFFF;
  pointer-events: none;
  z-index: 1;
}

</style>
