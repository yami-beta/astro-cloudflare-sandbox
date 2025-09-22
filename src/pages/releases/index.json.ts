import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Server Output（SSR）を有効化
export const prerender = false;

export const GET: APIRoute = async () => {
  // 現在時刻を取得（未公開リリースのフィルタリング用）
  const now = new Date();

  try {
    // Content Collectionsからリリースノートを取得
    const allReleases = await getCollection("releases");

    // 未公開リリース（未来の日付）をフィルタリング
    const publishedReleases = allReleases.filter(
      (release) => release.data.date <= now,
    );

    // 日付でソート（新しい順）
    const sortedReleases = publishedReleases.sort(
      (a, b) => b.data.date.getTime() - a.data.date.getTime(),
    );

    // レスポンス用のデータを整形
    const releasesData = sortedReleases.map((release) => ({
      id: release.id,
      title: release.data.title,
      version: release.data.version,
      date: release.data.date.toISOString(),
      category: release.data.category,
      breaking: release.data.breaking || false,
      features: release.data.features || [],
      fixes: release.data.fixes || [],
      deprecated: release.data.deprecated || [],
      url: `/releases/${release.id}`,
    }));

    // JSONレスポンスを作成
    const responseData = {
      releases: releasesData,
      total: releasesData.length,
      generated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(responseData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    // エラーハンドリング
    const errorResponse = {
      error: "Failed to fetch releases",
      message: error instanceof Error ? error.message : "Unknown error",
      generated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(errorResponse, null, 2), {
      status: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
