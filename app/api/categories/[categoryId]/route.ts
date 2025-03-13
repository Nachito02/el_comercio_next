import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, {params} : {params: {categoryId: string}}) {
   try {
        const category = await Category.findByIdAndDelete(params.categoryId);
        return NextResponse.json({category})
   } catch (error) {
       return NextResponse.json({message: "Error al eliminar el producto", error}, {status: 500})
   }

}