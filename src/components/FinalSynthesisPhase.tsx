import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight, Lightbulb, Users } from 'lucide-react';
import { SDIProps } from '@/types/sdi';

const FinalSynthesisPhase = ({ sdiState, setSdiState }: SDIProps) => {
  const handleNext = () => {
    setSdiState({
      ...sdiState,
      fase: 7
    });
  };

  // Verifica se há clusters formados
  const hasClusters = sdiState.clusters && sdiState.clusters.length > 1;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Instructions */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-orange-800">
            <div className="p-2 bg-orange-600 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span>Síntese Final da Turma</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasClusters && (
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-medium text-amber-900 mb-3">⚠️ Clusters Identificados - {sdiState.clusters.length} clusters formados</h4>
              <p className="text-amber-800 text-sm mb-3">
                Você pode registrar a síntese de duas formas:
              </p>
              <ul className="text-amber-800 text-sm space-y-1 ml-4">
                <li>• <strong>Resposta única:</strong> Unifique as sínteses dos clusters em uma definição consensual</li>
                <li>• <strong>Respostas diferentes:</strong> Registre as sínteses específicas de cada cluster separadamente</li>
              </ul>
            </div>
          )}
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-900">Unificação das sínteses</h4>
                <p className="text-sm text-orange-700">
                  Combine as definições em uma versão unificada.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-900">Definição consensual</h4>
                <p className="text-sm text-orange-700">
                  Registre a definição final que representa o entendimento da turma.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">Digite a definição unificada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h4 className="font-medium text-orange-900 mb-2">Pergunta orientadora:</h4>
            <p className="text-lg italic text-orange-800 leading-relaxed">
              "{sdiState.q}"
            </p>
          </div>
          
          <div>
            <Label htmlFor="sintese" className="text-orange-900">Síntese Final da Turma</Label>
            <Textarea
              id="sintese"
              value={sdiState.sintese}
              onChange={(e) => setSdiState({ ...sdiState, sintese: e.target.value })}
              placeholder="Registre aqui a definição unificada que representa o consenso da turma. Em caso de clusters, você pode registrar um consenso entre todos ou as respostas diferentes de cada cluster..."
              rows={8}
              className="mt-2 border-orange-200 focus:border-orange-400"
            />
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-2">Dicas para uma boa síntese:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Seja clara e objetiva</li>
              <li>• Incorpore os principais insights dos grupos</li>
              <li>• Mantenha a essência das discussões</li>
              <li>• Use linguagem acessível a todos</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-lg px-8 py-4"
        >
          <span>Salvar Síntese e Ministrar Conteúdo</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default FinalSynthesisPhase;
