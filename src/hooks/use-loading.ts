export function useLoading() {
  const loading = ref<boolean>(true);

  const showLoading = () => {
    loading.value = true;
  };

  const hideLoading = () => {
    loading.value = false;
  };
  return { loading, showLoading, hideLoading };
}
