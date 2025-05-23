
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, Download, Play, ArrowRight, BookOpen, Target, MessageSquare } from 'lucide-react';
import PlanejamentoPhase from '@/components/PlanejamentoPhase';
import IndividualPhase from '@/components/IndividualPhase';
import GroupOrganizationPhase from '@/components/GroupOrganizationPhase';
import GroupPhase from '@/components/GroupPhase';
import LeadersPhase from '@/components/LeadersPhase';
import FinalSynthesisPhase from '@/components/FinalSynthesisPhase';
import TheoreticalPhase from '@/components/TheoreticalPhase';
import CompletionPhase from '@/components/CompletionPhase';

interface SDIState {
  fase: number;
  prof: string;
  disc: string;
  q: string;
  n: number;
  dur: [number, number, number];
  sizes: number[];
  grupos: number[][];
  clusters: number[][];
  start: number | null;
  end: number | null;
  sintese: string;
}

const Index = () => {
  const [sdiState, setSdiState] = useState<SDIState>({
    fase: 0,
    prof: "",
    disc: "",
    q: "",
    n: 25,
    dur: [300, 600, 480],
    sizes: [],
    grupos: [],
    clusters: [],
    start: null,
    end: null,
    sintese: ""
  });

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
      case 5: return <LeadersPhase {...props} isActive />;
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
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SDI • Sequência Didática Interativa
                </h1>
                <p className="text-sm text-gray-600">Metodologia dialógico-hermenêutica estruturada</p>
              </div>
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

      {/* Phase indicator at bottom */}
      {/* Remova ou comente este bloco de código */}
      {/* {sdiState.fase > 0 && sdiState.fase < 8 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="px-6 py-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Fase {sdiState.fase}/7</span>
                </div>
                <span className="text-sm text-gray-600">{currentPhase}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )} */}
    </div>
  );
};

export default Index;
