const baseUrl = "http://localhost:3001/anecdotes";

// Function to get all anecdotes from the server
const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json(); // Parse JSON response
};

// Function to create a new anecdote
const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };

  // Send POST request to create a new anecdote
  const response = await fetch(baseUrl, options);

  // Check if the response is ok
  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json(); // Parse JSON response
};

export default { getAll, createNew };
