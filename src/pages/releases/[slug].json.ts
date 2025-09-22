import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Server Output（SSR）を有効化
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  // URLパラメータからslugを取得
  const { slug } = params;

  // 現在時刻を取得（未公開リリースのチェック用）
  const now = new Date();

  try {
    // Content Collectionsからリリースノートを取得
    const allReleases = await getCollection("releases");

    // 指定されたslugのリリースを見つける
    const release = allReleases.find((r) => r.id === slug);

    // リリースが見つからない場合
    if (!release) {
      const notFoundResponse = {
        error: "Release not found",
        message: `No release found with ID: ${slug}`,
        generated: new Date().toISOString(),
      };

      return new Response(JSON.stringify(notFoundResponse, null, 2), {
        status: 404,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 未公開リリース（未来の日付）の場合
    if (release.data.date > now) {
      const unpublishedResponse = {
        error: "Release not yet published",
        message: `This release will be available on ${release.data.date.toISOString()}`,
        generated: new Date().toISOString(),
      };

      return new Response(JSON.stringify(unpublishedResponse, null, 2), {
        status: 404,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Markdownコンテンツを取得
    const markdownContent = release.body || "";

    // レスポンス用のデータを整形
    const releaseData = {
      id: release.id,
      title: release.data.title,
      version: release.data.version,
      date: release.data.date.toISOString(),
      category: release.data.category,
      breaking: release.data.breaking || false,
      features: release.data.features || [],
      fixes: release.data.fixes || [],
      deprecated: release.data.deprecated || [],
      content: markdownContent,
      pageUrl: `/releases/${release.id}`,
      generated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(releaseData, null, 2), {
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
      error: "Failed to fetch release",
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
