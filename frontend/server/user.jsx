export const getPromt = async() =>{
    const res = await fetch("http://localhost:5000/")
    return res.json()
}

export const postPrompt = async (inputText) => {
    const res = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: inputText }),
    });
  
    if (!res.ok) {
      throw new Error("Failed to generate professional text");
    }
  
    const response = await res.json();
    return response.success; 
  };
  