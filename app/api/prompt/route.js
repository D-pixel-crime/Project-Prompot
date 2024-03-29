import { Prompts } from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();

    const res = await Prompts.find({}).populate("creator");

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
