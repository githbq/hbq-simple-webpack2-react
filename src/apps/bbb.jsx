console.log(Math.random())
window.onpopstate = function () {
  debugger
  if (history.state && history.state.gotoIndex) {
    location.href = 'http://baidu.com'
  }
}
debugger
// if (history.length===1) { //应该用这段代码
if (history.length > 0) { //测试用代码
  debugger
  history.replaceState({ gotoIndex: 1 }, undefined, undefined)
  history.pushState({}, undefined, undefined)
}
