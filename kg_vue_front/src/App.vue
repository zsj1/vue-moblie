<template>
  <div id="app">
    <keep-alive :include="['Home']">
      <router-view></router-view>
    </keep-alive>
    <Tabbar v-if="$route.meta.showTab"></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
  name: "app",
  components: {
    Tabbar
  }
};
window.onload = function() {
  document.addEventListener("touchstart", function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function(event) {
    event.preventDefault();
  });
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
