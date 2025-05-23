import { NextResponse } from "next/server";
import { z } from "zod";


const clarifyResearchGoals = async (topic: string) => {
    try {
        const messages = [
            {
                role: "system",
                content: `You are a research assistant that generates clarifying questions. You must:
1. Return ONLY a JSON array of strings
2. Each string should be a question
3. Do not include any other text or explanation
4. Format example: ["Question 1?", "Question 2?", "Question 3?"]`
            },
            {
                role: "user",
                content: `Create 2-4 specific research questions about "${topic}". Consider:
- Technical and practical implications
- Current and future impact
- Specific challenges and opportunities
- Concrete examples and use cases`
            }
        ];

        console.log("Sending request with messages:", JSON.stringify(messages, null, 2));

        // Make the API request
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
                "X-Title": "Deep Research Assistant"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.3-70b-instruct",
                messages: messages,
                temperature: 0.7,
                max_tokens: 500,
                response_format: { type: "json_object" } // Request JSON format explicitly
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("API Error Response:", error);
            throw new Error(`OpenRouter API Error: ${JSON.stringify(error)}`);
        }

        const completion = await response.json();
        console.log("API Response:", JSON.stringify(completion, null, 2));

        if (!completion?.choices?.[0]?.message?.content) {
            throw new Error("No content generated");
        }

        try {
            const content = completion.choices[0].message.content;
            console.log("Raw content:", content);
            
            // Try to parse the response as JSON
            const parsedQuestions = JSON.parse(content);
            console.log("Parsed questions:", parsedQuestions);
            
            // Validate the response matches our schema
            const questionsSchema = z.array(z.string());
            const questions = questionsSchema.parse(parsedQuestions);
            
            if (questions.length === 0) {
                throw new Error("No questions generated");
            }
            
            return questions;
        } catch (parseError) {
            console.error("Failed to parse response:", parseError);
            throw new Error("Invalid response format");
        }
    } catch (error) {
        console.error("Error in clarifyResearchGoals:", error);
        throw error;
    }
}


export async function POST(req: Request) {
    try {
        const { topic } = await req.json();
        
        if (!topic) {
            return NextResponse.json(
                { success: false, error: "Topic is required" },
                { status: 400 }
            );
        }

        console.log("Topic:", topic);
        
        const questions = await clarifyResearchGoals(topic);
        
        if (!questions || !Array.isArray(questions)) {
            return NextResponse.json(
                { success: false, error: "Failed to generate valid questions" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, questions });
    } catch (error) {
        console.error("Error while generating questions:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate questions" },
            { status: 500 }
        );
    }
}