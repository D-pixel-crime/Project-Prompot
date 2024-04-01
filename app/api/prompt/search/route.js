import { Prompts } from "@models/prompt";
import { User } from "@models/user";
import { connectToDB } from "@utils/database";
import _ from "underscore";

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

    const users = await User.find({ username: { $regex: searchText } });

    let data2 = [];

    for (let i of users) {
      let temp = await Prompts.find({ creator: i._id }).populate("creator");
      data2 = _.union(data2, temp);
    }

    const finalData = _.union(data1, data2);

    return new Response(JSON.stringify(finalData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
