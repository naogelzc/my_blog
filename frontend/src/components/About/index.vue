<template>
  <div class="about">
    <div class="introduce">
      <h1 class="title">{{ $t('blog.aboutMe') }}</h1>
      <p class="personal" v-if="$store.getters.lang === 'zh-CN'">
        Naoge，20年纽村计算机专业毕业，前端工程师，后端也熟悉，数据挖掘也会点，serverless学习中。<br />
        从初中接触到了互联网，起了个不易撞名的网名【孬哥】，跟着朋友们就叫我孬哥了。<br />
        喜欢研究各种技术，但也不敢说精通哪个，喜欢捣鼓各种工具，但效率也不高。<br />
        2022的目标: 保持健康，减肥！！！
      </p>
      <p class="personal" v-else>
        I graduated from the University of Auckland at the end of 2019 in New Zealand, majoring in information technology. As a front-end engineer, I know both front-end and back-end technologies. I
        am currently learning serverless.<br /><br />
        I like to study different knowledge, not only information technology, but also economy and culture. In the leisure time, I prefer mountain climbing, swimming, listening to songs, especially
        cooking.<br /><br />
        The goal for 2022: obtain an Azure certificate and lose weight.<br />
      </p>
    </div>
    <div class="introduce">
      <h1 class="title">{{ $t('blog.blogIntroduction') }}</h1>
      <p class="personal" v-if="$store.getters.lang === 'zh-CN'">
        闲来无事，做个博客。由于还在开发阶段，各项功能不完善，先不放源码呢。<br />
        技术栈如下：
      </p>
      <p class="personal" v-else>
        This blog records some technical knowledge encountered in my study and work. This blog is still in the development stage, and its functions are not perfect. After completion, I will upload the
        source code to GitHub. If anyone wants the blog source code at the moment, please contact me below.<br /><br />
        The Technology stack：
      </p>
      <el-tag effect="dark">vue</el-tag> + <el-tag type="success" effect="dark">vue-router</el-tag> + <el-tag type="info" effect="dark">axios</el-tag> +
      <el-tag type="warning" effect="dark">ElementtUI</el-tag> +
      <el-tag type="danger" effect="dark">Laravel</el-tag>
    </div>
    <div class="introduce">
      <h1 class="title">{{ $t('blog.contactMe') }}</h1>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"> <el-input v-model="contactForm.username" type="text" placeholder="Please input name" /> </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"> <el-input v-model="contactForm.email" type="text" placeholder="Please input email" /> </el-col>
      </el-row>
      <div style="margin: 20px 0" />
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"> <el-input v-model="contactForm.detail" type="textarea" placeholder="Please input content" /> </el-col>
      </el-row>
      <div style="margin: 20px 0" />
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"> <img @click="changeCodeImg" :src="imgcode" alt="" /> </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"> <el-input v-model="contactForm.verifyCode" type="text" placeholder="Please input verify code" /> </el-col>
      </el-row>
      <div style="margin: 20px 0" />
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin: 0 auto; text-align: center">
            <el-button @click="reset">{{ $t('blog.reset') }}</el-button>
            <el-button type="primary" @click="submit">{{ $t('blog.send') }}</el-button>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import { contact, captcha } from '@/api/test'
export default {
  name: 'AboutComponent',
  props: {},
  data() {
    return {
      imgcode: '',
      contactForm: {
        username: '',
        email: '',
        detail: '',
        verifyCode: '',
        key: '',
      },
    }
  },
  created() {
    this.getCaptcha()
  },
  mounted() {},
  methods: {
    getCaptcha() {
      captcha().then((res) => {
        this.imgcode = res.data.url.img
        this.contactForm.key = res.data.url.key
      })
    },
    submit(e) {
      this.$blur(e)
      if (!this.contactForm.username) {
        this.$message.error('Please input name')
        return
      }
      if (!this.contactForm.email) {
        this.$message.error('Please input email')
        return
      }
      if (!this.contactForm.detail) {
        this.$message.error('Please input content')
        return
      }
      if (!this.contactForm.verifyCode) {
        this.$message.error('Please input verify code')
        return
      }
      const loadingInstance = Loading.service({ fullscreen: true })
      contact(this.contactForm).then((res) => {
        this.getCaptcha()
        loadingInstance.close()
        if (res.code !== 200) {
          this.$message.error(this.$getError(res.msg))
        } else {
          this.contactForm = {
            username: '',
            email: '',
            detail: '',
            verifyCode: '',
          }
          this.$message.success('I will contact you asap!')
        }
      })
    },
    changeCodeImg() {
      this.getCaptcha()
    },
    reset(e) {
      this.$blur(e)
      this.contactForm = {
        username: '',
        email: '',
        detail: '',
        verifyCode: '',
        key: '',
      }
      this.getCaptcha()
    },
  },
}
</script>

<style lang="scss" scoped>
.about {
  width: 60%;
  padding: 20px;
  box-sizing: border-box;
  margin: 0px auto;
  // box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  // min-height: 100px;
}
.title {
  color: #303133;
  font-size: 30px;
  margin-bottom: 15px;
}

.introduce {
  margin-top: 10px;
  margin-bottom: 35px;
  .personal {
    color: #606266;
    font-size: 20px;
    line-height: 2.5rem;
    text-align: justify;
  }
}
/* 移动端 */
@media screen and (max-width: 639px) {
  .about {
    width: 80%;
    padding: 0;
  }
  .title {
    font-size: 20px;
  }
  .personal {
    font-size: 12px;
  }
}

/*适应pad端*/
@media screen and (min-width: 640px) and (max-width: 1024px) {
  .about {
    width: 80%;
    padding: 0;
  }
  .title {
    font-size: 20px;
  }
}
</style>
