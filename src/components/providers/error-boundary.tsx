"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class GracefullyDegradingErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private contentRef: React.RefObject<HTMLDivElement | null>;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.contentRef = React.createRef();
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render current HTML content without hydration
      return (
        <>
          <div
            ref={this.contentRef}
            suppressHydrationWarning
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Intentional for error recovery UI
            dangerouslySetInnerHTML={{
              __html: this.contentRef.current?.innerHTML || "",
            }}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-destructive text-destructive-foreground py-4 px-6 text-center">
            <p className="font-semibold">
              An error occurred during page rendering
            </p>
          </div>
        </>
      );
    }

    return <div ref={this.contentRef}>{this.props.children}</div>;
  }
}

export { GracefullyDegradingErrorBoundary as ErrorBoundary };
