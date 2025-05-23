
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Clock, ArrowRight, PenTool } from 'lucide-react';
import { cronocolor } from '@/utils/sdiUtils';

interface Props {
  sdiState: any;
  setSdiState: (state: any) => void;
}

const IndividualPhase = ({ sdiState, setSdiState }: Props) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sdiState.start) {
        const total = sdiState.dur[0];
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
      fase: 2
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const color = cronocolor(timeLeft, sdiState.dur[0]);

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
                  width: `${Math.max(0, (timeLeft / sdiState.dur[0]) * 100)}%`,
                  backgroundColor: color 
                }}
              />
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-green-800">
            <div className="p-2 bg-green-600 rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <span>Fase 1 — Trabalho Individual</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/60 rounded-lg p-4 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Pergunta orientadora:</h3>
            <p className="text-lg italic text-green-800 leading-relaxed">
              "{sdiState.q}"
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <PenTool className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900">Registre suas ideias iniciais</h4>
                <p className="text-sm text-green-700">
                  Antes de qualquer debate em grupo, escreva seus pensamentos sobre o tema.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900">Ponto de partida autêntico</h4>
                <p className="text-sm text-green-700">
                  Este registro permitirá comparar como seu entendimento evoluirá.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-4"
        >
          <span>Organizar Grupos</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
        
        {timeLeft === 0 && (
          <p className="text-sm text-gray-600 mt-2">Tempo esgotado! Você pode prosseguir quando estiver pronto.</p>
        )}
      </div>
    </div>
  );
};

export default IndividualPhase;
