<!-- 倒计时组件 -->
<template>
  <div class="idss-count-down">
    <div class="wrap">
      <!-- separate样式是 props设置theme时显示的 也就是不分割 -->
      <div :class="['flex', {'separate': theme !== true}]">
        <div
          class="time-title"
          :style="{'background':background}"
          v-if="!!name">
          {{name}}
        </div>
        <!-- 假如theme是默认值false  也就是["0", "0", "0", "0", "0", "0", "0", "0"] -->
        <template v-for="(item, index) in timeArr">
          <div
            class="time-box"
            :style="{'background':background}"
            :key="index">
            {{item}}
            <div
              :class="['top_0',{'anime': isAnimate[index]}]"
              :style="{'background':background}">
              <div>{{item}}</div>
            </div>
            <div
              :class="['top_1',{'anime': isAnimate[index]}]"
              :style="{'background':background}"
              @animationend="onAnimateEnd(index)">
              <div>{{timeArrT[index]}}</div>
            </div>
            <div class="bottom" :style="{'background':background}">
              <div>{{timeArrT[index]}}</div>
            </div>
          </div>
          <div
            class="unit"
            :style="{'background':background}"
            v-show="isShowUnit(index)" v-if="isShowTimeUnit(index)"
            :key="`unit-${index}`">
            {{setTimeUnit(index)}}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Created by wangLin on 2019/2/19.
 *
 *  @timeEnd: 倒计时结束之后的钩子
 */
export default {
  name: 'idss-count-down',
  props: {
    // 截止时间
    data: {
      type: [Date, Number, String],
      default: 0
    },
    // 倒计时标题 (传空字符串则不显示标题)
    name: {
      type: String,
      default: '参考倒计时'
    },
    // 组件单位 值为false时 则不显示时间单位
    formatter: {
      type: [Boolean, Array],
      default: () => ['天', '时', '分', '秒']
    },
    // 组件主题 (true-合并 false-分离)
    theme: {
      type: Boolean,
      default: false
    },
    // 时间精度
    type: {
      type: String,
      default: 'dd hh:mm:ss',
      validator(type) {
        let types = ['dd', 'dd hh:mm:ss', 'hh:mm:ss', 'mm:ss', 'ss']
        if (type && !types.includes(type)) {
          console.error(`type类型必须为: ${types.join(' || ')}`)
        }
        return true
      }
    },
    // 背景颜色
    background: {
      type: String,
      default: 'linear-gradient(180deg, #3599cc, #2668cc)'
    }
  },
  computed: {
    /* 计算截止时间戳 */
    endTime () {
      if (this.data instanceof Date) {
        return this.data.getTime()
      }
      return Number(this.data) > 0 ? Number(this.data) : 0
    },
    /* 主题 */
    step () {
      return this.theme ? 1 : 2
    },
    /* 时间单位 */
    arr () {
      const length = this.timeArr.length
      const step = this.step
      const temp = [length - 1, length - step - 1, length - step * 2 - 1, length - step * 3 - 1]
      temp.length = this.getType(this.type) > 1 ? this.getType(this.type) : 1
      return temp
    },
    /* 组件单位处理 */
    formatterTemp () {
      return JSON.parse(JSON.stringify(this.formatter))
    }
  },
  watch: {
    /* 监听data数据变化 */
    data (newV, oldV) {
      console.log(newV, oldV)
      this.startTimer(true)
    },
    /* 监听数据发生变化时 翻页效果 */
    timeArr (newV, oldV) {
      /**
       * 此处if判断的newV和oldV是否相等的原因如下
       *    分割显示的情况 如果数组长度变了 比如之前是100天 变成99天了 
       *    那timeArrT和isAnimate应该也有所改变
       */
      if (newV.length !== oldV.length) {
        console.log(111)
        this.timeArrT = [...this.timeArr]
        this.isAnimate = this.generatingArrays(this.timeArr.length, false)
      }
      const diff = []
      newV.forEach((value, index) => {
        if (value !== oldV[index]) {
          this.$nextTick(() => {
            this.$set(this.isAnimate, index, true)
          })
          diff.push({ value, index })
        }
      })
      clearTimeout(this.watchTimer)
      this.watchTimer = setTimeout(() => {
        diff.forEach((item) => {
          this.$nextTick(() => {
            this.$set(this.timeArrT, item.index, item.value)
          })
        })
      }, 350)
    }
  },
  data () {
    return {
      isTypeError: false, // 传入的type值是否正确
      timeArr: [],  // 时间值
      timeArrT: [], // 翻页的时间值 相当于赋值了一份timeArr 只是延迟350ms执行
      isAnimate: [] // 翻页时的动画 初始都是false 翻页时为true
    }
  },
  methods: {
    /* 生成数组 */
    generatingArrays (len, val) {
      return new Array(len).fill(val)
    },
    /* 开始倒计时 */
    init () {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.startTimer, 1000)
    },
    /* 翻页动画 */
    onAnimateEnd (index) {
      this.$set(this.isAnimate, index, false)
    },
    /* 显示时间单位 */
    isShowTimeUnit (index) {
      if (this.arr.includes(index)) {
        return true
      }
      return false
    },
    /* 设置时间单位 */
    setTimeUnit (index) {
      let formatter = JSON.parse(JSON.stringify(this.formatterTemp))
      let type = this.getType(this.type)
      if (this.formatter === true) {
        formatter = ['天', '时', '分', '秒']
      }
      // type === 5 的时候 证明用户传入type值为dd 也就是只显示天
      if (type === 5) {
        let isTrue = this.timeArr.length - 1 === index
        return isTrue ? formatter[0] || '' : null
      }
      switch (index) {
        case this.timeArr.length - 1 :
          return formatter[3] || '' // 秒
        case this.timeArr.length - this.step - 1:
          return formatter[2] || '' // 分
        case this.timeArr.length - this.step * 2 - 1:
          return formatter[1] || '' // 时
        default:
          return formatter[0] || '' // 天
      }
    },
    /* 转换时间精度 */
    getType (type) { // 时间已有变化 就调这里 能不能用到的时候才调 晕
      let types = ['dd', 'dd hh:mm:ss', 'hh:mm:ss', 'mm:ss', 'ss']
      if (this.isTypeError && types.includes(type)) {
        this.isTypeError = false
        this.init()
      }
      switch (type) {
        case 'dd':
          return 5
        case 'dd hh:mm:ss':
          return 4
        case 'hh:mm:ss':
          return 3
        case 'mm:ss':
          return 2
        case 'ss':
          return 1
        default: 
          // 如果用户传入的type 不是 dd/dd hh:mm:ss/hh:mm:ss/mm:ss/ss
          this.isTypeError = true
          this.clearAllTimeout()
          return 4
      }
    },
    /* 判断是否显示单位 */
    isShowUnit (index) {
      if (this.formatter && this.setTimeUnit(index)) {
        return true
      }
      return false
    },
    /* 启动定时器 */
    startTimer () {
      let t = this.endTime - new Date().getTime()   // 计算时间差
      t = t < 0 ? 0 : t
      let [d, h, m, s] = [0, 0, 0, 0]    // 定义变量day, hour, min, second保存倒计时的时间

      /* 时间精度 */
      const type = this.getType(this.type)
      switch (type) {
        case 5:
          d = Math.floor(t / 1000 / 60 / 60 / 24)
          break
        case 4:
          d = Math.floor(t / 1000 / 60 / 60 / 24)
          h = Math.floor(t / 1000 / 60 / 60 % 24)
          m = Math.floor(t / 1000 / 60 % 60)
          s = Math.floor(t / 1000 % 60)
          break
        case 3:
          h = Math.floor(t / 1000 / 60 / 60)
          m = Math.floor(t / 1000 / 60 % 60)
          s = Math.floor(t / 1000 % 60)
          break
        case 2:
          m = Math.floor(t / 1000 / 60)
          s = Math.floor(t / 1000 % 60)
          break
        default:
          s = Math.floor(t / 1000)
      }

      /* 判断主题 */
      let arr = []
      if (this.theme) {
        if (type === 5) {
          arr.push(String(d).padStart(2, '0'))
        } else {
          type >= 4 && arr.push(String(d).padStart(2, '0'))
          type >= 3 && arr.push(String(h).padStart(2, '0'))
          type >= 2 && arr.push(String(m).padStart(2, '0'))
          arr.push(String(s).padStart(2, '0'))
        }
      } else {
        if (type === 5) {
          arr.push(...String(d).padStart(2, '0').split(''))
        } else {
          type >= 4 && arr.push(...String(d).padStart(2, '0').split(''))
          type >= 3 && arr.push(...String(h).padStart(2, '0').split(''))
          type >= 2 && arr.push(...String(m).padStart(2, '0').split(''))
          arr.push(...String(s).padStart(2, '0').split(''))
        }
      }
      this.timeArr = arr

      /* 判断倒计时 是否结束 */
      if (t > 0) {
        this.init()
      } else {
        this.$emit('timeEnd')
      }
    },
    /* 清除所有定时器 */
    clearAllTimeout () {
      clearTimeout(this.timer)
      clearTimeout(this.watchTimer)
    }
  },
  created () {
    this.startTimer()
  },
  beforeDestroy () {
    this.clearAllTimeout()
  }
}
</script>

<style scoped lang="postcss">

  .idss-count-down {
    color: #fff;
    /* background: pink; */

    font-family: Avenir,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    & .wrap {
      display: inline-block;

      & .time-title {
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        height: 38px;
        line-height: 38px;
        padding: 0 10px;
        margin-right: 8px;
      }

      & .flex {
        display: flex;

        &.separate {
          & .time-box {
            min-width: 26px;
          }
        }

        & .time-box {
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          height: 38px;
          line-height: 42px;
          min-width: 36px;
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          color: #fff;
          perspective: 50px;
          padding: 0 2px;
          margin-right: 4px;

          &:after {
            content: '';
            position: absolute;
            background: pink;
            height: 1px;
            top: 50%;
            left: 0;
            right: 0;
            z-index: 999;
          }

          & > div {
            position: absolute;
            left: 0;
            width: 100%;
            height: 50%;
            overflow: hidden;
            transform-style: preserve-3d;

            & > div {
              position: absolute;
              left: 0;
              width: 100%;
              height: 38px;
            }

            &.top_1 {
              top: 0;
              transform-origin: 50% bottom;
              animation-duration: 500ms;
              transform: rotateX(0);
              backface-visibility: hidden;
              z-index: 2;

              &.anime {
                animation-name: animate-filp;
              }

              & > div {
                top: 0;
              }
            }

            &.top_0 {
              top: 19px;
              transform-origin: 50% top;
              animation-duration: 500ms;
              transform: rotateX(180deg);
              backface-visibility: hidden;
              z-index: 2;

              & > div {
                bottom: 0;
              }

              &.anime {
                animation-name: animate-filp2;
              }

            }

            &.bottom {
              top: 19px;

              & > div {
                bottom: 0;
              }
            }

          }
        }

        & .unit {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          height: 38px;
          line-height: 38px;
          padding: 0 10px;

          &:not(:last-of-type) {
            margin-right: 8px;
          }

        }

      }
    }
  }

  @keyframes animate-filp {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(-180deg);
    }
  }

  @keyframes animate-filp2 {
    0% {
      transform: rotateX(180deg);
    }
    100% {
      transform: rotateX(0);
    }
  }
</style>