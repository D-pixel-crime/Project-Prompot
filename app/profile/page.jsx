"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileView from "@components/ProfileView";
import axios from "axios";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = session?.user.id;
      const { data } = await axios.get(`/api/users/${currentUser}/posts`);

      setUserData(data);
    };
    if (session?.user.id) {
      fetchUserData();
      console.log(userData);
    } else {
      router.push("/");
    }
  }, []);

  const handleEdit = async (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {};

  return (
    <ProfileView
      name="My"
      desc="Take a look at your customized profile page"
      data={userData}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default ProfilePage;
