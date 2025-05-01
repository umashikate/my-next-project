import { getNewsList } from "@/app/_libs/microcms";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import NewsList from "@/app/_components/NewsList";
import SearchField from "@/app/_components/SearchField";

type Props = {
  // Next.js 15+: searchParams は Promise 型になっているので Promise<…> にする
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  // ① searchParams を await して展開
  const { q } = await searchParams;

  // ② q を渡してニュース一覧を取得
  const { contents: news } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    q,
  });

  return (
    <>
      <SearchField />
      <NewsList news={news} />
    </>
  );
}
