import { Prompts } from "@models/prompt";
import { User } from "@models/user";
import { connectToDB } from "@utils/database";
import _ from "underscore";

export const POST = async (req) => {
  const { searchText } = await req.json();

  try {
    await connectToDB();

    const finalData = await Prompts.find({
      $or: [
        { prompt: { $regex: searchText, $options: "i" } },
        { tag: { $regex: searchText, $options: "i" } },
      ],
    }).populate("creator");

    return new Response(JSON.stringify(finalData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
