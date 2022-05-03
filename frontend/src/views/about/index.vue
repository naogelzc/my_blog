<template>
  <div>
    <vue-particles
      class="hidden"
      id="particles-js"
      color="#409EFF"
      :particleOpacity="0.1"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="4"
      linesColor="#409EFF"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <el-carousel trigger="click" height="60vh">
      <el-carousel-item v-for="item in imageBox" :key="item.id">
        <div class="web-bg">
          <img :src="item.image" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
    <about-component />
  </div>
</template>

<script>
import AboutComponent from '@/components/About'
export default {
  name: 'About',
  props: {},
  components: { AboutComponent },
  data() {
    return {
      imageBox: [
        { id: 1, image: require('@/assets/images/spring.jpg') },
        { id: 2, image: require('@/assets/images/summer.jpg') },
        { id: 3, image: require('@/assets/images/autumn.jpg') },
        { id: 4, image: require('@/assets/images/winter.jpg') },
      ],
    }
  },
  created() {},
  mounted() {
    // 在PC端,进入该页面时向下滚动当前可视窗体高度, 如果移动端,则不进行操作
    if (!/(Android|iPhone|iPad|iOS|webOS|BlackBerry)/i.test(navigator.userAgent)) {
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      document.documentElement.scrollTop = windowHeight
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.el-carousel {
  margin: 20px 20% 0 20%;
  width: 60%;
}
/* 移动端 */
@media screen and (max-width: 639px) {
  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    -ms-flex-direction: column;
    flex-direction: column;
    justify-content: space-between;
  }
  .el-carousel {
    display: none;
  }
}

/*适应pad端*/
@media screen and (min-width: 640px) and (max-width: 1024px) {
  .detail {
    font-size: 1.4rem;
    min-height: 80px;
    padding: 30px;
  }
  .el-carousel {
    display: none;
  }
}

/* PC端 */
@media screen and (min-width: 1025px) {
  .web-bg {
    position: relative;
    display: flex;
    width: 100%;
    min-height: 100%;
  }
  .web-bg img {
    width: 100%;
    height: 100%;
  }
  .container {
    display: flex;
    min-height: 500px;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    text-align: center;
  }
  .detail {
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    line-height: 100px;
    min-height: 100px;
  }
}
#particles-js {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
}
@media screen and (max-width: 639px) {
  #particles-js {
    display: none;
  }
}
@media screen and (min-width: 640px) and (max-width: 1024px) {
  #particles-js {
    display: none;
  }
}
</style>
