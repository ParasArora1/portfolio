
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../lib/db";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const link = await prisma.link.findUnique({ where: { slug: params.slug } });
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.link.update({ where: { slug: params.slug }, data: { clicks: { increment: 1 } } });
  return NextResponse.redirect(link.url);
}
