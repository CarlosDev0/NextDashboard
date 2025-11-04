/**
 * Sends a minimal request to the Python endpoint to trigger a cold start and LLM download.
 * Does not expect a meaningful response.
 */
export const aiAgentWakeUpService = async (): Promise<void> => {
    const controller = new AbortController();
    // Increase timeout for cold start if necessary, e.g., 5 minutes (300000ms)
    const timeout = setTimeout(() => controller.abort(), 400000); 

    // Use a minimal query that your backend can quickly process or ignore
    const WAKEUP_QUERY = "ping"; 
    
    try {
        await fetch("https://aiagentrag-795079798700.us-central1.run.app/generation",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query: WAKEUP_QUERY}),
                signal: controller.signal,
            });

        // We intentionally ignore the response and any errors here 
        // to avoid blocking the main app, but the network request still fires.

    } catch (error) {
        // Log the error for monitoring, but DO NOT re-throw, 
        // as the app should still function, just slower.
        console.warn("AIAgent Wake-up call failed or timed out. Service will start cold.");
    } finally {
        clearTimeout(timeout);
    }
};
