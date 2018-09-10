import Vue from 'vue';
import Router from 'vue-router';
import Error404 from '@/view/Error404';
import Routers from '@/view/Router';
import navigationGuards from './navigationGuards';

Vue.use(Router);

const myRouter = new Router({
  routes: [
    {
      path: '/',
      redirect: () => 'snatch/home',
    },
    {
      path: '/register',
      name: 'register',
      component: Routers.Register,
    },
    {
      path: '/snatch',
      name: 'snatch',
      component: Routers.Snatch.Index,
      redirect: () => 'snatch/home',
      children: [
        {
          path: 'home',
          name: 'snatchHome',
          component: Routers.Snatch.Home,
        },
        {
          path: 'detail/:id',
          name: 'snatchDetail',
          component: Routers.Snatch.Detail,
        },
        {
          path: 'success',
          name: 'snatchSuccess',
          component: Routers.Snatch.Success,
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: Error404,
    },
  ],
});

// 路由守卫
myRouter.beforeEach(navigationGuards);

export default myRouter;
