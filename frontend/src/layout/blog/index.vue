<template>
  <div v-show="$store.getters.loaded || $route.path !== '/home'">
    <div id="scroll_top">
      <el-tooltip placement="top">
        <div slot="content">
          <el-switch class="custom-theme" size="mini" style="display: block" v-model="language" active-color="#409eff" inactive-color="#409eff" active-text="English" inactive-text="中文" />
          <br />
          <el-button ref="backTopButton" size="mini" onclick="window.scrollTo(0,0);" type="primary" round>{{ $t('blog.backToTop') }}</el-button>
        </div>
        <el-button icon="el-icon-star-off" circle></el-button>
      </el-tooltip>
    </div>
    <el-container class="app-wrapper">
      <el-header>
        <div style="cursor: pointer" @click="() => $router.push('/').catch(() => {})">
          <img src="@/assets/images/blog_header.png" alt="" />
          <span style="color: #409eff">{{ config.title }}</span>
        </div>
        <div>
          <el-input v-if="$route.name === 'Categories'" placeholder="search" prefix-icon="el-icon-search" v-model="search" clearable></el-input>
          <el-menu :default-active="activeIndex" mode="horizontal" background-color="#ffffff" active-text-color="#409eff" router>
            <el-menu-item index="/home">{{ $t('blog.home') }}</el-menu-item>
            <el-menu-item index="/categories">{{ $t('blog.category') }}</el-menu-item>
            <!-- <el-menu-item class="/isShow" index="lab">{{ $t('blog.lab') }}</el-menu-item> -->
            <el-menu-item index="/about">{{ $t('blog.about') }}</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <keep-alive exclude="Home,Page">
          <router-view :query="query" />
        </keep-alive>
      </el-main>
      <el-footer>
        <span>Copyright © 2022 Naoge</span>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Config from '@/settings.js'
export default {
  data() {
    return {
      config: Config,
      language: this.$store.getters.lang !== 'zh-CN',
      tagList: [],
      search: '',
      query: '',
      activeIndex: this.$route.path,
      swichThem: true,
      timer: '',
    }
  },
  created() {},
  watch: {
    language: function (val) {
      if (val) {
        this.$store.commit('lang/SET_LANG', 'en-US')
        this.$i18n.locale = 'en-US'
      } else {
        this.$store.commit('lang/SET_LANG', 'zh-CN')
        this.$i18n.locale = 'zh-CN'
      }
    },
    $route: {
      handler: function (route) {
        this.activeIndex = route.path
        if (route.path === '/categories') {
          const x = this.$store.getters.positionX
          const y = this.$store.getters.positionY
          window.scrollTo(x, y)
        } else {
          window.scrollTo(0, 0)
        }
      },
    },
    search: {
      deep: true,
      handler() {
        this.debounce()
      },
    },
  },
  methods: {
    debounce() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.query = this.search
      }, 1000)
    },
  },
}
</script>
<style scoped>
/* BACK TO TOP */
#scroll_top {
  padding: 5px 10px;
  text-align: center;
  border-top-left-radius: 5px;
  font-size: 12px;
  color: #ccc;
  opacity: 0.8;
  position: fixed;
  right: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 1000;
}
.el-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  width: 100%;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 3px hsl(0deg 0% 7% / 10%), 0 0 0 1px hsl(0deg 0% 7% / 10%);
  /* background-color: #666; */
}
.el-header div {
  display: flex;
  align-items: center;
  margin: 10px;
}
.el-header img {
  height: 50px;
  width: 50px;
  margin-right: 5px;
}
.el-menu {
  border-style: none;
}
@keyframes bounce {
  0% {
    bottom: 0px;
  }
  50% {
    bottom: 20px;
  }
}
.el-main {
  margin: 0px;
  padding: 0px;
}
.el-footer {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 5% !important;
  background: rgb(233, 230, 230);
}
.edit {
  display: flex;
  margin-top: 20px;
  margin-right: 90px;
  justify-content: flex-end;
}
.el-input {
  width: 200px;
  height: 45px;
}
/* MOBILE */
@media screen and (max-width: 639px) {
  .el-header {
    padding: 0 !important;
  }
  .isShow {
    display: none;
  }
  .el-header div {
    padding: 0px;
    justify-content: space-around;
    margin: 0px;
  }
  .el-header img {
    display: none;
    height: 50px;
    width: 50px;
    margin-right: 1px;
  }
  .el-header span {
    display: none;
  }
  .el-menu {
    display: flex;
    justify-content: space-around;
  }
  .el-input {
    padding: 0px;
    width: 100px;
    height: 45px;
    font-size: 13px;
  }
}

/*PAD*/
@media screen and (min-width: 640px) and (max-width: 1024px) {
  .el-header {
    padding: 0 !important;
  }
  .isShow {
    display: none;
  }
  .el-header div {
    justify-content: flex-start;
    margin: 0px;
  }
  .el-header img {
    display: none;
    height: 50px;
    width: 50px;
    transform: translateX(10px);
  }
  .el-header span {
    display: none;
    transform: translateX(20px);
  }
  .el-menu {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  .el-menu-item {
    font-size: 1.7rem;
  }
  .el-input {
    /* padding: 0px 3px 0px 3px; */
    width: 50%;
    height: 45px;
    font-size: 1.5rem;
  }
  .el-footer {
    font-size: 1.6rem;
  }
}
</style>
