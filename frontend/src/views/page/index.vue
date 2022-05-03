<template>
  <div class="app-wrapper">
    <img class="image" :src="image" alt="" />
    <div class="main-box">
      <div class="main-container">
        <!-- 文章简述 -->
        <div class="description">
          <h4 style="font-size: 15px; color: #409eff">{{ $t('blog.introduce') }}</h4>
          <span v-html="description"></span>
        </div>
        <!-- 文章标题 -->
        <div class="blog-title">
          <h3>{{ $t('blog.title') }}:&nbsp;</h3>
          <h3 v-html="title"></h3>
        </div>
        <!-- 文章主体内容 -->
        <div class="ql-snow">
          <div class="blog-container ql-editor" v-html="container"></div>
        </div>
        <!-- 显示评论弹窗按钮 -->
        <div class="addBtns">
          <el-button type="primary" @click="$router.push('/categories')">{{ $t('blog.back') }}</el-button>
          <el-button type="primary" @click="showCommentDrawer = true">{{ $t('blog.comment') }}</el-button>
        </div>
        <div v-for="(itme, i) in commentList" :key="i">
          <!-- 展示评论区 -->
          <div class="show-comment">
            <div class="header-ifo">
              <!-- 头像 -->
              <div class="header-img">
                <img src="../../assets/images/blog_log.png" alt="" />
              </div>
              <div class="header-top">
                <div>
                  <span>{{ itme.username }}</span>
                  <el-tag type="primary" size="mini" v-if="itme.username === 'admin'">{{ $t('blog.author') }}</el-tag>
                  &nbsp;
                  <el-tag type="info" size="mini" v-if="itme.osName">{{ itme.osName }}</el-tag>
                  &nbsp;
                  <el-tag type="info" size="mini" v-if="itme.osVersion">{{ itme.osVersion }}</el-tag>
                </div>
                <div class="header-footer">
                  <span style="font-size: 13px">{{ itme.createdate }}</span>
                  <el-tag class="cursor" type="info" @click="commentReply(itme.id, itme.username)">{{ $t('blog.reply') }}</el-tag>
                </div>
              </div>
            </div>
            <div class="show-container" v-html="itme.comment"></div>
          </div>
          <!-- 二级评论  statr -->
          <div :style="{ display: childrenComment.length > 0 ? 'block' : 'none' }">
            <div class="show-comment" style="margin-left: 55px" v-for="(children, i2) in childrenComment" :key="i2">
              <!-- 判断子评论的id与根评论的id是否一致，成立，则列出与该根id有关的所有评论 -->
              <div v-if="children.comment_id === itme.id">
                <div class="header-ifo">
                  <div class="header-img">
                    <img src="../../assets/images/comment_second.png" alt="" />
                  </div>
                  <div class="header-top">
                    <div>
                      <span>{{ children.username }}</span>
                      <el-tag type="primary" size="mini" v-if="children.username === 'admin'">{{ $t('blog.author') }}</el-tag>
                      &nbsp;
                      <el-tag type="info" size="mini">{{ children.osName }}</el-tag>
                      &nbsp;
                      <el-tag type="info" size="mini">{{ children.osVersion }}</el-tag>
                    </div>
                    <div class="header-footer">
                      <span style="font-size: 13px">{{ children.createdate }}</span>
                      <el-tag class="cursor" type="info" @click="commentReply(itme.id, children.username)">{{ $t('blog.reply') }}</el-tag>
                    </div>
                  </div>
                </div>
                <div class="show-container" v-html="children.comment"></div>
              </div>
            </div>
          </div>
          <!--二级评论 end  -->
        </div>
      </div>
    </div>
    <!-- 下拉弹窗 -->
    <el-drawer :title="showCommentDrawerTitle" :visible.sync="showCommentDrawer" direction="btt" size="50%" :before-close="handleClose" :wrapperClosable="false">
      <el-form :model="commentForm" :rules="commentFormRules" ref="commentFormRef" style="margin: 10px">
        <el-form-item prop="comment">
          <el-input type="text" v-model="commentForm.username" :placeholder="$t('blog.nickname')" :rows="3"></el-input>
        </el-form-item>
        <el-form-item prop="comment">
          <el-input
            type="textarea"
            v-model="commentForm.comment"
            :placeholder="objUsername == '' ? $t('blog.writeComments') : objUsername"
            :rows="3"
            @keyup.ctrl.enter.native="objUsername == '' ? addComment() : addReplay()"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="addBtns">
        <el-tag type="success" class="ismobile">{{ $t('blog.keyboardSubmit') }}</el-tag>
        <el-button type="primary" class="addBtn" @click="addComment" v-if="!isReplay">{{ $t('blog.publish') }}</el-button>
        <el-button type="primary" class="addBtn" @click="addReplay" v-else>{{ $t('blog.reply') }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getComment, postComment, getCommentReply, postCommentReply, viewCount } from '@/api/test'
export default {
  name: 'Page',
  props: {},
  data() {
    return {
      showCommentDrawer: false,
      deviceIfon: '',

      author: null,

      title: '',
      description: '',
      container: '',
      image: '',
      commentForm: {
        // 帖子ID
        blog_container_id: 0,
        // 上级评论ID
        comment_id: 0,
        topic_title: '',
        comment: '',
        username: '',
        osName: '',
        osVersion: '',
      },
      commentList: [],
      // 回复评论对象名称 回复 xxx:
      objUsername: '',
      isReplay: false,
      childrenComment: [],
    }
  },
  created() {
    // 获取系统信息
    this.getSysIfo()

    this.title = window.sessionStorage.getItem('title')
    this.commentForm.topic_title = this.title
    this.description = window.sessionStorage.getItem('description')
    this.container = window.sessionStorage.getItem('container')
    this.commentForm.blog_container_id = window.sessionStorage.getItem('blog_id')
    this.commentForm.username = window.sessionStorage.getItem('username')
    this.author = window.sessionStorage.getItem('author')
    this.image = window.sessionStorage.getItem('image')
    this.getComment()

    // 获取所有回复评论
    this.getCommentReplay()
    viewCount(this.commentForm.blog_container_id)
  },
  computed: {
    showCommentDrawerTitle() {
      return this.$store.getters.lang === 'zh-CN' ? '请输入昵称与内容' : 'Please input nickname and comments.'
    },
    commentFormRules() {
      return {
        comment: [
          { required: true, message: this.$t('blog.pleaseInput'), trigger: 'blur' },
          { min: 1, max: 300, message: '标题长度在 1-300 个字符', trigger: 'blur' },
        ],
      }
    },
  },
  methods: {
    // 抽屉弹窗关闭调事件
    handleClose(done) {
      this.$refs.commentFormRef.clearValidate()
      this.objUsername = ''
      this.isReplay = false
      this.$refs.commentFormRef.resetFields()
      done()
    },
    getSysIfo() {
      // 获取设备信息
      const agent = navigator.userAgent
      // 根据括号进行分割
      const left = agent.indexOf('(')
      const right = agent.indexOf(')')
      // 获取括号里面的内容
      const str = agent.substring(left + 1, right)
      // 以分号(;)分割字符串
      const Str = str.split(';')
      // 获取系统名称
      this.commentForm.osName = Str[0].replace('NT', '')
      // 获取系统版本
      this.commentForm.osVersion = Str[1]
    },
    // 获取评论
    async getComment() {
      getComment({ blog_container_id: this.commentForm.blog_container_id }).then((res) => {
        if (res.code === 200) {
          this.commentList = res.data.list
        }
        this.showCommentDrawer = false
      })
    },
    // 发布评论
    addComment() {
      this.$refs.commentFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        if (this.commentForm.username === 'admin') {
          return this.$message.error('YOu CANNOT USE 【admin】 AS USERNAME')
        }
        postComment(this.commentForm).then((res) => {
          if (res.code !== 200) {
            this.$message.success('error')
          }
          this.$message.success('success')
          this.getComment()
          // 清除表单验证
          this.$refs.commentFormRef.clearValidate()
          // 重置表单初始值
          this.$refs.commentFormRef.resetFields()
          this.objUsername = ''
        })
      })
    },
    // 点击 回复按钮 事件
    commentReply(comment_id, objUsername) {
      this.showCommentDrawer = true
      this.isReplay = true
      this.objUsername = 'Reply ' + objUsername + ': '
      this.commentForm.comment_id = comment_id
    },
    // 获取所有回复
    async getCommentReplay() {
      getCommentReply({ blog_container_id: this.commentForm.blog_container_id }).then((res) => {
        if (res.code === 200) {
          this.childrenComment = res.data.list
        }
        this.showCommentDrawer = false
      })
    },
    // 回复评论触发事件
    addReplay() {
      this.$refs.commentFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        if (this.commentForm.username === 'admin') {
          return this.$message.error('YOu CANNOT USE ADMIN AS USERNAME')
        }
        this.commentForm.comment = this.objUsername + this.commentForm.comment
        postCommentReply(this.commentForm).then((res) => {
          if (res.code !== 200) {
            return this.$message.error('error!')
          }
          this.$message.success('success')
          this.getCommentReplay()
          this.showCommentDrawer = false
          // 重置表单验证
          this.$refs.commentFormRef.clearValidate()
          this.$refs.commentFormRef.resetFields()
          this.isReplay = false
          this.objUsername = ''
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.image {
  width: 55%;
  display: block;
  position: relative;
  margin: auto;
}
/* 移动端 */
@media screen and (max-width: 639px) {
  .image {
    display: none;
  }
  .main-box {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 25px;
    letter-spacing: 0.5px;
  }
  .ismobile {
    display: none;
  }
  .main-container {
    margin: 0 auto;
    min-height: 300px;
    width: 100%;
    /* width: 60%; */
  }
  .description {
    font-size: 14px;
    padding: 15px;
    border-left: 8px solid #409eff;
    padding-left: 20px;
    min-height: 100px;
    width: calc(100% - 8px - 20px -15px);
    /* 换行 */
    word-wrap: break-word;
    background-color: #f3f4f4;
  }
  .description::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .blog-title {
    display: flex;
    margin-top: 30px;
    min-height: 50px;
    line-height: 30px;
    padding-left: 10px;
    border-left: 6px solid #409eff;
  }
  .blog-container {
    font-size: 14px;
    margin-top: 20px;
  }
  .addBtns {
    display: flex;
    padding: 10px;
    justify-content: space-between;
  }
  .show-comment {
    display: flex;
    /* 竖向排列 */
    flex-direction: column;
    /* justify-content: center; */
    justify-items: center;
    margin: 5px 5px 3px 5px;
  }
  .header-ifo {
    display: flex;
    height: 60px;
    flex-direction: row;
  }
  .header-img {
    width: 50px;
    height: 50px;
  }
  .header-img img {
    width: 50px;
    height: 50px;
  }
  .header-top {
    display: flex;
    width: 100%;
    height: 60px;
    flex-direction: column;
    margin: 0px 10px 5px 5px;
  }
  .header-footer {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
  }
  .show-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    margin: 5px 10px 0px 55px;
    min-height: 60px;
    padding: 5px;
    background-color: #f3f4f4;
  }
}

/*适应pad端*/
@media screen and (min-width: 640px) and (max-width: 1024px) {
  .image {
    display: none;
  }
  .main-box {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 25px;
    letter-spacing: 0.5px;
  }
  .main-container {
    padding: 28px;
    min-height: 300px;
  }
  /* 文章介绍 */
  .description {
    font-size: 1.5rem;
    padding: 15px;
    border-left: 8px solid #409eff;
    padding-left: 20px;
    min-height: 100px;
    width: 100%;
    /* 换行 */
    word-wrap: break-word;
    background-color: #f3f4f4;
  }
  .description h4 {
    font-size: 1.5rem !important;
  }
  .description::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  /* 文章标题 */
  .blog-title {
    display: flex;
    margin-top: 60px;
    min-height: 50px;
    line-height: 50px;
    padding-left: 10px;
    font-size: 1.5rem;
    border-left: 6px solid #409eff;
  }
  /* 文章内容展示区 */
  .blog-container {
    font-size: 1.5rem;
    margin-top: 40px;
  }
  /* 添加评论按钮 */
  .addBtns {
    display: flex;
    margin: 10px;
    justify-content: space-between;
  }
  .addBtns button {
    font-size: 1.5rem;
  }
  /* 评论区 */
  .show-comment {
    display: flex;
    /* 竖向排列 */
    font-size: 1.5rem;
    flex-direction: column;
    /* justify-content: center; */
    justify-items: center;
    padding: 5px 5px 3px 5px;
  }
  .header-ifo {
    display: flex;
    height: 60px;
    flex-direction: row;
  }
  .header-img {
    width: 50px;
    height: 50px;
  }
  .header-img img {
    width: 50px;
    height: 50px;
  }
  .header-top {
    display: flex;
    width: 100%;
    height: 60px;
    flex-direction: column;
    margin: 0px 10px 5px 5px;
  }
  .header-footer {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
  }
  .header-top span:first {
    font-size: 1.2rem;
  }
  .header-top span:nth-child(2) {
    font-size: 1.1rem;
  }
  .header-top span:nth-child(3) {
    font-size: 1.1rem;
  }
  .header-top span:nth-child(4) {
    font-size: 1.1rem;
  }
  .header-footer span {
    font-size: 1.2rem !important;
  }
  .show-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    margin: 5px 10px 0px 55px;
    min-height: 60px;
    padding: 5px;
    background-color: #f3f4f4;
  }
}

/* PC端 */
@media screen and (min-width: 1025px) {
  .main-box {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 25px;
    letter-spacing: 0.5px;
  }

  .main-container {
    margin: 0 auto;
    min-height: 300px;
    width: 900px;
    /* width: 60%; */
  }
  .description {
    font-size: 14px;
    padding: 15px;
    border-left: 8px solid #409eff;
    padding-left: 20px;
    min-height: 100px;
    width: 100%;
    /* 换行 */
    word-wrap: break-word;
    background-color: #f3f4f4;
  }
  /* .description::-webkit-scrollbar {
    height: 0;
    width: 0;
} */
  .blog-title {
    display: flex;
    margin-top: 60px;
    min-height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border-left: 6px solid #409eff;
  }
  .blog-container {
    font-size: 14px;
    margin-top: 40px;
  }
  .addBtns {
    display: flex;
    margin: 10px;
    justify-content: space-between;
  }
  .show-comment {
    display: flex;
    /* 竖向排列 */
    flex-direction: column;
    /* justify-content: center; */
    justify-items: center;
    margin: 5px 5px 3px 5px;
  }
  .header-ifo {
    display: flex;
    height: 60px;
    flex-direction: row;
  }
  .header-img {
    width: 50px;
    height: 50px;
  }
  .header-img img {
    width: 50px;
    height: 50px;
  }
  .header-top {
    display: flex;
    width: 100%;
    height: 60px;
    flex-direction: column;
    margin: 0px 10px 5px 5px;
  }
  .header-footer {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
  }
  .show-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    margin: 5px 10px 0px 55px;
    min-height: 60px;
    padding: 5px;
    background-color: #f3f4f4;
  }
}

/* 鼠标经过回复按钮时 */
.cursor {
  cursor: pointer;
}
</style>
