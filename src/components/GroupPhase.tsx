
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, ArrowRight, MessageSquare, Lightbulb } from 'lucide-react';
import { cronocolor } from '@/utils/sdiUtils';

interface Props {
  sdiState: any;
  setSdiState: (state: any) => void;
}

const GroupPhase = ({ sdiState, setSdiState }: Props) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sdiState.start) {
        const total = sdiState.dur[1];
        const elapsed = (Date.now() - sdiState.start) / 1000;
        const remaining = Math.max(0, total - elapsed);
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sdiState.start, sdiState.dur]);

  const handleNext = () => {
    setSdiState({
      ...sdiState,
      fase: 4
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const color = cronocolor(timeLeft, sdiState.dur[1]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Timer */}
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
                  width: `${Math.max(0, (timeLeft / sdiState.dur[1]) * 100)}%`,
                  backgroundColor: color 
                }}
              />
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-blue-800">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span>Fase 2 — Síntese em Grupo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900">Discussão das fichas</h4>
                <p className="text-sm text-blue-700">
                  Compartilhem e discutam as fichas individuais do grupo.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900">Síntese coletiva</h4>
                <p className="text-sm text-blue-700">
                  Produzam <strong>uma frase-chave</strong> que sintetize a posição coletiva.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Tarefas do grupo:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Anotar exemplos que fortaleçam a síntese</li>
              <li>• Coletar referências relevantes</li>
              <li>• Desenvolver argumentos consistentes</li>
              <li>• Preparar a apresentação para os líderes</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg px-8 py-4"
        >
          <span>Reunião de Líderes</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
        
        {timeLeft === 0 && (
          <p className="text-sm text-gray-600 mt-2">Tempo esgotado! Você pode prosseguir quando estiver pronto.</p>
        )}
      </div>
    </div>
  );
};

export default GroupPhase;
