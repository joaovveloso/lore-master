// 1. Na interface GameContextType, adicione:
interface GameContextType {
  // ... (mantenha todo o resto que já existe)
  runLocalAnalysis: (gameTitle: string, description: string) => void;
  addCredits: (amount: number) => void; // <--- ADICIONE ESTA LINHA
}

// 2. Dentro de GameProvider, adicione esta função logo após deductCredits:
  const addCredits = useCallback((amount: number) => {
    setCredits((prev) => ({
      ...prev,
      availableCredits: prev.availableCredits + amount,
    }));
  }, []);

// 3. No return do <GameContext.Provider value={{ ... }>, inclua addCredits:
  return (
    <GameContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        credits,
        deductCredits,
        hasEnoughCredits,
        analysis,
        setAnalysis,
        isLoading,
        setIsLoading,
        error,
        setError,
        runLocalAnalysis,
        addCredits, // <--- ADICIONE ESTA LINHA
      }}
    >
      {children}
    </GameContext.Provider>
  );
