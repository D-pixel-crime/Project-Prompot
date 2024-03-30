import { Prompts } from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { searchText } = await req.json();

  try {
    await connectToDB();

    const data1 = await Prompts.find({
      $or: [
        { prompt: { $regex: searchText, $options: "i" } },
        { tag: { $regex: searchText, $options: "i" } },
      ],
    }).populate("creator");

    return new Response(JSON.stringify(data1), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
