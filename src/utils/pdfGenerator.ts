import { AnalysisResponse } from "@/types";

export function handlePrintReport(analysis: AnalysisResponse | null): boolean {
  if (!analysis) {
    console.warn("Nenhum relatório disponível para exportação.");
    return false;
  }

  try {
    // Dispara a impressão nativa do navegador utilizando o layout otimizado via @media print
    window.print();
    return true;
  } catch (error) {
    console.error("Erro ao tentar exportar/imprimir o relatório:", error);
    return false;
  }
}
