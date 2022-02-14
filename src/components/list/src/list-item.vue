<!--
 * @Description: List.Item
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-14 22:49:18
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-15 00:24:12
-->
<template>
  <div></div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
@list-prefix-cls: ~'as-list';
.@{list-prefix-cls} {
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    color: @text-color;

    &-meta {
      display: flex;
      flex: 1;
      align-items: flex-start;
      max-width: 100%;

      &-avatar {
        margin-right: 16px;
      }
      &-content {
        flex: 1 0;
        width: 0;
        color: @text-color;
      }
      &-title {
        margin-bottom: 4px;
        color: @text-color;
        font-size: @font-size-base;
        line-height: @line-height-base;
        > a {
          color: @text-color;
          transition: all 0.3s;
          &:hover {
            color: @color-primary;
          }
        }
      }
      &-description {
        color: @text-color-desc;
        font-size: 14px;
        line-height: @line-height-base;
      }
    }
    &-action {
      flex: 0 0 auto;
      margin-left: 48px;
      padding: 0;
      font-size: 0;
      list-style: none;

      & > li {
        position: relative;
        display: inline-block;
        padding: 0 10px;
        font-size: @font-size-base;
        line-height: @line-height-base;
        text-align: center;

        &:first-child {
          padding-left: 0;
        }
      }

      &-split {
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 14px;
        margin-top: -7px;
        background-color: @border-color-split;
      }
    }
  }

  &-split &-item {
    border-bottom: 1px solid @border-color-split;
    &:last-child {
      border-bottom: none;
    }
  }

  &-split &-header {
    border-bottom: 1px solid @border-color-split;
  }

  &-split&-empty &-footer {
    border-top: 1px solid @border-color-split;
  }

  &-loading &-spin-nested-loading {
    min-height: 32px;
  }

  &-vertical &-item {
    align-items: initial;

    &-main {
      display: block;
      flex: 1;
    }

    &-extra {
      margin-left: 40px;
    }

    &-meta {
      margin-bottom: 16px;

      &-title {
        margin-bottom: 12px;
        color: @text-color;
        font-size: 16px;
        line-height: 24px;
      }
    }

    &-action {
      margin-top: 16px;
      margin-left: auto;

      > li {
        padding: 0 16px;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }

  // ============================ without flex ============================
  &-item-no-flex {
    display: block;
  }

  // Horizontal
  &:not(.@{list-prefix-cls}-vertical) {
    .@{list-prefix-cls}-item-no-flex {
      .@{list-prefix-cls}-item-action {
        float: right;
      }
    }
  }
}
</style>
