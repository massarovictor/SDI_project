
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Clock, ArrowRight, Users, Target } from 'lucide-react';
import { cronocolor } from '@/utils/sdiUtils';

interface Props {
  sdiState: any;
  setSdiState: (state: any) => void;
  isActive?: boolean;
}

const LeadersPhase = ({ sdiState, setSdiState, isActive = false }: Props) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        if (sdiState.start) {
          const total = sdiState.dur[2];
          const elapsed = (Date.now() - sdiState.start) / 1000;
          const remaining = Math.max(0, total - elapsed);
          setTimeLeft(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sdiState.start, sdiState.dur, isActive]);

  const handleNext = () => {
    if (isActive) {
      setSdiState({
        ...sdiState,
        fase: 6
      });
    } else {
      setSdiState({
        ...sdiState,
        fase: 5,
        start: Date.now()
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const color = cronocolor(timeLeft, sdiState.dur[2]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Timer (only when active) */}
      {isActive && (
        <Card className="text-center border-2" style={{ borderColor: color }}>
          <CardContent className="pt-8 pb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">Tempo restante</span>
              </div>
              
              <div 
                className="text-8xl font-mono font-bold tracking-tight"
                style={{ color }}
              >
                {formatTime(timeLeft)}
              </div>
              
              {/* Remova o bloco da barra de progresso abaixo */}
              {/* <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Math.max(0, (timeLeft / sdiState.dur[2]) * 100)}%`,
                    backgroundColor: color 
                  }}
                />
              </div> */}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-purple-800">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <span>{isActive ? "Fase 3 — Síntese dos Líderes" : "Reunião de Líderes"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isActive ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-900">Negociação democrática</h4>
                  <p className="text-sm text-purple-700">
                    Negociem a definição do cluster, buscando clareza e abrangência.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-900">Registro consensual</h4>
                  <p className="text-sm text-purple-700">
                    Ao final, registrem a versão consensual da definição.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3">
                <Crown className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-900">Líderes por cluster</h4>
                  <p className="text-sm text-purple-700">
                    Os líderes eleitos se reúnem por cluster para unificar a definição preliminar.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-900">Demais integrantes</h4>
                  <p className="text-sm text-purple-700">
                    Podem refinar exemplos ou coletar dados adicionais, evitando ociosidade.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clusters Information */}
      <div className="grid gap-4 md:grid-cols-2">
        {sdiState.clusters.map((clusterIndexes: number[], clusterId: number) => (
          <Card key={clusterId} className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-800">Cluster {clusterId + 1}</span>
                </div>
                <Badge variant="outline" className="border-purple-300 text-purple-700">
                  {clusterIndexes.length} líderes
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">Líderes dos grupos:</p>
                <div className="flex flex-wrap gap-2">
                  {clusterIndexes.map((groupIndex) => (
                    <Badge 
                      key={groupIndex}
                      variant="outline"
                      className="border-purple-300 text-purple-700"
                    >
                      Grupo {groupIndex + 1}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4"
        >
          <span>
            {isActive ? "Redigir Síntese Final da Turma" : "Iniciar Cronômetro Líderes"}
          </span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
        
        {isActive && timeLeft === 0 && (
          <p className="text-sm text-gray-600 mt-2">Tempo esgotado! Você pode prosseguir quando estiver pronto.</p>
        )}
      </div>
    </div>
  );
};

export default LeadersPhase;
