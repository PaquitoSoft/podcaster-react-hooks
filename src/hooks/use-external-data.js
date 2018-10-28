import { useState, useEffect } from 'react';

export default function useExternalData(loader) {
    const [externalData, setExternalData] = useState({
        data: undefined,
        isLoading: true,
        error: undefined
    });

    useEffect(() => {
        loader
            .call()
            .then(data => {
                setExternalData({
                    ...externalData,
                    isLoading: false,
                    data
                });
            })
            .catch(error => {
                setExternalData({
                    ...externalData,
                    isLoading: false,
                    error
                });
            });
    }, []);

    return externalData;
}
