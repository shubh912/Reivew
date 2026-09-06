import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application failed to render', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-center text-navy-900">
        <div className="max-w-lg">
          <h1 className="font-display text-3xl font-bold">This page could not load</h1>
          <p className="mt-3 text-navy-600">
            Please refresh the page. If the problem continues, contact Saket Packers and Movers on 9838494871.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-brand-600 px-5 py-3 font-bold text-white"
          >
            Refresh page
          </button>
        </div>
      </main>
    );
  }
}