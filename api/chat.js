export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Please enter a message."
            });
        }

        // Check that Vercel has the API key
        if (!process.env.OPENAI_API_KEY) {
            console.error("OPENAI_API_KEY is missing");

            return res.status(500).json({
                error: "OpenAI API key is not configured on the server."
            });
        }

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization":
                        `Bearer ${process.env.OPENAI_API_KEY}`
                },

                body: JSON.stringify({
                    model: "gpt-5.6-luna",

                    instructions:
                        "You are the AI learning assistant for a student learning platform. Help students understand Mathematics, Computer Science, C++, programming, accounting, and general academic topics. Explain concepts clearly and step by step. Teach the student instead of simply giving answers.",

                    input: message
                })
            }
        );

        const data = await response.json();

        console.log("OpenAI status:", response.status);

        if (!response.ok) {
            console.error(
                "OpenAI error:",
                JSON.stringify(data, null, 2)
            );

            return res.status(response.status).json({
                error:
                    data.error?.message ||
                    "OpenAI request failed."
            });
        }

        return res.status(200).json({
            reply: data.output_text || "No response was generated."
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            error: "Server error while contacting the AI."
        });
    }
}
