import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import Category from "@/models/Category";
dbConnect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // <-- Obtén el cuerpo de la solicitud
        const { name } = body;

        if (!name) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
        }
        const category = await Category.create({ name });
        return NextResponse.json({ message: "Categoria creada con éxito", category }, { status: 201 });
    } catch (error) {
        console.error("Error al crear categoria:", error);
        return NextResponse.json({ message: "Error al crear el producto", error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const categories = await Category.find()
        return NextResponse.json({ categories })
    } catch (error) {

    }
}