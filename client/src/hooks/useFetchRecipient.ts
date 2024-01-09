import { useEffect, useState } from "react";
import { BASE_API_URL, getRequest } from "../utils/services";

export const useFetchUserRecipient = (userInfo: any, chat: any) => {
  const [recipientUser, setRecipientUser] = useState<any>([]);
  const [error, setError] = useState("");

  const recipientId = chat?.members?.find((id: string) => id !== userInfo?._id);
  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response: any = await getRequest(
        `${BASE_API_URL}/users/find/${recipientId}`
      );
      if (response?.error) {
        console.log("Error while fetching recipient: ",response.error)
        return setError(response.error);
      }
      return setRecipientUser(response?.data.user);
    };
    getUser();
  }, [recipientId]);

  return { recipientUser };
};
