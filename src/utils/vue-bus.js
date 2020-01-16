const install = (Vue) => {
  Vue.prototype.$bus = new Vue({
    methods: {
      emit(event, ...args) {
        this.$emit(event, ...args)
      },
      on(event, ...args) {
        this.$on(event, ...args)
      },
      off(event, ...args) {
        this.$off(event, ...args)
      }
    }
  })
}

export default install
