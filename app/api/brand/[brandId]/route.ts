import dbConnect from "@/lib/dbConnect";
import Brand from "@/models/Brand";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, props) {
    const params = await props.params;

    try {
        await dbConnect();
        const brand = await Brand.findByIdAndDelete(params.brandId);
        return NextResponse.json({ brand })
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar el marca", error }, { status: 500 })
    }
}