import React from 'react';

const contextContent = {
    isLoading: false,
    setIsLoading: () => {}
};

const context = React.createContext(contextContent);

export default context;
