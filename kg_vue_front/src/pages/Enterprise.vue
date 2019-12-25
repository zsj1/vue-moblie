<template>
  <div>
    <van-nav-bar :title="entName" left-text="返回" left-arrow @click-left="onClickLeft" />
    Enterprise
  </div>
</template>

<script>
export default {
  name: "Enterprise",
  data() {
    return {
      entName: "",
    };
  },
  mounted() {
    let _this = this;
    let entName = this.$route.params.entName;
    if (entName.length > 10) {
      _this.entName = `${entName.slice(0, 10)}...`;
    } else {
      _this.entName = entName;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>
