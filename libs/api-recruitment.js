import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DANS_API_URL,
});

export const getJobList = async (
  page = 1,
  description,
  location,
  full_time
) => {
  try {
    const responses = await http.get(`/recruitment/positions.json`, {
      params: {
        page,
        description,
        location,
        full_time,
      },
    });
    return responses.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getJobById = async (id_job) => {
  try {
    const responses = await http.get(`/recruitment/positions/${id_job}`);
    return responses.data;
  } catch (error) {
    return error.response.data;
  }
};
