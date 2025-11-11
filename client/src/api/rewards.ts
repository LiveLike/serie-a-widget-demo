const BASE_URL = import.meta.env.VITE_METS_SERVER_ENDPOINT;

const LL_BASE_URL = import.meta.env.VITE_LL_ENDPOINT;
const CLIENT_ID = import.meta.env.VITE_LL_CLIENT_ID;

export const invokeRewardAction = async (
  bodyParams: {
    program_id: string;
    profile_id: string | undefined;
    reward_action_key: string;
    code?: string;
  },
  accessToken: string
) => {
  const url = `${BASE_URL}/rewards`;
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

const fetchPaginatedData = async (url: string, access_token: string) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return await response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const getRewardTransactions = async ({
  access_token,
  reward_item_id,
  nextUrl,
}: {
  access_token: string;
  reward_item_id?: string;
  nextUrl?: string;
}) => {
  const url = nextUrl
    ? nextUrl
    : `${LL_BASE_URL}reward-transactions/?client_id=${CLIENT_ID}&reward_item_id=${reward_item_id}&ordering=-created_at`;
  const result = await fetchPaginatedData(url, access_token);

  return result;
};
