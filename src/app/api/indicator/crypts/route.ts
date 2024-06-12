import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const symbols = req.nextUrl.searchParams.get('symbols') || 'BTC,ETH,DOGE,USDT,BNB,USDC';
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
    params: {
      symbol: symbols,
    },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_INDICATOR_API
    }
  });

  return NextResponse.json({ data: response.data })
}