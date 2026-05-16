import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) return NextResponse.json([]);

    const API_KEY = process.env.YOUTUBE_API_KEY;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
      query
    )}&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    const songs = data.items.map((item: any) => ({
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails?.high?.url,
    }));

    return NextResponse.json(songs);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}