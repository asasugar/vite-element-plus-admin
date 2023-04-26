<!--
 * @Description: List.Item
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-14 22:49:18
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 10:50:49
-->
<template>
  <div v-bind="{ ...restAttrs }" :class="[`${pre}-item`, className]">
    <div key="content" :class="`${pre}-item-main`">
      <slot name="default" />
      <template v-if="getShowExtra">
        <ul key="actions" :class="`${pre}-item-action`">
          <template v-if="actions?.length">
            <li v-for="(action, i) in actions" :key="`${pre}-item-action-${i}`">
              {{ action }}
              <el-divider v-if="i !== actions.length - 1" direction="vertical"></el-divider>
            </li>
          </template>

          <slot v-else name="actions" />
        </ul>
      </template>
    </div>
    <div v-if="extras?.length" key="extra" class="{`${pre}-item-extras`}">
      <span v-for="(extra, i) in extras" :key="`${pre}-item-extea-${i}`">{{ extra }}</span>
    </div>
    <slot v-else name="extras" />
  </div>
</template>
<script lang="ts" setup>
interface Props {
  // 额外内容, 通常用在展示右侧内容
  extras?: string[];
  // 列表操作组，位置在卡片底部或者最右侧
  actions?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  extras: () => [],
  actions: () => []
});
const slots = useSlots();
const attrs = useAttrs();

const prefixCls: string | undefined = inject('prefixCls');
const pre = ref<string | undefined>(prefixCls);
const { class: className, ...restAttrs } = attrs;
const getShowExtra = computed(() => props.extras?.length || slots.extras);
</script>

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
        font-size: @font-size-base;
        line-height: @line-height-base;
      }
    }
    &-action {
      flex: 0 0 auto;
      margin-left: 48px;
      padding: 0;
      font-size: 14px;

      & > :deep(*) {
        position: relative;
        display: inline-block;
        font-size: @font-size-base;
        line-height: @line-height-base;
        text-align: center;
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

  &-vertical &-item {
    align-items: initial;

    &-main {
      display: block;
      flex: 1;
      font-size: @font-size-base;
      line-height: 22px;
    }

    &-extras {
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
