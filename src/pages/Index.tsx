import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SDIState, initialSDIState } from '@/types/sdi';
import PlanejamentoPhase from '@/components/PlanejamentoPhase';
import IndividualPhase from '@/components/IndividualPhase';
import GroupOrganizationPhase from '@/components/GroupOrganizationPhase';
import GroupPhase from '@/components/GroupPhase';
import LeadersPhase from '@/components/LeadersPhase';
import FinalSynthesisPhase from '@/components/FinalSynthesisPhase';
import TheoreticalPhase from '@/components/TheoreticalPhase';
import CompletionPhase from '@/components/CompletionPhase';



const Index = () => {
  const [sdiState, setSdiState] = useState<SDIState>(() => {
    // Tentar carregar do localStorage
    const saved = localStorage.getItem('sdi-state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Erro ao carregar estado do localStorage:', error);
      }
    }
    return initialSDIState;
  });

  const navigate = useNavigate();

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('sdi-state', JSON.stringify(sdiState));
  }, [sdiState]);

  const phaseNames = [
    "Planejamento",
    "Trabalho Individual", 
    "Organização dos Grupos",
    "Síntese em Grupo",
    "Reunião de Líderes",
    "Síntese dos Líderes",
    "Síntese Final",
    "Aprofundamento Teórico",
    "Concluído"
  ];

  const currentPhase = phaseNames[sdiState.fase] || "Desconhecido";
  const progressPercent = (sdiState.fase / (phaseNames.length - 1)) * 100;

  const renderCurrentPhase = () => {
    const props = { sdiState, setSdiState };
    
    switch (sdiState.fase) {
      case 0: return <PlanejamentoPhase {...props} />;
      case 1: return <IndividualPhase {...props} />;
      case 2: return <GroupOrganizationPhase {...props} />;
      case 3: return <GroupPhase {...props} />;
      case 4: return <LeadersPhase {...props} />;
      case 5: return <LeadersPhase {...props} isActive={true} />;
      case 6: return <FinalSynthesisPhase {...props} />;
      case 7: return <TheoreticalPhase {...props} />;
      case 8: return <CompletionPhase {...props} />;
      default: return <PlanejamentoPhase {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SDI • Sequência Didática Interativa
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                <Target className="h-4 w-4 mr-1" />
                {currentPhase}
              </Badge>
              {sdiState.fase > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Progresso:</span>
                  <div className="w-32">
                    <Progress value={progressPercent} className="h-2" />
                  </div>
                  <span className="text-sm text-gray-500">{Math.round(progressPercent)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPhase()}
      </main>
    </div>
  );
};

export default Index;
