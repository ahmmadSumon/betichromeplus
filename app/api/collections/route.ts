import { NextResponse } from "next/server";
import {connectDB} from "../../../lib/mongodb";
import Collection from "@/models/Collection";

export async function GET() {
  await connectDB();
  const collections = await Collection.find().sort({ createdAt: -1 });
  return NextResponse.json(collections);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const collection = await Collection.create(body);
  return NextResponse.json(collection);
}
