
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, Users, Download, Play, ChevronDown, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { formarGruposEClusters, gerarPdfFichas } from '@/utils/sdiUtils';

interface Props {
  sdiState: any;
  setSdiState: (state: any) => void;
}

const PlanejamentoPhase = ({ sdiState, setSdiState }: Props) => {
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);

  const handleGenerateGroups = () => {
    try {
      const { sizes, grupos, clusters } = formarGruposEClusters(sdiState.n);
      setSdiState({
        ...sdiState,
        sizes,
        grupos,
        clusters
      });
      toast.success(`${grupos.length} grupos criados em ${clusters.length} cluster(s)`);
    } catch (error) {
      toast.error("Erro ao formar grupos: " + (error as Error).message);
    }
  };

  const handleDownloadPdf = () => {
    try {
      gerarPdfFichas(sdiState.prof, sdiState.disc, sdiState.q, sdiState.n);
      toast.success("Fichas PDF geradas com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar PDF");
    }
  };

  const handleStartSDI = () => {
    if (!sdiState.q.trim()) {
      toast.error("Por favor, defina a pergunta hermenêutica");
      return;
    }
    if (sdiState.grupos.length === 0) {
      toast.error("Por favor, gere os grupos antes de iniciar");
      return;
    }
    
    setSdiState({
      ...sdiState,
      fase: 1,
      start: Date.now()
    });
    toast.success("SDI iniciada!");
  };

  const canStart = sdiState.q.trim() && sdiState.grupos.length > 0;

  return (
    <div className="space-y-8">
      {/* Informações sobre SDI */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-blue-100/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-blue-900">Sequência Didática Interativa (SDI): Guia Prático</CardTitle>
                </div>
                <ChevronDown className={`h-5 w-5 text-blue-600 transition-transform ${isInfoOpen ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4 text-sm text-gray-700">
              <p className="font-medium text-blue-900">
                A SDI, desenvolvida por Maria Marly de Oliveira, é uma proposta didático-metodológica com abordagem dialógico-hermenêutica, estruturada em etapas com funções pedagógicas específicas:
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">Prep</Badge>
                    <div>
                      <strong>Planejamento & Pergunta-guia</strong> — o(a) docente define o tema e formula a pergunta hermenêutica que orienta todo o processo.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Badge className="mt-0.5 bg-green-600">1</Badge>
                    <div>
                      <strong>Registro individual</strong> — cada estudante escreve suas ideias iniciais para preservar o ponto de partida.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Badge className="mt-0.5 bg-blue-600">2</Badge>
                    <div>
                      <strong>Discussão em subgrupos</strong> — grupos de 3–5 participantes confrontam percepções e constroem uma síntese provisória.
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Badge className="mt-0.5 bg-purple-600">3</Badge>
                    <div>
                      <strong>Reunião de líderes</strong> — representantes negociam uma versão preliminar, onde apresentam e discutem as sínteses de seus grupos de origem.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">Final</Badge>
                    <div>
                      <strong>Síntese coletiva & Aprofundamento teórico</strong> — a definição/síntese geral construída pelos líderes é apresentada e discutida com toda a turma.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Formulário de Configuração */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Informações Básicas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="prof">Professor(a)</Label>
              <Input
                id="prof"
                value={sdiState.prof}
                onChange={(e) => setSdiState({ ...sdiState, prof: e.target.value })}
                placeholder="Nome do professor"
              />
            </div>
            
            <div>
              <Label htmlFor="disc">Disciplina</Label>
              <Input
                id="disc"
                value={sdiState.disc}
                onChange={(e) => setSdiState({ ...sdiState, disc: e.target.value })}
                placeholder="Nome da disciplina"
              />
            </div>
            
            <div>
              <Label htmlFor="q">Pergunta hermenêutica *</Label>
              <Textarea
                id="q"
                value={sdiState.q}
                onChange={(e) => setSdiState({ ...sdiState, q: e.target.value })}
                placeholder="Formule a pergunta que orientará toda a discussão..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="n">Número de participantes</Label>
              <Input
                id="n"
                type="number"
                min="4"
                max="300"
                value={sdiState.n}
                onChange={(e) => setSdiState({ ...sdiState, n: parseInt(e.target.value) || 25 })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Duração das Fases</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dur1">⏳ Fase Individual (minutos)</Label>
              <Input
                id="dur1"
                type="number"
                min="1"
                max="120"
                value={Math.floor(sdiState.dur[0] / 60)}
                onChange={(e) => {
                  const newDur = [...sdiState.dur];
                  newDur[0] = parseInt(e.target.value) * 60 || 300;
                  setSdiState({ ...sdiState, dur: newDur as [number, number, number] });
                }}
              />
            </div>
            
            <div>
              <Label htmlFor="dur2">⏳ Fase em Grupo (minutos)</Label>
              <Input
                id="dur2"
                type="number"
                min="1"
                max="120"
                value={Math.floor(sdiState.dur[1] / 60)}
                onChange={(e) => {
                  const newDur = [...sdiState.dur];
                  newDur[1] = parseInt(e.target.value) * 60 || 600;
                  setSdiState({ ...sdiState, dur: newDur as [number, number, number] });
                }}
              />
            </div>
            
            <div>
              <Label htmlFor="dur3">⏳ Fase Líderes (minutos)</Label>
              <Input
                id="dur3"
                type="number"
                min="1"
                max="120"
                value={Math.floor(sdiState.dur[2] / 60)}
                onChange={(e) => {
                  const newDur = [...sdiState.dur];
                  newDur[2] = parseInt(e.target.value) * 60 || 480;
                  setSdiState({ ...sdiState, dur: newDur as [number, number, number] });
                }}
              />
            </div>

            {sdiState.grupos.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>{sdiState.grupos.length} grupos</strong> em <strong>{sdiState.clusters.length} cluster(s)</strong> criados
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleGenerateGroups}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Gerar Grupos / Clusters</span>
            </Button>
            
            {sdiState.grupos.length > 0 && (
              <Button
                onClick={handleDownloadPdf}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Baixar Fichas PDF</span>
              </Button>
            )}
            
            <Button
              onClick={handleStartSDI}
              disabled={!canStart}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Play className="h-4 w-4" />
              <span>Iniciar SDI</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanejamentoPhase;
