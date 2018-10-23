<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'node_modules/normalize.css/normalize';
@import 'fonts/font-face';

*,
*:before,
*:after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
:focus {
  outline: none;
}

html {
  box-sizing: border-box;
  height: 100%;
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  html {
    display: flex;
    flex-direction: column;
  }
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin: 0;
  background: #F3F5F6;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: "Open Sans", Arial, sans-serif;
}

#app {
  @include col-max();
}

</style>
