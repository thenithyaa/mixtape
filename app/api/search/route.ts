import { NextResponse } from "next/server";
import yts from "yt-search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const result = await yts(query);

  const songs = result.videos.slice(0, 10).map((video: any) => ({
    title: video.title,
    artist: video.author.name,
    url: `https://www.youtube.com/watch?v=${video.videoId}`,
    thumbnail: video.thumbnail,
  }));

  return NextResponse.json(songs);
}