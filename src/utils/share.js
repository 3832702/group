/**
 * [description 设置分享配置]
 * @return {[type]} [description]
 */
export const setShareFn = function() {
  this.$shareFn[this.$route.name] = () => {
    this.setShareConfig();
  }
}
