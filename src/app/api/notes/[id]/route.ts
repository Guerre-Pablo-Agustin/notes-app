import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

//get by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

 
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json({mensaje: "Obtenido con exito" ,note: note});
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

//Delete
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = await prisma.note.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({mensaje: "Eliminado con exito" ,note: note});
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}


//put 
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title, content } = await request.json();
  try {
    const note = await prisma.note.update({
      where: {
        id: params.id,
      },
      data: {
        title: title,
        content: content,
      },
    });
    return NextResponse.json({mensaje: "Actualizado con exito" ,note: note});
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}