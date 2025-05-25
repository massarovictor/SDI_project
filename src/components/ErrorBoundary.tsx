import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary capturou um erro:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full border-red-200">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-red-800">
                Ops! Algo deu errado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Ocorreu um erro inesperado na aplicação SDI. Não se preocupe, 
                  seus dados podem estar salvos no navegador.
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left bg-gray-50 p-4 rounded-lg border">
                    <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                      Detalhes do erro (desenvolvimento)
                    </summary>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><strong>Erro:</strong> {this.state.error.message}</p>
                      <p><strong>Stack:</strong></p>
                      <pre className="text-xs bg-white p-2 rounded border overflow-auto">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  </details>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReload}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Recarregar Página</span>
                </Button>
                
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Ir para Início</span>
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>
                  Se o problema persistir, tente limpar o cache do navegador ou 
                  entre em contato com o suporte técnico.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 