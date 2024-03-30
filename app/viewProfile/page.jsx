"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileView from "@components/ProfileView";
import axios from "axios";

const ViewProfile = () => {
  const profileId = useSearchParams().get("id");
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [viewedUser, setViewedUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${profileId}/posts`);

        setUserData(data);
        setViewedUser(data[0].creator);
      } catch (error) {
        return console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ProfileView
      name={viewedUser.username}
      desc={`It is a good practice to learn from others. Explore ${viewedUser.username}'s posts and open the door to your creativity.`}
      data={userData}
    />
  );
};
export default ViewProfile;
