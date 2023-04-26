import { systemService } from '@/services';
import type { ApiGetAnalysisDataRes } from '@/apis/system/typing';

export function useData() {
  const analysis = ref<Nullable<ApiGetAnalysisDataRes>>(null);

  const getAnalysis = async () => {
    analysis.value = await systemService.getAnalysis();
  };
  return {
    analysis,
    getAnalysis
  };
}
