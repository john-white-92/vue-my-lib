import Vue from 'vue';
import Router from 'vue-router';
import User from './views/User.vue';
import Books from './views/Books.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'user/1',
    },
    {
      path: '/user',
      redirect: 'user/1',
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      props: true,
      children: [
        {
          path: 'shelf',
          redirect: '.',
        },
        {
          path: 'shelf/:shelfId',
          name: 'shelf',
          component: Books,
          props: true,
        },
      ],
    },
  ],
});
