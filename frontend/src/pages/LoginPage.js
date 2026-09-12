const loginUser = async (username, password) => {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(`${username}:${password}`)
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  return await response.json();
};

export default loginUser;