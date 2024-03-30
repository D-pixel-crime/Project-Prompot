import { Prompts } from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const res = await Prompts.findById(params.promptId).populate("creator");

    if (!res) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const res = await Prompts.findByIdAndUpdate(params.promptId, {
      prompt: prompt,
      tag: tag,
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const res = await Prompts.findByIdAndDelete(params.promptId);

    return new Response("Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
