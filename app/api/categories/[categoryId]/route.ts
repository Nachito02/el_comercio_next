import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, props) {
   const params = await props.params;
   try {
        const category = await Category.findByIdAndDelete(params.categoryId);
        return NextResponse.json({category})
   } catch (error) {
       return NextResponse.json({message: "Error al eliminar el producto", error}, {status: 500})
   }
}