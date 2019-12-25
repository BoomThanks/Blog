
# [vue] 在路由中配置keep-alive

```js
/* router.vue */

const router = new VueRouter({
  {
    path: '/home',
    name: 'Home',
    component: () => import("@/views/home.vue"),
    meta: {
      keepAlive :true
    }
  },
  // ...  
})
```

```html
/* App.vue */

<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```
