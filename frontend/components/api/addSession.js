import client from "./client";

export const add = async (session) => {
  try {
    const { data } = await client.post("/addSession", session);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const getSessions = async () => {
  try {
    const { data } = await client.get("/getSessions");
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const edit = async (session, newDate) => {
  try {
    const { data } = await client.put("/editSession", { session, newDate });

    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};
