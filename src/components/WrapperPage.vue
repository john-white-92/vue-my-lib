<template>
  <div class="wrapper-page">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class WrapperPage extends Vue {}
</script>

<style scoped lang="scss">
.wrapper-page {
  @include col-auto();
  width: 100%;
  min-width: 350px;
  max-width: 1024px;
  margin: 0 auto;
}
</style>
