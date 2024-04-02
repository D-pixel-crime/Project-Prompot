import { Prompts } from "@models/prompt";
import { User } from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { searchText } = await req.json();

  try {
    await connectToDB();

    const users = await User.find({ username: { $regex: searchText } });

    let finalData = [];

    for (let i of users) {
      let temp = await Prompts.find({ creator: i._id }).populate("creator");
      finalData = finalData.concat(temp);
    }

    return new Response(JSON.stringify(finalData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
