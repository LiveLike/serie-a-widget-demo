const params = new URLSearchParams(window.location.search);

export const ACCESS_TOKEN = params.get("accessToken");
export const PROGRAM_ID = params.get("programId");