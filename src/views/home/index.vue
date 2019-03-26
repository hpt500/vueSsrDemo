<template>
    <div class="lt-home lt-btBk" :class="[!isMobile?'':'mobile__home']">
        <!-- <div class="home__bg noselect" @click="createArenaFn">
            <img :src="homeBg" alt="">
        </div> -->
        <lt-title title="首页" v-if="!isMobile"></lt-title>

    </div>
</template>
<script>
import { mapGetters } from "vuex";

import ltTitle from "R/title";

export default {
  title: "首页",
  metaInfo() {
    return {
      title: "首页 | ssr渲染展示",
      meta: [
        { name: "keyword", content: "vue，ssr，服务端渲染" },
        { name: "description", content: "VueSsr服务端渲染" },
        { property: "og:title", content: "VueSsr|首页" },
        { property: "og:description", content: "VueSsr服务端渲染" }
      ]
    };
  },
  async asyncData({ store, route, isMobile }) {
    // 页面进入前访问接口获取数据
  },
  data() {
    return {
      test: 555,
      isMobile: this.$store.state.isMobile,
    };
  },
  computed: {},
  created() {
    
  },
  mounted() {
    
  },
  beforeRouteEnter(to, from, next) {
    console.log("进入首页xxxxxxxxxxxx");
    next(vm => {
      vm.loadAjax = true;
      // 通过 `vm` 访问组件实例
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log("离开首页");
    
    next();
  },
  components: {
    ltTitle,
  },
  methods: {
    async enter() {
      
    },
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
