function ct(){
    return document.compatMode == "BackCompat"? document.body.clientHeight:document.documentElement.clientHeight;
  }
  var f=document.getElementById('footer');
  (window.onresize=function(){
    f.style.position=document.body.scrollHeight>ct()?'':'absolute';
  })();