<!--
 * @Description: List.Item.Meta
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-14 22:49:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 10:53:04
-->
<template>
  <div :class="classString">
    <div v-if="getShowAvatar" :class="`${classString}-avatar`">
      <template v-if="avatar">{{ avatar }}</template>
      <slot v-else name="avatar" />
    </div>
    <div v-if="getShowTitle || getShowDescription" :class="`${classString}-content`">
      <h4 v-if="getShowTitle" :class="`${classString}-title`">
        <template v-if="title">{{ title }}</template>
        <slot v-else name="title" />
      </h4>
      <div v-if="getShowDescription" :class="`${classString}-description`">
        <template v-if="description">{{ description }}</template>
        <slot v-else name="description" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  avatar?: string;
  title?: string;
  description?: string;
}

const props = defineProps<Props>();

const prefixCls = inject('prefixCls');
const classString = `${prefixCls}-item-meta`;

const slots = useSlots();

const getShowAvatar = computed<boolean>(() => !!(props.avatar || slots.avatar));
const getShowTitle = computed<boolean>(() => !!(props.title || slots.title));
const getShowDescription = computed<boolean>(() => !!(props.description || slots.description));
</script>

<style lang="less" scoped>
@list-prefix-cls: ~'as-list';
.@{list-prefix-cls} {
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    color: @text-color;

    &-meta {
      display: flex;
      flex: 1;
      align-items: flex-start;
      max-width: 100%;

      &-avatar {
        margin-top: 2px;
        margin-right: 10px;
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
        > :deep(a) {
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
  }

  &-vertical &-item {
    &-meta {
      // margin-bottom: 12px;

      &-title {
        margin-bottom: 4px;
        color: @text-color;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}
</style>
