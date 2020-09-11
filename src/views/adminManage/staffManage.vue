<template>
  <div class="staffManage">
      staffManage
  </div>
</template>

<script>
import http from  '../../utils/request';
import configUrl from '../../api/configUrl'
export default {
  data() {
    return {};
  },
  mounted(){
    this.getUserInfo()
  },
  methods:{
    getUserInfo(){
      http.GET(configUrl.getUserInfo).then(res=>{
        console.log(res)
      })
    }
  },
  components: {},
};
</script>

<style>
</style>
