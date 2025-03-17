import Brand from "@/models/Brand";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { brandId: string } }) {

    try {
        const brand = await Brand.findByIdAndDelete(params.brandId);
        return NextResponse.json({ brand })
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar el marca", error }, { status: 500 })
    }

}