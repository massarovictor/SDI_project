import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Clock, 
  FileText, 
  Download,
  ArrowRight,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Formação Automática de Grupos",
      description: "Algoritmo inteligente para criação grupos equilibrados"
    },
    {
      icon: Clock,
      title: "Cronômetro Integrado",
      description: "Controle de tempo flexível para cada fase da sequência didática"
    },
    {
      icon: FileText,
      title: "Geração de Fichas em PDF",
      description: "Crie automaticamente fichas personalizadas para os participantes"
    },
    {
      icon: BarChart3,
      title: "Acompanhamento Visual",
      description: "Barra de progresso e indicadores visuais do andamento"
    },
    {
      icon: Download,
      title: "Relatório Final",
      description: "Documente todo o processo em um relatório completo (PDF)"
    },
    {
      icon: Lightbulb,
      title: "Guia Metodológico",
      description: "Interface com orientações integradas à metodologia SDI"
    }
  ];

  const phases = [
    { number: "01", name: "Planejamento", description: "Escolha do tema e formulação da pergunta hermenêutica" },
    { number: "02", name: "Trabalho Individual", description: "Registro inicial das concepções de cada estudante" },
    { number: "03", name: "Formação dos Grupos", description: "Grupos formados aleatoriamente a partir dos números das fichas" },
    { number: "04", name: "Síntese em Grupo", description: "Discussão interna para elaborar uma síntese parcial" },
    { number: "05", name: "Reunião de Líderes", description: "Negociação entre líderes eleitos democraticamente" },
    { number: "06", name: "Síntese dos Líderes", description: "Apresentação da síntese integrada à turma" },
    { number: "07", name: "Síntese Final", description: "Construção coletiva da resposta consensual" },
    { number: "08", name: "Aprofundamento Teórico", description: "Consulta a fontes da literatura e fundamentação final" }
  ];

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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SDI • Sequência Didática Interativa
              </h1>
            </div>
            
            <Button 
              onClick={() => navigate('/app')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Acessar Aplicação
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Metodologia Educacional Inovadora
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transforme
            </span>
            <br />
            <span className="text-gray-900">sua Prática Pedagógica</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Plataforma digital para condução de Sequências Didáticas Interativas baseada na 
            metodologia de <strong>Maria Marly de Oliveira</strong>. Promova aprendizagem 
            colaborativa e dialógica com ferramentas modernas.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/app')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
          >
            Começar Agora
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para conduzir uma SDI completa e eficiente
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Clusterização Info */}
          <div className="mt-16">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-gray-900">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span>Clusterização Inteligente para Turmas Grandes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Para turmas com muitos participantes, nossa plataforma implementa automaticamente a 
                  <strong> estratégia de clusterização</strong>. Quando são formados mais de 5 grupos, 
                  o sistema organiza os grupos-base em <strong>clusters</strong> (agrupamentos) de até 5 grupos cada.
                </p>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Organização Automática</h4>
                      <p className="text-gray-600 text-sm">
                        O algoritmo distribui automaticamente os grupos em clusters equilibrados, 
                        garantindo que cada cluster tenha no máximo 5 grupos para facilitar a gestão.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Reuniões por Cluster</h4>
                      <p className="text-gray-600 text-sm">
                        Cada cluster funciona como uma unidade independente, onde os líderes se reúnem 
                        para construir sínteses intergrupais.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>Exemplo:</strong> Em uma turma de 30 alunos, o sistema divide automaticamente a classe em 6 grupos, organizados em 2 clusters de 3 grupos cada, otimizando o processo de síntese.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              As 8 Fases da SDI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Metodologia estruturada para construção coletiva do conhecimento
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">{phase.number}</span>
                  </div>
                  <CardTitle className="text-lg">{phase.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para revolucionar suas aulas?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Comece agora mesmo a usar a metodologia SDI com nossa plataforma intuitiva e completa.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/app')}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
          >
            Iniciar Minha Primeira SDI
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">SDI • Sequência Didática Interativa</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Baseada na metodologia de Maria Marly de Oliveira
          </p>
          <p className="text-gray-500 text-sm">
            Desenvolvido por Massaro Victor • © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 