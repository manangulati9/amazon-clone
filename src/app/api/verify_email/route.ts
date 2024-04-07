import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json() as { email: string }
  const mailId = body.email;
  const mailSchema = z.string().email()

  const result = mailSchema.safeParse(mailId)

  if (!result.success) {
    return NextResponse.json({ success: false, message: "Mail id not found" }, { status: 404 })
  }

  try {
    await db.user.update({
      where: {
        email: result.data,
      },
      data: {
        verified: true
      }
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 200 })
  }
}
