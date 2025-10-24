 const AIAgentService = async(input:string): Promise<string> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300000);
    try {
        const response =await fetch("https://aiagentrag-795079798700.us-central1.run.app/generation",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', // Specify JSON content type
                    },
                    body: JSON.stringify({query: input}),
                    signal: controller.signal,
                });

                clearTimeout(timeout);
                
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                if (!data.answer) {
                    throw new Error('No result found in API response');
                }
                return data.answer as string;
        } catch (error) {
            clearTimeout(timeout);
            throw error instanceof Error ? error : new Error('An unexpected error occurred');
        }
                
};

export default AIAgentService;