import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { id } = await req.json();

  try {
    // Process a GET request
    const brand = await prismadb.nc_1o1g___brand_master_dev.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        saved: true,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
