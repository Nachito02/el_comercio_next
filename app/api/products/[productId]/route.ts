import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';


export async function DELETE(req: NextRequest, props) {
    const params = await props.params;
    await dbConnect();
    try {
        const product = await Product.findByIdAndDelete(params.productId);
        return NextResponse.json({ product })
    } catch (error) {
        return new NextResponse('Error al eliminar el producto', { status: 500 })

    }
}


export async function GET(req: NextRequest, props) {
    const params = await props.params;
    await dbConnect();

    try {
        const product = await Product.findById(params.productId);
        return NextResponse.json({ product })
    } catch (error) {
        return new NextResponse('Error al obtener el producto', { status: 500 })


    }
}


export async function PATCH(req: NextRequest, props) {
    const params = await props.params;
    await dbConnect();

    try {

        

    } catch (error) {
        console.log(error)
        return new NextResponse('Error al actualizar el producto', { status: 500 })
    }

}