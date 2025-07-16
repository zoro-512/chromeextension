export default async function GetSOln(problemDescription){
 const GEMINI_API_KEY = 'AIzaSyC0LHFtqUZMpkxD1kvdr1M9U3QgY-oKcqU';
  const model = "gemini-2.0-flash"; // or gemini-pro

  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing.");
    return "API key is not configured.";
  }

  if (!problemDescription || problemDescription.length < 10) {
    return "Not a valid problem description.";
  }

  const systemPrompt = `
You are an expert coding assistant helping a user solve LeetCode problems. 
You receive the full problem description and must  give the full code  with a high-level plan or data structure recommendation.
`;
 const userPrompt = `Problem description: ${problemDescription}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini API failed.");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply?.trim() || "No hint was generated.";
  } catch (error) {
    console.error("Gemini error:", error);
    return "❌ Could not generate a hint.";
  }
}
