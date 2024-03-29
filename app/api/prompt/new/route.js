import { Prompts } from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = await Prompts.create({
      creator: userId,
      prompt,
      tag,
    });

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
