import { useState, useEffect } from 'react';
import { deepOverride } from './deepOverride';

export function storeData<T>(key: string, data: T) {
    if ('localStorage' in window) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }
}

export function getData<T>(key: string): T | null | undefined {
    if ('localStorage' in window) {
        const data = window.localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
    }
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [data, setData] = useState<T>(() => {
        const localData = getData<T>(key);
        return deepOverride(initialValue, localData, false) as any;
    });

    useEffect(() => {
        storeData<T>(key, data);
    }, [key, data]);

    return [data, setData];
}
