import type { Ref } from 'vue';
import type { MarkDownActionType } from '@/components/markdown';

export function useMarkdown(markDownRef: Ref<Nullable<MarkDownActionType>>) {
  const markdownCache =
    window.localStorage.getItem('markdown') ??
    `
# title
# content
`;
  const mdValueRef = ref(markdownCache);
  const md2htmlText = ref<string>('');

  const onChange = (v: string) => {
    mdValueRef.value = v;
  };
  const onMd2html = async (mdtext: string) => {
    const instance = unref(markDownRef);
    if (!instance) return;
    md2htmlText.value = await instance?.md2html(mdtext);
  };

  return { mdValueRef, md2htmlText, onChange, onMd2html };
}
