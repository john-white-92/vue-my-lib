<template>
  <div class="book">
    <img class="book__cover" :src="book.cover">
    <p class="book__title">{{book.title}}</p>
    <p class="book__authors">{{book.authorsTitles}}</p>
    <p class="book__rate">{{book.rate}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// Модели
import { Book } from '@/api/models';

@Component
export default class BookItem extends Vue {
  // Книга
  @Prop() public book!: Book;
}
</script>

<style scoped lang="scss">

.book {
  @include col-auto();
  width: 160px;
  margin: 24px;
}
.book__cover {
  display: block;
  max-width: 100%;
  height: auto;
  margin-bottom: 8px;
}
.book__title {
  padding: 8px 0;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  color: $base-active;
}
.book__authors {
  text-align: center;
  font-size: 13px;
  color: $base-title-2;
}
.book__rate {
  @include col-auto();
  justify-content: center;
  height: 24px;
  margin: 0 auto;
  margin-top: 8px;
  padding-left: 32px;
  font-size: 13px;
  color: $base-title-2;
  background: url('../assets/star.svg') left no-repeat;
  background-size: 24px 24px;
}

</style>
