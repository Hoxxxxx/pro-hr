<template>
  <div class="Container">
    <div class="imgBox">
      <img src="./welcome.png" alt />
    </div>
  </div>
</template>
<script>
import http from "../../utils/request";
import configUrl from "../../api/configUrl";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getToken();
  },
  methods: {
    getToken() {
      let params = {
        code: "abcdef",
      };
      http.POST(configUrl.getToken, params).then(res => {
        let token = res.data.token
        sessionStorage.setItem("token", token);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.Container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 768px;

  .imgBox {
    width: 600px;
    height: 382px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .tip {
      font-size: 20px;
      color: gray;
      margin-top: 40px;
      text-align: center;
    }
  }
}
</style>
