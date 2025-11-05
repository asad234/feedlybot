const callApi = async (prompt: string, type: 'chatbot' | 'email'): Promise<string> => {
    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, type }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error(`Error calling internal API for ${type}:`, error);
        if (error instanceof Error) {
            return `Sorry, I encountered an error: ${error.message}`;
        }
        return "Sorry, I'm having trouble connecting right now.";
    }
};


export const generateEmail = async (prompt: string): Promise<string> => {
    return callApi(`Generate a professional marketing email based on the following prompt: "${prompt}"`, 'email');
};

export const askGemini = async (prompt: string): Promise<string> => {
    return callApi(prompt, 'chatbot');
};
