<template>
  <div>
    <van-tabbar v-model="active" class="active_tab">
      <van-tabbar-item v-for="(item,index) in tabbars" :key="index" @click="tab(index,item.name)">
        <span :class="currIndex == index ? active:''">{{item.title}}</span>
        <template slot="icon" slot-scope="props">
          <van-icon :name="props.active ? item.active : item.normal"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: "home",
          title: "首页",
          normal: "wap-home-o",
          active: "wap-home",
        },
        {
          name: "me",
          title: "我的",
          normal: "manager-o",
          active: "manager",
        }
      ]
    };
  },
  methods: {
    tab(index, val) {
      this.currIndex = index;
      this.$router.push(val);
    }
  }
};
</script>

<style scoped>
.van-tabbar-item--active {
  color: #44cef6;
}
</style>
