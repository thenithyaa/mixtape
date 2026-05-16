import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("mixtapes")
      .insert([
        {
          creator: body.creator,
          receiver: body.receiver,
          songs: body.songs,
          note: body.note,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}