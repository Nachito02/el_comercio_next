import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import Brand from "@/models/Brand";
dbConnect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // <-- Obtén el cuerpo de la solicitud
        const { name, } = body;

        if (!name) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const product = await Brand.create({ name });

        return NextResponse.json({ message: "Producto creado con éxito", product }, { status: 201 });
    } catch (error) {
        console.error("Error al crear producto:", error);
        return NextResponse.json({ message: "Error al crear el producto", error }, { status: 500 });
    }
}


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const brands = await Brand.find()
        return NextResponse.json({ brands })
    } catch (error) {

    }
}

