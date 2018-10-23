<template>
  <div class="view">
    <app-header/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class User extends Vue {
  // Идентификатор пользователя
  @Prop() public id!: string;

  // Хук на создание
  public created() {
    this.setUser();
    this.getShelves();
  }

  // Установить текущего пользователя
  public setUser() {
    this.$store.dispatch('setUserId', this.id);
  }

  // Загрузить полки
  public async getShelves() {
    try {
      // Загрузим список полок
      const shelves = await this.$store.dispatch('getShelves');
      if (shelves && shelves.length) {
        const { shelfId } = this.$route.params;
        if (shelves.some((item: any) => item.id === shelfId)) {
          // Установим выбранную полку
          this.$store.dispatch(
            'selectShelf',
            { shelfId, ...this.$route.query },
          );
        } else {
          // Или выбираем первую
          this.$router.push({
            name: 'shelf',
            params: {
              shelfId: shelves[0].id,
            },
          });
        }
      }
    } catch (error) {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="scss">

.view {
  @include col-max();
}

</style>
