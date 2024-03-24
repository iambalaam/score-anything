import posthog from 'posthog-js';

// const isPWA = window.matchMedia('(display-mode: standalone)').matches;

export function attachMetrics() {
    posthog.init('phc_xPrfwCZCIei8ZWgdH0nUFHBLxLImIra52rSsmntNe0D', {
        api_host: 'https://eu.posthog.com'
    });
}

export type FlatJSON = Record<string | number, string | number>;

export const metrics = {
    add(event: string, body: FlatJSON) {
        try {
            posthog.capture(event, body);
        } catch (e) {
            console.error(e);
        }
    }
};
