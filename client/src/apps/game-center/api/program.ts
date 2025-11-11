const BASE_URL = import.meta.env.VITE_LL_ENDPOINT;

const CLIENT_ID = import.meta.env.VITE_LL_CLIENT_ID;

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProgramByAppType = async ({
  apptype,
  since,
  until,
  status,
  ordering,
  title,
}: {
  apptype?: string;
  since?: string;
  until?: string;
  status?: string;
  ordering?: string;
  title?: string;
}) => {
  const queryParams = [
    `client_id=${CLIENT_ID}`,
    apptype ? `attributes=app_type:${apptype}` : "",
  ];

  if (status) queryParams.push(`status=${status}`);
  if (since) queryParams.push(`since=${since}`);
  if (until) queryParams.push(`until=${until}`);
  if (ordering) queryParams.push(`ordering=${ordering}`);
  if (title) queryParams.push(`title=${title}`);

  const url = `${BASE_URL}programs/?${queryParams.join("&")}`;

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const fetchWidgetOrdering = async (program_id: string) => {
  const url = `https://cf-blast.livelikecdn.com/api/v1/programs/${program_id}/widgets/?ordering=recent&status=published&page=1`;

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const fetchMembershipCounts = (chatRoomIds: string[]) => {
  let url = `${BASE_URL}chatroom-membership-counts/`;
  if (chatRoomIds && chatRoomIds.length) {
    url += `?chat_room_id=${chatRoomIds[0]}`;
    for (let i = 1; i < chatRoomIds.length; i++) {
      url += `&chat_room_id=${chatRoomIds[i]}`;
    }
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  return fetch(url, options).then((response) => response.json());
};

export const updateProgram = async (bodyParams: {
  programId: string;
  attributes: { key: string; value: string }[];
}) => {
  const url = `${SERVER_URL}program`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParams),
  });
  if (!response.ok) {
    throw new Error(`Failed to update Program: ${response.statusText}`);
  }
  return response.json();
};
