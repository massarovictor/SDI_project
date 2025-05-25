
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, RotateCcw, Download, Trophy, Users, Clock, Target, FileText } from 'lucide-react';
import { gerarRelatorioFinal } from '@/utils/sdiUtils';
import { toast } from 'sonner';
import { SDIProps, initialSDIState } from '@/types/sdi';

const CompletionPhase = ({ sdiState, setSdiState }: SDIProps) => {
  useEffect(() => {
    // Record end time when component mounts
    if (!sdiState.end) {
      setSdiState({ ...sdiState, end: Date.now() });
    }
    
    // Trigger confetti effect
    const timer = setTimeout(() => {
      // You could add a confetti library here
      // SDI Completed successfully
    }, 500);

    return () => clearTimeout(timer);
  }, [sdiState, setSdiState]);

  const handleRestart = () => {
    setSdiState(initialSDIState);
  };

  const handleDownloadReport = () => {
    try {
      gerarRelatorioFinal(sdiState);
      toast.success("Relatório PDF gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar relatório PDF: " + (error as Error).message);
      console.error("PDF generation error:", error);
    }
  };

  // Calculate total planned time in minutes
  const totalPlanned = Math.round((sdiState.dur[0] + sdiState.dur[1] + sdiState.dur[2]) / 60);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
            <Trophy className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            🎉 SDI Concluída!
          </h1>
          <p className="text-xl text-gray-600">
            Parabéns! A Sequência Didática Interativa foi finalizada com sucesso.
          </p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">{sdiState.n}</div>
                <p className="text-sm text-green-700">Participantes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">{sdiState.grupos.length}</div>
                <p className="text-sm text-blue-700">Grupos formados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">{sdiState.clusters.length}</div>
                <p className="text-sm text-purple-700">Clusters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-900">{totalPlanned}</div>
                <p className="text-sm text-orange-700">Min. planejados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session Summary */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Resumo da Sessão</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Dados da sessão:</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Professor(a):</strong> {sdiState.prof || "Não informado"}</p>
                <p><strong>Disciplina:</strong> {sdiState.disc || "Não informada"}</p>
                <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Tempo planejado:</strong> {totalPlanned} minutos</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Fases completadas:</h4>
              <div className="space-y-1">
                {[
                  "Planejamento",
                  "Trabalho Individual",
                  "Organização dos Grupos",
                  "Síntese em Grupo",
                  "Reunião de Líderes",
                  "Síntese dos Líderes",
                  "Síntese Final",
                  "Aprofundamento Teórico"
                ].map((phase, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">{phase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {sdiState.sintese && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Síntese Final Construída:</h4>
              <p className="text-gray-700 italic leading-relaxed">
                "{sdiState.sintese}"
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={handleDownloadReport}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Baixar Relatório PDF</span>
        </Button>
        
        <Button
          onClick={handleRestart}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Nova SDI</span>
        </Button>
      </div>

      {/* Thank you message */}
      <div className="text-center">
        <p className="text-gray-600">
          Obrigado pela participação! A metodologia SDI promove aprendizagem colaborativa e dialógica.
        </p>
      </div>
    </div>
  );
};

export default CompletionPhase;
