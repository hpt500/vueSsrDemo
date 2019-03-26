<template>
    <div id="app">

        <!-- router路由界面 -->
        <transition name="fade" mode="out-in">
            <keep-alive exclude="ltHome">
                <router-view class="view"></router-view>
            </keep-alive>
        </transition>

    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import { Utils } from "@/util/index.js";
let util = new Utils();

export default {
  name: "app",
  metaInfo() {
    return {
      title: "VueSsr | 首页"
    };
  },
  async asyncData({ store, route }) {
    // 页面载入前访问获取数据
  },
  data() {
    return {
      title: ""
    };
  },
  components: {},
  computed: {},
  methods: {
    test() {}
  },
  watch: {
    $route(to, from) {
      // 监听路由变化
    }
  },
  mounted() {}
};
</script>

<style lang="scss" >
</style>
