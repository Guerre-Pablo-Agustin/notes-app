import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

//Get
export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json({
      message: "Obtenido con exito",
      notes: notes,});
  } catch (error) {

    const err = error as Error;

    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

//Post
export async function POST(request: Request) {
  const { title, content } = await request.json();

  if (!title || !content) {
    return NextResponse.json(
      { message: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({
      message: "Creado con exito",
      note: note,
    });
  } catch (error) {

    const err = error as Error;
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}


