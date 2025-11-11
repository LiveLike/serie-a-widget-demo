const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const invokeRewardAction = async (
  bodyParams: {
    program_id: string;
    profile_id: string | undefined;
    reward_action_key: string;
    code?: string;
  },
  accessToken: string
) => {
  const url = `${BASE_URL}rewards`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParams),
  });
  if (!response.ok) {
    throw new Error(`Failed to invoke reward action: ${response.statusText}`);
  }
  return response.json();
};
