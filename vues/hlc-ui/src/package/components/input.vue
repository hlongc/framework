<template>
  <div class="hlc-input" :class="inputClass">
    <hlc-icon
      v-if="prefixIcon"
      :type="prefixIcon"
    />
    <input
      :value="value"
      ref="inputRandom"
      :type="showPassword ? (showOrigin ? 'text' : 'password') : type"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    />
    <hlc-icon
      v-if="suffixIcon"
      :type="suffixIcon"
    />
    <hlc-icon 
      v-if="clearable"
      type="guanbi"
      @click.native="$emit('input', '')"
      @mousedown.native.prevent
    />
    <hlc-icon 
      v-if="type === 'password' && showPassword && value"
      type="browse"
      @click.native="changeState"
    />
  </div>
</template>
<script>
export default {
  name: 'hlc-input',
  data() {
    return {
      showOrigin: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    suffixIcon: String,
    prefixIcon: String
  },
  computed: {
    inputClass() {
      const classes = []
      if (this.clearable || this.showPassword || this.suffixIcon) {
        classes.push('hlc-input-suffix-icon')
      }
      if (this.prefixIcon) {
        classes.push('hlc-input-prefix-icon')
      }
      return classes
    }
  },
  methods: {
    changeState() {
      this.showOrigin = !this.showOrigin
      this.$nextTick(() => {
        this.$refs.inputRandom.focus()
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/package/styles/common.scss';
.hlc-input {
  display: inline-flex;
  position: relative;
  input {
    padding: 8px;
    width: 150px;
    height: 42px;
    border-radius: $border-radius;
    border: 1px solid $info;
    &:focus {
      border-color: $primary;
      outline: none;
      box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
    }
    &[disabled] {
      cursor: not-allowed;
      background-color: #eee;
    }
  }
  &.hlc-input-prefix-icon {
    input {
      padding-left: 24px;
    }
    .hlc-icon {
      position: absolute;
      top: 13px;
      left: 5px;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
  &.hlc-input-suffix-icon {
    input {
      padding-right: 24px;
    }
    .hlc-icon {
      position: absolute;
      top: 13px;
      right: 5px;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
}
</style>


