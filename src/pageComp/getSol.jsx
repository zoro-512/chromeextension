export default async function GetSOln(problemDescription) {
  const GEMINI_API_KEY = 'AIzaSyC0LHFtqUZMpkxD1kvdr1M9U3QgY-oKcqU';
  const model = "gemini-2.0-flash";

  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing.");
    return "API key is not configured.";
  }

  if (!problemDescription || problemDescription.length < 10) {
    return "Not a valid problem description.";
  }

  const systemPrompt = `
You are an expert competitive programmer.
Only return the full working code that solves the given LeetCode problem.
Do not include any explanation, comments, or descriptions — just return the complete code wrapped in triple backticks.
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
    return reply?.trim() || "No solution was generated.";
  } catch (error) {
    console.error("Gemini error:", error);
    return "❌ Could not generate a solution.";
  }
}
