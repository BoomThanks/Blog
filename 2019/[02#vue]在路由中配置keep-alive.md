
# [vue] 在路由中配置keep-alive

## 需求

项目中经常有`tabs标签页`的使用，要求保留某个页面，切换页面不会再次请求刷新

## 实现

每一个`router`就是一个页面，所以在`router.meta`中配置`keepAlive`是最好的

```js
/* router.vue */

const router = new VueRouter({
  {
    path: '/home',
    name: 'Home',
    component: () => import("@/views/home.vue"),
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () => import("@/views/user.vue"),
    meta: {
      keepAlive: false
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

> 注意不能在`<keep-alive>`标签中判断`v-if`，因为这样如果`keepAlive=false`时，整个`<keep-alive>`都被销毁
