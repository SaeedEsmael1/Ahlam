const baseUrl = "https://api.ahlamfoods.com/api";

export const fetchData = async (endpoint, customHeaders = {}) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  };
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options);
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data?.error?.message || "Something went wrong";
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
