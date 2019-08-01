import Vue from 'vue'
import Router from 'vue-router'
import hmusic from '@/components/hmusic'
import mvmusic from "@/components/mvmusic"
import playmv from "@/components/playmv"
import newmusic from "@/components/newmusic"
import playmic from "@/components/playmic"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hmusic',
      component: hmusic
    },
    {
      path: '/mvmusic',
      name: 'mvmusic',
      component: mvmusic
    },
    {
      path: '/playmv',
      name: 'playmv',
      component: playmv
    },
    {
      path: '/newmusic',
      name: 'newmusic',
      component: newmusic
    },
    {
      path: '/playmic',
      name: 'playmic',
      component: playmic
    }
  ]
})
