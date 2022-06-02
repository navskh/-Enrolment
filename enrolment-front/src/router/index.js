import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/Login.vue";
import memberjoin from "../views/MemberJoin.vue";
import test from "../views/Test.vue";
import mysubject from "../views/MySubject.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      //  path : url 주소
      path: "/login",
      // component: url 주소로 갔을 때 표시될 컴포넌트
      component: login,
    },
    {
      //  path : url 주소
      path: "/memberjoin",
      // component: url 주소로 갔을 때 표시될 컴포넌트
      component: memberjoin,
    },
    {
      //  path : url 주소
      path: "/test",
      // component: url 주소로 갔을 때 표시될 컴포넌트
      component: test,
    },
    {
      //  path : url 주소
      path: "/mysubject",
      // component: url 주소로 갔을 때 표시될 컴포넌트
      component: mysubject,
    },
    {
      path: "/",
      component: login,
    },
  ],
});
