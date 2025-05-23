
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowRight, Lightbulb, Users, Target } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
  sdiState: any;
  setSdiState: (state: any) => void;
}

const TheoreticalPhase = ({ sdiState, setSdiState }: Props) => {
  const handleNext = () => {
    setSdiState({
      ...sdiState,
      fase: 8
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Alert */}
      <Alert className="border-green-200 bg-green-50">
        <Lightbulb className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Professor(a)</strong>, utilize a síntese construída para apresentar fundamentos teóricos, 
          autores e evidências empíricas que ampliem e qualifiquem a compreensão do tema.
        </AlertDescription>
      </Alert>

      {/* Instructions */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-emerald-800">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span>Aprofundamento Teórico</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start space-x-3">
              <BookOpen className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-emerald-900">Fundamentos teóricos</h4>
                <p className="text-sm text-emerald-700">
                  Apresente autores e teorias relevantes ao tema.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-emerald-900">Evidências empíricas</h4>
                <p className="text-sm text-emerald-700">
                  Conecte com pesquisas e dados concretos.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-emerald-900">Diálogo com a síntese</h4>
                <p className="text-sm text-emerald-700">
                  Qualifique o entendimento construído.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Constructed Definition */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-800">Definição Construída pela Turma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <h4 className="font-medium text-emerald-900 mb-2">Pergunta orientadora:</h4>
            <p className="text-lg italic text-emerald-800 leading-relaxed mb-4">
              "{sdiState.q}"
            </p>
            
            <h4 className="font-medium text-emerald-900 mb-2">Síntese coletiva:</h4>
            <div className="bg-white rounded-lg p-4 border border-emerald-200">
              {sdiState.sintese ? (
                <p className="text-emerald-800 text-lg leading-relaxed">
                  {sdiState.sintese}
                </p>
              ) : (
                <p className="text-gray-500 italic">
                  (Síntese não registrada)
                </p>
              )}
            </div>
          </div>
          
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <h4 className="font-medium text-teal-900 mb-2">Próximos passos sugeridos:</h4>
            <ul className="text-sm text-teal-800 space-y-1">
              <li>• Relacionar a síntese com autores clássicos do tema</li>
              <li>• Apresentar pesquisas recentes que dialoguem com as ideias construídas</li>
              <li>• Destacar pontos de convergência e divergência com a literatura</li>
              <li>• Propor atividades de aprofundamento baseadas na síntese</li>
              <li>• Documentar o processo para futuras reflexões</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg px-8 py-4"
        >
          <span>Concluir SDI</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TheoreticalPhase;
