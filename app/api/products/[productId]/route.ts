import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'; 


export async function DELETE(req: NextRequest, {params}) {
    await dbConnect();
   try {
        const product = await Product.findByIdAndDelete(params.productId);
        return NextResponse.json({product})
   } catch (error) {
       return NextResponse.json({message: "Error al eliminar el producto", error}, {status: 500})
   }

}


export async function GET(req: NextRequest, {params} ){  
    await dbConnect();

    try {
        const product = await Product.findById(params.productId);
        return NextResponse.json({product})
    } catch (error){
       return NextResponse.json({message: "Error al obtener el producto", error}, {status: 500})

    }
    
}
