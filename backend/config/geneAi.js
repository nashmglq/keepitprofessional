const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_AI);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const aiPromt = async (req, res) => {
  const { data } = req.body;
  console.log(data);

  try {
    if (!data) return res.status(500).json({ error: "Something went wrong." });

    const wrapping = `Rewrite the following text in a professional and formally 
    structured manner. Maintain the original format without adding greetings, 
    sign-offs, subjects, or extra elements. Do not use quotation marks. 
    Keep the structure identical, only refining word choice and phrasing: ${data}`;


    const result = await model.generateContent(wrapping);

    return res.status(200).json({ success: result.response.text() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { aiPromt };
