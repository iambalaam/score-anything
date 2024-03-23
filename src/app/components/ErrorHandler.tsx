import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Fallback = ({ error }: { error: Error }) => (
    <div>
        <h1>Rats!</h1>
        <p>Something went wrong</p>
        <br />
        <code>
            {error instanceof Error
                ? `
        ${error.message}
        ${error.stack}
        `
                : `${error}`}
        </code>
    </div>
);
export function ErrorHandler({ children }: React.PropsWithChildren) {
    return (
        <ErrorBoundary
            fallbackRender={(props) => {
                console.warn(props);
                return <Fallback error={props.error} />;
            }}
        >
            {children}
        </ErrorBoundary>
    );
}
