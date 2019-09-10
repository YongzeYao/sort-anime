<template>
  <el-container id="app">
    <el-header>
      <Toolbar />
    </el-header>
    <el-main>
      <Body />
    </el-main>
  </el-container>
</template>

<script>
import Toolbar from './components/Toolbar/Toolbar';
import Body from './components/Body/Body';

export default {
  name: 'app',
  components: {
    Toolbar,
    Body,
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
