export const fetchTopMovies = async (): Promise<any[]> => {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_RAPIDAPI_HOST}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return [];
    }
  };
  