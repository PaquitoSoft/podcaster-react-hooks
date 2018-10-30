import { useState, useEffect, useContext } from 'react';
import LoaderContext from '../contexts/loader-context';

export default function useExternalData(loader) {
    const [externalData, setExternalData] = useState({
        data: undefined,
        isLoading: true,
        error: undefined
    });

    const context = useContext(LoaderContext);
    
    useEffect(() => {
        context.setIsLoading(true);

        loader()
            .then(data => {
                setExternalData({
                    ...externalData,
                    isLoading: false,
                    data
                });
                context.setIsLoading(false);
            })
            .catch(error => {
                setExternalData({
                    ...externalData,
                    isLoading: false,
                    error
                });
                context.setIsLoading(false);
            });
    }, []);

    return externalData;
}
