
// Service qui gère les appels à votre API
export const callApi = async (prompt: string) => {
  try {
    const response = await fetch('/api/call-external-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'appel API:', error);
    throw error;
  }
};
