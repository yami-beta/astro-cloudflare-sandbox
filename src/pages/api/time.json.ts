import type { APIRoute } from "astro";

// APIエンドポイント - 動的にJSONレスポンスを返す
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  // 現在時刻を取得
  const now = new Date();
  const timestamp = now.toISOString();
  const localTime = now.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // リクエストヘッダーから情報を取得
  const userAgent = request.headers.get("user-agent") || "不明";
  const acceptLanguage = request.headers.get("accept-language") || "不明";

  // ランダムな値を生成（動的レスポンスの証明）
  const randomValue = Math.floor(Math.random() * 10000);

  // JSONレスポンスを返す
  const responseData = {
    success: true,
    data: {
      timestamp,
      localTime,
      timezone: "Asia/Tokyo",
      randomValue,
      request: {
        userAgent,
        acceptLanguage,
        method: request.method,
        url: request.url,
      },
    },
    message: "現在時刻とリクエスト情報を取得しました",
    renderType: "On-demand (SSR)",
    description:
      "このAPIエンドポイントはリクエストごとに動的にレスポンスを生成します",
  };

  return new Response(JSON.stringify(responseData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*", // CORS対応
    },
  });
};

// POSTリクエストのハンドリング例
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const receivedAt = new Date().toISOString();

    return new Response(
      JSON.stringify(
        {
          success: true,
          message: "POSTリクエストを受信しました",
          receivedAt,
          receivedData: body,
          echo: true,
        },
        null,
        2,
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify(
        {
          success: false,
          error: "リクエストボディのパースに失敗しました",
          message: error instanceof Error ? error.message : "Unknown error",
        },
        null,
        2,
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
};
