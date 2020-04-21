/**
 * Vue的插件，用来获取和设置cookie存储
 **/
const local = {
  save (c_name,value,expiredays) {
    const exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    window.document.cookie = `${c_name}=${JSON.stringify(value)}${((expiredays==null) ? "" : ";expires="+exdate.toGMTString())}`
  },
  fetch (c_name) {
    if (window.document.cookie.length>0){
      let c_start = window.document.cookie.indexOf(c_name + "=")

      if (c_start!=-1){
        c_start = c_start + c_name.length + 1
        let c_end = window.document.cookie.indexOf(";",c_start)
        if (c_end==-1) {
           c_end = window.document.cookie.length
        }
        return window.document.cookie.substring(c_start,c_end)
      }
    }
    return ""
  }
}

export default {
  install: function (vm) {
    vm.prototype.$local = local
  }
}
