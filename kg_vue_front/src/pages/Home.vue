<template>
  <div v-show="show">
    <van-panel>
      <div slot="header">
        <div class="header-title">
          <van-row type="flex" justify="center">
            <van-col span="3">
              <van-image width="40" height="40" :src="require('../assets/imgs/logo.png')"></van-image>
            </van-col>
            <van-col span="10">华融知识图谱</van-col>
          </van-row>
          <div class="header-title-tips">一键查询企业信息</div>
        </div>
      </div>
      <div>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @input="onChange"
        ></van-search>
      </div>
    </van-panel>
    <div class="search-res-container">
      <van-panel v-show="noResShow">
        <div slot="header"></div>
        <div class="no-res-tips">没有相关结果哦!</div>
      </van-panel>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-show="resShow"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
          is-link
          v-on:click="enterDetail(item)"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      count: 0,
      show: false,
      value: "",
      noResShow: false,
      resShow: false,
      list: [],
      loading: false,
      finished: false,
      companyList: []
    };
  },
  methods: {
    onChange(value) {
      // 键入自动搜索
      let _this = this;
      _this.resShow = false;
      _this.noResShow = false;
      if (value) {
        // 不支持空窗搜索
        _this.value = value;
        this.$axios
          .get("/api/searchCompanyList", {
            params: {
              companyName: value
            }
          })
          .then(res => {
            let data = res["data"];
            if (data["code"] === 200) {
              // 成功拿到数据
              _this.companyList = data["companyList"];
              _this.resShow = true;
              // 初始化list，塞入10个企业名，这里是为了防止“闪现‘没有更多了’”
              _this.list = data["companyList"].reduce(
                (initList, item, index) => {
                  if (index < 10) {
                    return [...initList, item["name"]];
                  } else {
                    return initList;
                  }
                },
                []
              );
            } else {
              _this.noResShow = true;
            }
          })
          .catch(err => {
            this.$toast.fail("出错啦！");
          });
      }
    },
    onLoad() {
      let _this = this;
      // 异步更新数据
      setTimeout(() => {
        let showLen = _this.list.length;
        let allLen = _this.companyList.length;
        let appendNum = 10;
        if (allLen - showLen <= 10) {
          appendNum = allLen - showLen;
        }
        for (let i = showLen; i < showLen + appendNum; i++) {
          _this.list.push(_this.companyList[i]["name"]);
        }
        // 加载状态结束
        _this.loading = false;
        // 判断数据是否加载完成
        if (_this.list.length > 0 && _this.list.length === allLen) {
          _this.finished = true; // 数据加载完成
        }
      }, 500);
    },
    enterDetail(companyName) {
      this.$router.push(`enterprise/${companyName}`);
    }
  },
  mounted() {
    // mounted + watch实现图片预加载
    let _this = this;
    let imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach(item => {
      let img = new Image();
      img.onload = () => {
        this.count++;
      };
      img.src = item.getAttribute("src");
    });
  },
  watch: {
    count(val, oldval) {
      if (val == 1) {
        this.show = true;
      }
    }
  }
};
</script>

<style scoped>
.header-title {
  text-align: center;
  padding: 20px 0 10px;
}
.header-title-tips {
  margin-top: -5px;
  color: #969799;
  font-size: 14px;
  line-height: 20px;
}
.search-res-container {
  margin-top: 10px;
}
.no-res-tips {
  text-align: center;
  color: #969799;
  font-size: 16px;
  line-height: 40px;
}
</style>
