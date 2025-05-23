
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Vote, ArrowRight, Target } from 'lucide-react';

interface Props {
  sdiState: any;
  setSdiState: (state: any) => void;
}

const GroupOrganizationPhase = ({ sdiState, setSdiState }: Props) => {
  const handleNext = () => {
    setSdiState({
      ...sdiState,
      fase: 3,
      start: Date.now()
    });
  };

  const colors = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#af7aa1", "#ff9d9a", "#86bcb6"];

  const renderGroupChips = (members: number[], color: string) => {
    return (
      <div className="flex flex-wrap gap-2">
        {members.map((member) => (
          <div
            key={member}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
            style={{ backgroundColor: color }}
          >
            {member}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Instructions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-blue-800">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span>Organização dos Grupos-base</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900">Discussão em grupo</h4>
                <p className="text-sm text-blue-700">
                  Reúnam-se nos grupos indicados para discutir percepções e buscar consensos.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Vote className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900">Eleição do líder</h4>
                <p className="text-sm text-blue-700">
                  Escolham por votação aberta quem representará o grupo na próxima etapa.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups Display */}
      <div className="space-y-6">
        {sdiState.clusters.map((clusterIndexes: number[], clusterId: number) => (
          <Card key={clusterId} className="border-2 border-gray-200">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>Cluster {clusterId + 1}</span>
                <Badge variant="outline">{clusterIndexes.length} grupos</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {clusterIndexes.map((groupIndex) => {
                  const members = sdiState.grupos[groupIndex];
                  const color = colors[groupIndex % colors.length];
                  
                  return (
                    <div
                      key={groupIndex}
                      className="border-2 rounded-lg p-4 transition-all hover:shadow-md"
                      style={{ borderColor: color }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold" style={{ color }}>
                          Grupo {groupIndex + 1}
                        </h4>
                        <Badge 
                          variant="outline" 
                          style={{ borderColor: color, color }}
                        >
                          {members.length} alunos
                        </Badge>
                      </div>
                      {renderGroupChips(members, color)}
                    </div>
                  );
                })}
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
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4"
        >
          <span>Iniciar Cronômetro da Fase 2</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default GroupOrganizationPhase;
