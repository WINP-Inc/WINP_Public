import yahooFinance from 'yahoo-finance2';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse | null> {
  const symbol = req.nextUrl.searchParams.get('symbol') || '3NGL.L';

  try {
    const quote = await yahooFinance.quote(symbol);

    return NextResponse.json({ data: quote })
  } catch (error) {
    console.log(error);
    return null;
  }
}
