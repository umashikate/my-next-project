import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  // Next.js 15+: params は Promise<{ current: string }> 型になります
  params: Promise<{
    current: string;
  }>;
};

export default async function Page({ params }: Props) {
  // ① params を await して currentStr を取り出す
  const { current: currentStr } = await params;
  // ② 文字列を数値に変換＆バリデーション
  const current = parseInt(currentStr, 10);
  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  // ③ getNewsList を呼び出し
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  // ④ 記事がなければ 404
  if (news.length === 0) {
    notFound();
  }

  // ⑤ NewsList と Pagination をレンダー
  return (
    <>
      <NewsList news={news} />
      <Pagination totalCount={totalCount} current={current} />
    </>
  );
}
