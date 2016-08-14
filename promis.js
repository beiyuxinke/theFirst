function get(url) {
  // 返回一个新的 Promise
  return new Promise(function(resolve, reject) {
    // 经典 XHR 操作
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // 当发生 404 等状况的时候调用此函数
      // 所以先检查状态码
      if (req.status == 200) {
        // 以响应文本为结果，完成此 Promise
        resolve(req.response);
      }
      else {
        // 否则就以状态码为结果否定掉此 Promise
        // （提供一个有意义的 Error 对象）
        reject(Error(req.statusText));
      }
    };

    // 网络异常的处理方法
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // 发出请求
    req.send();
  });
}

get('story.json').then(function(response) {
  console.log("Success!", response);
}, function(error) {
  console.error("Failed!", error);
});