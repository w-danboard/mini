<!-- 倒计时组件 -->
<template>
  <div class="idss-count-down">
    <div class="wrap">
      <div :class="['flex', {'separate': !theme}]">
        <div
          class="time-title"
          :style="{'background':background}"
          v-if="!!name || $slots.name">
          <slot name="name">{{name}}</slot>
        </div>
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
            v-if="isShowTimeUnit(index)"
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
let TIME_TYPE = ['dd', 'dd hh', 'dd hh:mm', 'dd hh:mm:ss', 'hh', 'hh:mm', 'hh:mm:ss', 'mm', 'mm:ss', 'ss'] // 时间精准支持的类型
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
      default: '参考倒计时' // 此处默认值太定制化 为不影响之前使用此组件的项目 暂不更改
    },
    // 组件单位 值为false时 则不显示时间单位 (* Array传参方式 为了兼容之前使用过此组件的项目 现不建议使用Array传参 有点恶心。。。 *)
    formatter: {
      type: [Boolean, Array, Object],
      default: () => {
        return { d: '天', h: '时', m: '分', s: '秒' }
      }
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
      validator (type) {
        type = type.toLowerCase()
        if (type && !TIME_TYPE.includes(type)) {
          console.error(`type类型必须为: ${TIME_TYPE.join(' || ')}`)
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
    endTime: {
      get () {
        if (this.data instanceof Date) {
          if (!isNaN(this.data)) return this.data.getTime()
          console.error(`传入截止时间格式有误。 请传入时间戳， 或参考此格式: new Date('2020-07-03 17:48:33')`)
          return 0
        }
        return Number(this.data) > 0 ? Number(this.data) : 0
      },
      set (value) {
        return value
      }
    },
    /* 主题 1为不分割展示 2为分割展示 */
    step () {
      return this.theme ? 1 : 2
    },
    /* 显示时间单位的位置 */
    unitLocation () {
      const length = this.timeArr.length
      const step = this.step
      const num = !this.isTypeError ? this.typesArr.length : 4
      const temp = [length - 1, length - step - 1, length - step * 2 - 1, length - step * 3 - 1]
      temp.length = num > 1 ? num : 1
      return temp
    },
    /* 时间精度, 根据传进的type时间精度，转换为数组。 例：[dd, hh, mm, ss] */
    typesArr () {
      return this.type.replace(/(\s|:)/g, ',').split(',')
    },
    /* 针对formatter组件单位，传入Array或Boolean类型，统一转换为Object类型输出 */
    formatterObj () {
      let initialValue = { d: '天', h: '时', m: '分', s: '秒' }   // 初始值
      let formatter = {}
      // 如果用户传入formatter为数组 则转换为对象
      if (Array.isArray(this.formatter)) {
        Object.keys(initialValue).forEach((item, index) => {
          formatter[item] = this.formatter[index] || initialValue[item]
        })
      } else {
        formatter = Object.assign(initialValue, this.formatter)
      }
      // 如果用户传入formatter为布尔 则转换为对象
      if (this.formatter === true) formatter = initialValue
      return formatter
    },
    /* 传入type值是否正确 */
    isTypeError () {
      let type = this.type.toLowerCase()
      return !TIME_TYPE.includes(type)
    }
  },
  watch: {
    /* 监听data数据变化 */
    data (newV, oldV) {
      console.log(newV, oldV)
      this.startTimer()
    },
    /* 监听type变化 */
    type (newV, oldV) {
      console.log(newV, oldV)
      this.startTimer()
    },
    /* 监听数据发生变化时 翻页效果 */
    timeArr (newV, oldV) {
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
      timeArr: [],         // 时间值
      timeArrT: [],        // 翻页的时间值 相当于复制了一份timeArr 只是延迟350ms执行
      isAnimate: []        // 翻页时的动画 初始都是false 翻页时为true
    }
  },
  methods: {
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
      if (!this.formatter) return false // formatter为false时直接不显示所有单位
      if (this.unitLocation.includes(index)) return true // 显示对应的单位
      return false
    },
    /* 设置时间单位 */
    setTimeUnit (index) {
      let types = this.typesArr.map(item => item.slice(1))
      if (this.isTypeError) types = ['d', 'h', 'm', 's']
      switch (index) {
        case this.timeArr.length - 1 :
          return this.formatterObj[types[types.length - 1]]
        case this.timeArr.length - this.step - 1:
          return this.formatterObj[types[types.length - 2]]
        case this.timeArr.length - this.step * 2 - 1:
          return this.formatterObj[types[types.length - 3]]
        default:
          return this.formatterObj[types[types.length - 4]]
      }
    },
    /* 启动定时器 */
    startTimer () {
      let t = this.endTime - new Date().getTime() // 计算时间差
      t = t < 0 ? 0 : t
      let [d, h, m, s] = [0, 0, 0, 0] // 定义变量day, hour, min, second保存倒计时的时间

      /* 时间精度 */
      const secT = 1000
      const minT = secT * 60
      const hourT = minT * 60
      const dayT = hourT * 24

      if (this.isTypeError) {
        this.timeArr = this.theme ? new Array(4).fill('00') : arr = new Array(8).fill('0')
        return
      }

      let typeObj = {}
      this.typesArr.forEach(item => { typeObj[item] = item })
      d = typeObj['dd'] ? d = Math.floor(t / dayT) : 0                    // 天
      h = typeObj['hh'] && typeObj['dd'] ? Math.floor(t / hourT % 24)     // 时
        : (typeObj['hh'] && !typeObj['dd'] ? Math.floor(t / hourT) : 0)
      m = typeObj['mm'] && typeObj['hh'] ? Math.floor(t / minT % 60)      // 分
        : (typeObj['mm'] && !typeObj['hh'] ? Math.floor(t / minT) : 0)
      s = typeObj['ss'] && typeObj['mm'] ? Math.round(t / secT % 60)      // 秒
        : (typeObj['ss'] && !typeObj['mm'] ? Math.round(t / secT) : 0)

      /* 根据主题 计算timeArr长度 */
      let timeObj = { 'dd': d, 'hh': h, 'mm': m, 'ss': s }
      let calc = {
        1: (str, unit) => arr.push(String(unit).padStart(2, '0')),
        2: (str, unit) => arr.push(...String(unit).padStart(2, '0').split(''))
      }
      let arr = []
      this.typesArr.forEach(item => {
        calc[this.step](item, timeObj[item])
      })
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