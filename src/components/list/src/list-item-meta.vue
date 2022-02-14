<!--
 * @Description: List.Item.Meta
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-14 22:49:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-15 00:24:43
-->
<template>
  <div></div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
@list-prefix-cls: ~'as-list';
.@{list-prefix-cls} {
  position: relative;

  * {
    outline: none;
  }

  &-items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: @list-item-padding;
    color: @text-color;

    &-meta {
      display: flex;
      flex: 1;
      align-items: flex-start;
      max-width: 100%;

      &-avatar {
        margin-right: @list-item-meta-avatar-margin-right;
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
            color: @primary-color;
          }
        }
      }
      &-description {
        color: @text-color-secondary;
        font-size: @list-item-meta-description-font-size;
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
        padding: 0 @padding-xs;
        color: @text-color-secondary;
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

  &-header {
    background: @list-header-background;
  }

  &-footer {
    background: @list-footer-background;
  }

  &-header,
  &-footer {
    padding-top: @padding-sm;
    padding-bottom: @padding-sm;
  }

  &-empty {
    padding: @padding-md 0;
    color: @text-color-secondary;
    font-size: 12px;
    text-align: center;
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

  &-split&-something-after-last-item .@{ant-prefix}-spin-container > &-items > &-item:last-child {
    border-bottom: 1px solid @border-color-split;
  }

  &-lg &-item {
    padding: @list-item-padding-lg;
  }

  &-sm &-item {
    padding: @list-item-padding-sm;
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
      margin-bottom: @list-item-meta-margin-bottom;

      &-title {
        margin-bottom: @list-item-meta-title-margin-bottom;
        color: @heading-color;
        font-size: @font-size-lg;
        line-height: 24px;
      }
    }

    &-action {
      margin-top: @padding-md;
      margin-left: auto;

      > li {
        padding: 0 @padding-md;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }

  &-grid .@{ant-prefix}-col > &-item {
    display: block;
    max-width: 100%;
    margin-bottom: @margin-md;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: none;
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
