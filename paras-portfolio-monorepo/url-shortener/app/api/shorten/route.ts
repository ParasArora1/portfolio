
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { nanoid } from "nanoid";
import { z } from "zod";
import QRCode from "qrcode";

const Body = z.object({ url: z.string().url() });

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = Body.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid URL" }, { status: 400 });

  const slug = nanoid(7);
  await prisma.link.create({ data: { slug, url: parsed.data.url } });
  const qr = await QRCode.toDataURL(`${req.nextUrl.origin}/${slug}`);
  return NextResponse.json({ slug, qr });
}
