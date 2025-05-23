// Utility functions for SDI application
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function grupos4e5(n: number): number[] {
  /**Divide n alunos em grupos de 4–5 alunos, permitindo grupos de 3 em casos extremos.*/
  if (n <= 5) {
    return [n];
  }
  
  // Casos especiais para números que resultariam em grupos de 3
  if (n === 7) {
    return [4, 3]; // Um grupo de 4 e um grupo de 3
  }
  if (n === 11) {
    return [4, 4, 3]; // Dois grupos de 4 e um grupo de 3
  }
  if (n === 13) {
    return [5, 4, 4]; // Um grupo de 5 e dois grupos de 4
  }
  
  for (let g = Math.ceil(n / 5); g <= Math.ceil(n / 4); g++) {
    const base = Math.floor(n / g);
    const resto = n % g;
    
    // Verificamos se o tamanho base está entre 3 e 5, permitindo grupos de 3 em casos raros
    if (3 <= base && base <= 5 && base + 1 <= 5) {
      const sizes = [];
      for (let i = 0; i < resto; i++) {
        sizes.push(base + 1);
      }
      for (let i = 0; i < g - resto; i++) {
        sizes.push(base);
      }
      return sizes;
    }
  }
  
  throw new Error("Número impossível para grupos de 3-5.");
}

export function formarGruposEClusters(n: number) {
  /**Retorna {sizes, grupos, clusters} equilibrados.*/
  const sizes = grupos4e5(n);
  
  // Shuffle sizes for variation
  for (let i = sizes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sizes[i], sizes[j]] = [sizes[j], sizes[i]];
  }
  
  // Create shuffled student list
  const alunos = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = alunos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [alunos[i], alunos[j]] = [alunos[j], alunos[i]];
  }
  
  // Form groups
  const grupos = [];
  let currentIndex = 0;
  
  for (const size of sizes) {
    grupos.push(alunos.slice(currentIndex, currentIndex + size));
    currentIndex += size;
  }
  
  // Form clusters (only if > 5 groups)
  let clusters;
  if (grupos.length <= 5) {
    clusters = [Array.from({ length: grupos.length }, (_, i) => i)];
  } else {
    const numClusters = Math.ceil(grupos.length / 5);
    const baseSize = Math.floor(grupos.length / numClusters);
    const remainder = grupos.length % numClusters;
    
    clusters = [];
    let groupIndex = 0;
    
    for (let k = 0; k < numClusters; k++) {
      const clusterSize = baseSize + (k < remainder ? 1 : 0);
      const cluster = [];
      
      for (let j = 0; j < clusterSize; j++) {
        cluster.push(groupIndex);
        groupIndex++;
      }
      
      clusters.push(cluster);
    }
  }
  
  return { sizes, grupos, clusters };
}

export function cronocolor(rest: number, total: number): string {
  const fraction = total > 0 ? rest / total : 0;
  
  if (fraction > 0.66) {
    return "#28a745"; // Green
  } else if (fraction > 0.33) {
    return "#ffc107"; // Yellow
  } else {
    return "#dc3545"; // Red
  }
}

export const gerarPdfFichas = (prof: string, disc: string, pergunta: string, n: number) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const fichaHeight = (pageHeight - 30) / 2; // 2 fichas por página, com margens
  const fichaWidth = pageWidth - 30;
  const marginX = 15;
  const marginY = 10;

  for (let i = 0; i < n; i++) {
    if (i % 2 === 0 && i !== 0) doc.addPage();

    // Calcula a posição vertical da ficha (topo ou metade da página)
    const fichaY = marginY + (i % 2) * fichaHeight;

    // Delimita a ficha com uma borda arredondada
    doc.setDrawColor(60, 60, 60);
    doc.setLineWidth(0.5);
    doc.roundedRect(marginX, fichaY, fichaWidth, fichaHeight - marginY, 4, 4);

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Prof.: ${prof}`, marginX + 4, fichaY + 10);
    doc.text(`Disc.: ${disc}`, pageWidth - marginX - 4 - doc.getTextWidth(`Disc.: ${disc}`), fichaY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Pergunta:`, marginX + 4, fichaY + 18);
    doc.setFont("helvetica", "italic");
    const perguntaLines = doc.splitTextToSize(pergunta, fichaWidth - 8);
    doc.text(perguntaLines, marginX + 22, fichaY + 18);

    // Nome do aluno/número
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Aluno ${i + 1}`, marginX + 4, fichaY + 28);

    // Linhas para resposta
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    let lineY = fichaY + 35;
    for (let j = 0; j < 13; j++) {
      doc.line(marginX + 4, lineY, pageWidth - marginX - 4, lineY);
      lineY += 8;
    }
  }

  doc.save(`Fichas-SDI-${disc}.pdf`);
};

// Create final report PDF
export function gerarRelatorioFinal(sdiState: any) {
  try {
    const pdf = new jsPDF();
    
    // Set document properties
    pdf.setProperties({
      title: `Relatório SDI - ${sdiState.disc}`,
      subject: sdiState.q,
      author: sdiState.prof,
      creator: 'Aplicação SDI'
    });
    
    // Add title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text(`RELATÓRIO SDI - ${sdiState.disc}`, 105, 15, { align: 'center' });
    
    // Add date
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 25);
    
    // Add session information
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Informações da Sessão', 20, 35);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Professor(a): ${sdiState.prof || "Não informado"}`, 25, 43);
    pdf.text(`Disciplina: ${sdiState.disc || "Não informada"}`, 25, 50);
    pdf.text(`Participantes: ${sdiState.n}`, 25, 57);
    pdf.text(`Grupos formados: ${sdiState.grupos.length}`, 25, 64);
    pdf.text(`Clusters: ${sdiState.clusters.length}`, 25, 71);
    
    // Add time information
    pdf.setFont('helvetica', 'bold');
    pdf.text('Tempo da Atividade', 20, 85);
    pdf.setFont('helvetica', 'normal');
    
    // Calculate planned time
    const totalPlanejado = sdiState.dur.reduce((acc: number, curr: number) => acc + curr, 0) / 60;
    pdf.text(`Tempo planejado: ${totalPlanejado} minutos`, 25, 93);
    
    // Add question and synthesis
    pdf.setFont('helvetica', 'bold');
    pdf.text('Pergunta Orientadora', 20, 105);
    pdf.setFont('helvetica', 'italic');
    
    const splitQuestion = pdf.splitTextToSize(sdiState.q, 170);
    pdf.text(splitQuestion, 25, 113);
    
    pdf.setFont('helvetica', 'bold');
    pdf.text('Síntese Final', 20, 133);
    pdf.setFont('helvetica', 'normal');
    
    if (sdiState.sintese) {
      const splitSynthesis = pdf.splitTextToSize(sdiState.sintese, 170);
      pdf.text(splitSynthesis, 25, 141);
    } else {
      pdf.text('Nenhuma síntese registrada.', 25, 141);
    }
    
    // Phases completed
    pdf.setFont('helvetica', 'bold');
    pdf.text('Fases Completadas', 20, 175);
    pdf.setFont('helvetica', 'normal');
    
    const phases = [
      "Planejamento",
      "Trabalho Individual", 
      "Organização dos Grupos",
      "Síntese em Grupo",
      "Reunião de Líderes",
      "Síntese dos Líderes",
      "Síntese Final",
      "Aprofundamento Teórico"
    ];
    
    // Criar tabela manualmente em vez de usar autoTable
    const startY = 180;
    const rowHeight = 10;
    const colWidth = [120, 60];
    
    // Cabeçalho da tabela
    pdf.setFillColor(41, 128, 185);
    pdf.setTextColor(255);
    pdf.setFont('helvetica', 'bold');
    pdf.rect(20, startY, colWidth[0], rowHeight, 'F');
    pdf.rect(20 + colWidth[0], startY, colWidth[1], rowHeight, 'F');
    pdf.text('Fase', 25, startY + 7);
    pdf.text('Status', 25 + colWidth[0], startY + 7);
    
    // Linhas da tabela
    pdf.setTextColor(0);
    pdf.setFont('helvetica', 'normal');
    
    for (let i = 0; i < phases.length; i++) {
      const y = startY + (i + 1) * rowHeight;
      
      // Alternar cores de fundo para efeito listrado
      if (i % 2 === 0) {
        pdf.setFillColor(240, 240, 240);
        pdf.rect(20, y, colWidth[0], rowHeight, 'F');
        pdf.rect(20 + colWidth[0], y, colWidth[1], rowHeight, 'F');
      }
      
      // Bordas
      pdf.setDrawColor(200);
      pdf.rect(20, y, colWidth[0], rowHeight);
      pdf.rect(20 + colWidth[0], y, colWidth[1], rowHeight);
      
      // Texto
      pdf.text(phases[i], 25, y + 7);
      pdf.text(
        i < sdiState.fase ? '✓ Completada' : 'Pendente', 
        25 + colWidth[0], 
        y + 7
      );
    }
    
    // Save and download the PDF file
    pdf.save('relatorio_SDI.pdf');
    
    return true;
  } catch (error) {
    console.error("Error generating PDF report:", error);
    throw error;
  }
}
