<template>
  <div id="app">
    <div>Login 页面</div>
    <div id="nav">
      <a href="/">跳转至 Home 页</a><!-- |
      <router-link to="/about">About</router-link>-->
    </div>
    <!--<router-view/>-->
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
