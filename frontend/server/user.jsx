export const postPrompt = async (inputText) => {
    const res = await fetch("https://keepitprofessional.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: inputText }),
    });
  
    if (!res.ok) {
   
      return "Error"
    }
  
    const response = await res.json();
    return response.success; 
  };
  