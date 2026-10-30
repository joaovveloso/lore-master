// src/utils/sanitizer.ts

export interface SanitizerResult {
  isValid: boolean;
  sanitizedText: string;
  error?: string;
}

/**
 * Higieniza e valida blocos de texto livre enviados pelo usuário ou API externa.
 * Rejeita textos nulos, vazios ou com menos de 20 caracteres.
 */
export function sanitizeInputText(rawInput: string | undefined | null): SanitizerResult {
  if (!rawInput) {
    return {
      isValid: false,
      sanitizedText: '',
      error: 'O campo de texto não pode ser vazio ou nulo.',
    };
  }

  // Remove espaços excessivos e quebras de linha desnecessárias
  const sanitizedText = rawInput.trim().replace(/\s+/g, ' ');

  if (sanitizedText.length < 20) {
    return {
      isValid: false,
      sanitizedText,
      error: 'O texto inserido é muito curto. Insira pelo menos 20 caracteres para uma análise preditiva precisa.',
    };
  }

  return {
    isValid: true,
    sanitizedText,
  };
}
