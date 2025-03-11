import { NextRequest, NextResponse } from "next/server";
import Product from '@/models/Product';
import dbConnect from '@/lib/dbConnect';

dbConnect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // <-- Obtén el cuerpo de la solicitud
        const { name, description, price, stock, category, brand , images} = body;

   
        if (!name || !price || !stock || !category || !brand || !images) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const product = await Product.create({ name, description, price, stock, category, brand });

        return NextResponse.json({ message: "Producto creado con éxito", product }, { status: 201 });
    } catch (error) {
        console.error("Error al crear producto:", error);
        return NextResponse.json({ message: "Error al crear el producto", error }, { status: 500 });
    }
}


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const products = await Product.find()
  
        return NextResponse.json({ products })
    } catch (error) {
        return NextResponse.json({ message: "Error al crear el producto", error }, { status: 500 });
    }
}