<template>
  <div>
    <div class="web-bg">
      <img :src="image" alt="" />
      <div class="show-info">
        <div class="show-message">
          <h1>{{ str }}</h1>
          <h1 v-if="showCN" class="h1-fade-in">{{ mottos[random].zh }}</h1>
        </div>
      </div>
    </div>
    <about-component class="isShow" />
  </div>
</template>

<script>
import AboutComponent from '@/components/About'
import { getImage } from '@/api/test'
export default {
  name: 'Home',
  props: {},
  components: { AboutComponent },
  data() {
    return {
      image: '',
      random: Math.floor(Math.random() * 7),
      mottos: [
        {
          zh: '愿你保持初心和善良,笑里尽是温暖与坦荡。',
          en: 'May you keep your original heart and kindness, and smile with warmth and magnanimity.',
        },
        {
          zh: '年轻就是无限的可能。',
          en: 'Youth means limitless possibilities.',
        },
        {
          zh: '真正的梦就是现实的彼岸。',
          en: 'Real dream is the other shore of reality.',
        },
        {
          zh: '不为模糊不清的未来担忧，只为清清楚楚的现在努力。',
          en: "Don't worry about the vague future, just strive for the clear present.",
        },
        {
          zh: '与其装腔作势企图影响别人，不如咬牙切齿狠命修理自己。',
          en: "Rather than pretending to influence others, it's better to grind your teeth and repair yourself.",
        },
        {
          zh: '上天是公平的，只要努力就会有收获，否则就是你不够努力。',
          en: 'God is fair, as long as effort will include results, otherwise is you hard enough.',
        },
        {
          zh: '人生没有后悔，我们只能尽力去不让自己后悔。',
          en: 'Life without regret, we can only do our best to not to regret.',
        },
      ],
      str: '',
      strLen: 0,
      stop: null,
      showCN: false,
    }
  },
  async created() {
    this.$store.commit('loaded/SET_LOAD', false)
    await getImage().then((res) => {
      if (res.code === 200) {
        this.image = res.data.url
      } else {
        this.image = require('@/assets/images/bg.jpg')
      }
      this.$store.commit('loaded/SET_LOAD', true)
    })
  },
  mounted() {
    this.stop = setInterval(this.strPrint, 60)
  },
  methods: {
    // print one by one
    strPrint() {
      this.str += this.mottos[this.random].en.charAt(this.strLen)
      this.strLen++
      if (this.strLen === this.mottos[this.random].en.length) {
        clearTimeout(this.stop)
        this.showCN = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.h1-fade-in {
  animation: fadeInAnimation ease 3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
/* MOBILE */
@media screen and (max-width: 639px) {
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
  .show-info {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    color: aliceblue;
    padding-top: 5%;
  }
  .show-info .show-message {
    position: relative;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    align-items: center;
    height: 70%;
  }

  .show-info h1 {
    letter-spacing: 3px;
    font-size: 17px;
  }
  .show-info .current {
    display: none;
    position: absolute;
    font-size: 30px;
    padding-left: 27%;
    bottom: 0;
    animation-name: bounce;
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }
  .isShow {
    display: block;
  }
}

/*PAD*/
@media screen and (min-width: 640px) and (max-width: 1024px) {
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
  .show-info {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    color: aliceblue;
    padding-top: 5%;
  }
  .show-info .show-message {
    position: relative;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    height: 70%;
    padding: 10px;
    font-size: 1.5rem;
  }
  .show-info h1 {
    letter-spacing: 3px;
    font-size: 1.9rem;
  }
  .show-info .current {
    display: none;
    position: absolute;
    font-size: 30px;
    padding-left: 27%;
    bottom: 0;
  }
  .isShow {
    display: block;
  }
}

/*PC*/
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
  .show-info {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    color: aliceblue;
    align-items: center;
  }
  .show-info .show-message {
    position: relative;
    min-height: 300px;
    min-width: 300px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .show-info h1 {
    letter-spacing: 5px;
  }
  .show-info .current {
    position: absolute;
    font-size: 30px;
    left: 47%;
    bottom: 0;
    animation-name: bounce;
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }
  .isShow {
    display: none;
  }
}
</style>
