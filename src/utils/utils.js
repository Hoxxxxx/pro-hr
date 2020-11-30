// loading
export function OpenLoading(val,type) {     // type=1：普通请求； type=2：抛转请求
  const loading = val.$loading({
    lock: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  val.overloading = setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
    if (type == 1) {
      val.$message.warning('网络问题，请稍候重试！');
    } else if (type == 2) {
      val.$message.warning('网络问题，请稍候刷新页面重试！');
    }
  },15000)
  return loading;
}