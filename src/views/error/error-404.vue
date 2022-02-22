<!--
 * @Description: 404
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-22 17:41:48
-->
<template>
  <div class="wrapper">
    <div class="container">
      <h1>404</h1>
      <p>
        <strong>There isn't a Pages site here.</strong>
      </p>

      <p>
        If you're trying to publish one,
        <a href="https://github.com/asasugar/vite-element-plus-admin"
          >read the full documentation</a
        >
        to learn how to run
        <strong>vite-element-plus-admin</strong>
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: @bg-color-hover;
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  .container {
    padding-top: 50px;
    margin: 0 auto;
    width: 600px;
    text-align: center;
    h1 {
      width: 800px;
      position: relative;
      left: -100px;
      letter-spacing: -1px;
      line-height: 60px;
      font-size: 60px;
      font-weight: 100;
      margin: 0px 0 50px 0;
      text-shadow: 0 1px 0 @bg-color;
    }
    p {
      color: @bg-color-mask;
      margin: 20px 0;
      line-height: @line-height-base;
      a {
        color: #4183c4;
        text-decoration: none;
      }
    }
  }
}
</style>
