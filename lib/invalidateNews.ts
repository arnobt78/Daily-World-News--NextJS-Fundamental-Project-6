import { queryClient } from "@/lib/queryClient";
import { queryKeys } from "@/lib/queryKeys";

export async function invalidateHeadlines() {
  await queryClient.invalidateQueries({ queryKey: queryKeys.headlines.all });
}

export async function invalidateSearch() {
  await queryClient.invalidateQueries({ queryKey: queryKeys.search.all });
}

export async function invalidateAllNews() {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeys.headlines.all }),
    queryClient.invalidateQueries({ queryKey: queryKeys.search.all }),
  ]);
}
