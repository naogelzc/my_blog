<template>
  <div class="app-wrapper">
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
    />
    <el-collapse v-model="activeNames" @change="handleClick">
      <el-collapse-item :title="$t('blog.selectTags')" name="first">
        <el-checkbox class="mgb-10" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{ $t('blog.selectAll') }}</el-checkbox>
        <el-checkbox-group v-model="tagSelected" @change="handleCheckedTagsChange" size="small">
          <el-row>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" :key="i" v-for="(item, i) in tagList">
              <el-checkbox class="mgb-10" :label="item" border />
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
    <el-card class="custom-theme">
      <div class="main-box" v-if="blogList.length === 0">{{ $t('blog.nothing') }}</div>
      <div class="main-box" v-for="(item, i) in blogList" :key="i">
        <div v-show="item.isHide !== 'yes'" style="display: flex; width: 100%">
          <div
            class="left"
            @click="goBlogPage(item.author, item.id, item.title, item.description, item.container, item.image ? item.image : require('@/assets/images/no_image.jpg'))"
            v-show="item.id !== ''"
          >
            <div class="box-left">
              <img :src="item.image ? item.image : require('@/assets/images/no_image.jpg')" alt="" />
            </div>
            <div class="box-right">
              <div class="box-right-title">
                <h3>
                  {{ item.title }}
                </h3>
                <el-badge :value="$t('blog.top')" class="istop" v-show="item.istop === 'yes'"></el-badge>
              </div>
              <div class="box-right-container">
                <h4 style="font-size: 15px; color: #409eff">{{ $t('blog.introduce') }}</h4>
                <span v-html="item.description"></span>
              </div>
              <div class="box-right-info">
                <div><i class="el-icon-user-solid"></i> {{ item.author }}</div>
                <div>{{ $t('blog.publishDate') }}: <i class="el-icon-time"></i>{{ item.createdate | timeDataFormat(that) }}</div>
                <div v-if="item.lastdate">{{ $t('blog.update') }}: <i class="el-icon-time"></i>{{ item.lastdate | timeDataFormat(that) }}</div>
                <div><i class="el-icon-view"></i> {{ item.views }}</div>
                <div style="font-size: 14px; color: #409eff"><i class="el-icon-price-tag"></i>{{ item.tag }}</div>
              </div>
            </div>
          </div>
          <div style="width: 100%; min-height: 300px; text-align: center" v-show="item.id === ''">
            <img src="@/assets/images/404.png" alt="404 not found" width="200" height="250" />
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[5, 10, 20, 30, 40, 50]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { categories, getTag } from '@/api/test'
export default {
  name: 'Categories',
  props: ['query'],
  data() {
    return {
      that: this,
      activeNames: 'first',
      blogList: [],
      total: 0,
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 10,
      },
      isIndeterminate: false,
      tagSelected: [],
      tagList: [],
      checkAll: true,
    }
  },
  created() {
    // const params = this.$route.params
    // this.$set(this.queryInfo, 'query', params.keyWords || '')
    // this.$set(this.queryInfo, 'tag', params.tag || '')
    getTag().then((res) => {
      res.data.list.forEach((item) => this.tagList.push(item.tag))
      this.tagSelected = this.tagList
      this.getBlogs()
    })
    this.isScroll()
  },
  activated() {
    this.getBlogs()
  },
  filters: {
    // 格式化时间,保留年月日
    timeDataFormat(str, that) {
      return that.$moment(str).format('yyyy-MM-DD')
    },
  },
  watch: {
    query: function () {
      this.queryInfo.query = this.query
      this.getBlogs()
    },
  },
  methods: {
    getTag() {
      getTag().then((res) => {
        res.data.list.forEach((item) => this.tagList.push(item.tag))
      })
    },
    handleClick() {},
    // 获取博客内容
    async getBlogs() {
      const { pageNum, pageSize, query } = this.queryInfo
      const params = {
        pageNum,
        pageSize,
        query,
      }
      if (this.tagSelected.length !== this.tagList.length && this.tagSelected.length !== 0) {
        params.tag = this.tagSelected.toString()
      }
      categories(params).then((res) => {
        this.blogList = res.data.list
        this.total = res.data.total
      })
    },
    // 监听 page-size 改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      // 当改变每页显示的数量时，页码重新回到第一页
      this.queryInfo.pageNum = 0
      this.getBlogs()
    },
    // 监听页码值对的改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getBlogs()
    },
    // 页面跳转
    goBlogPage(author, id, title, description, container, image) {
      window.sessionStorage.setItem('title', title)
      window.sessionStorage.setItem('description', description)
      window.sessionStorage.setItem('container', container)
      window.sessionStorage.setItem('blog_id', id)
      window.sessionStorage.setItem('author', author)
      window.sessionStorage.setItem('image', image)
      this.$router.push('/page')
      // 用于记录查看帖子次数
      // this.$http.get('countViews.php', { params: { blog_id: id } })
    },
    isScroll() {
      // 在搜索 和 选择分类时触发
      const isScroll = window.sessionStorage.getItem('scroll')
      if (isScroll) {
        // 在PC端,进入该页面时向下滚动当前可视窗体高度, 如果移动端,则不进行操作
        if (!/(Android|iPhone|iPad|iOS|webOS|BlackBerry)/i.test(navigator.userAgent)) {
          const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
          document.documentElement.scrollTop = windowHeight
          window.sessionStorage.removeItem('scroll')
        }
      }
    },
    handleCheckAllChange(val) {
      this.tagSelected = val ? this.tagList : []
      this.isIndeterminate = false
      if (val) {
        this.getBlogs()
      }
    },
    handleCheckedTagsChange(val) {
      if (val.length !== 0 && val.length !== this.tagList.length) {
        this.isIndeterminate = true
      }
      if (val.length === 0) {
        this.tagSelected = this.tagList
        this.isIndeterminate = false
        this.checkAll = true
      }
      if (val.length === this.tagList.length) {
        this.isIndeterminate = false
        this.checkAll = true
      }
      this.getBlogs()
    },
  },
}
</script>

<style scoped>
.el-collapse {
  margin: 0px 10% 0 10%;
  width: 80%;
  position: relative;
}
.el-collapse >>> .el-collapse-item__wrap {
  background-color: rgba(0, 0, 0, 0) !important;
}
/*适应移动端*/
@media screen and (max-width: 639px) {
  .el-card__body {
    padding: 10px !important;
  }
  .el-collapse {
    margin: 0px 10% 0 10%;
    width: 80%;
  }
  .el-card {
    display: flex;
    min-width: 100%;
    padding: 0px !important;
    margin: 0px !important;
    justify-content: center;
  }
  .main-box {
    background-color: #ffffff;
    display: flex;
    padding: 0;
    margin-top: 5%;
    margin-bottom: 10%;
    width: 100%;
    max-height: 250px;
    border: 2px solid #eee;
    border-radius: 10px;
  }
  .main-box:hover {
    cursor: pointer;
    box-shadow: 0 0 7px 3px #998;
  }
  .left {
    width: 100%;
    display: flex;
  }

  .box-left {
    display: none;
    /* flex: 4; */
    height: 250px;
    width: 280px;
    justify-content: center;
    border-radius: 15px;
    overflow: hidden;
  }

  /* .box-left img:hover {
    cursor: pointer;
    transform: scale(1.2);
  } */

  .box-right {
    display: flex;
    justify-items: center;
    flex-direction: column;
    overflow: hidden;
    min-width: 100%;
  }
  .box-right-title {
    flex: 1;
    position: relative;
    padding: 10px;
    font-size: 16px;
  }
  .istop {
    position: absolute;
    top: 3px;
    right: 5px;
  }
  .box-right-container {
    flex: 8;
    overflow-y: auto;
    font-size: 15px;
    border-left: 8px solid #409eff;
    padding-left: 10px;
    background-color: #eee;
  }
  .box-right-container::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .box-right-info {
    display: flex;
    flex: 1;
    padding: 5px;
    font-size: 13px;
    margin-top: 8px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    width: 80%;
    display: flex;
    margin-top: 30px;
    font-size: 10px;
    justify-content: flex-start;
    transform: scale(0.7);
  }
}

/* 适应pad端*/
@media screen and (min-width: 640px) and (max-width: 1024px) {
  .el-card {
    display: flex;
    min-width: 90%;
    justify-content: center;
  }
  .el-collapse {
    margin: 0px 10% 0 10%;
    width: 80%;
  }
  .main-box {
    background-color: #ffffff;
    display: flex;
    padding: 0;
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;
    max-height: 250px;
    border: 1px solid #eee;
    /* border-radius: 10px; */
  }
  .left {
    width: 100%;
    display: flex;
    margin: 0 auto;
  }
  .box-left {
    display: none;
  }
  .box-right {
    display: flex;
    /* padding: 5px; */
    justify-items: center;
    flex-direction: column;
    overflow: hidden;
    flex: 6;
    width: 100%;
  }
  .box-right-title {
    flex: 1;
    position: relative;
    font-size: 1.6rem;
  }
  .istop {
    position: absolute;
    top: 3px;
    right: 5px;
  }
  .box-right-container {
    flex: 8;
    overflow-y: auto;
    font-size: 1.5rem;
    border-left: 8px solid #409eff;
    padding-left: 20px;
    background-color: #eee;
  }
  .box-right-container::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .box-right-info {
    display: flex;
    flex: 1;
    padding: 5px;
    font-size: 1.2rem;
    margin-top: 8px;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    display: flex;
    margin-top: 30px;
    transform: translateX(10%);
    justify-content: flex-start;
  }
}

/* PC端 */
@media screen and (min-width: 1025px) {
  .el-card {
    display: flex;
    min-width: 80%;
    justify-content: center;
    margin: 25px 10% 0px 10%;
  }
  .main-box {
    background-color: #ffffff;
    display: flex;
    padding: 0;
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;
    max-height: 250px;
    border: 1px solid #eee;
    border-radius: 10px;
  }
  .main-box:hover {
    cursor: pointer;
    box-shadow: 0 0 7px 3px #998;
  }
  .left {
    width: 100%;
    display: flex;
    margin: 0 auto;
    flex: 6;
  }
  /* .right {
  display: flex;
  flex: 4;
  padding: 5px;
  overflow: hidden;
  background-color:#eee;
} */
  .box-left {
    display: flex;
    /* flex: 4; */
    height: 250px;
    width: 280px;
    justify-content: center;
    border-radius: 15px;
    overflow: hidden;
  }

  .box-left img {
    width: 250px;
    height: 240px;
    /* object-fit: scale-down; */
    transition: all 1s;
  }
  .box-left img:hover {
    cursor: pointer;
    transform: scale(1.2);
  }

  .box-right {
    display: flex;
    padding: 5px;
    justify-items: center;
    flex-direction: column;
    overflow: hidden;
    flex: 6;
    min-width: 80%;
  }
  .box-right-title {
    flex: 1;
    position: relative;
    padding: 10px;
    font-size: 16px;
  }
  .istop {
    position: absolute;
    top: 3px;
    right: 5px;
  }
  .box-right-container {
    flex: 8;
    overflow-y: auto;
    font-size: 14px;
    border-left: 8px solid #409eff;
    padding-left: 20px;
    background-color: #eee;
  }
  .box-right-container::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .box-right-info {
    display: flex;
    flex: 1;
    padding: 5px;
    font-size: 13px;
    margin-top: 8px;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
  }
}

h3:hover {
  color: #409eff;
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
