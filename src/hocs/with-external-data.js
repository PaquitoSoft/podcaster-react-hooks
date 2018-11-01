import React from 'react';

import LoaderContext from '../contexts/loader-context';

export default function withExternalData(WrappedComponent, loader) {
    return class extends React.Component {

        static contextType = LoaderContext;

        constructor(props) {
            super(props);

            this.state = {
                isLoading: false,
                externalData: undefined,
                error: undefined
            };
        }

        async componentDidMount() {
            this.setState({ isLoading: true });
            this.context.setIsLoading(true);

            try {
                const externalData = await loader();
                this.setState({
                    isLoading: false,
                    externalData
                });
                this.context.setIsLoading(false);
            } catch (error) {
                console.warn('Could not load external data:', error);
                this.setState({
                    isLoading: false,
                    error: error
                });
                this.context.setIsLoading(false);
            }
        }

        render() {
            const props = {
                ...this.props,
                ...this.state
            };
            return (
                <WrappedComponent {...props} />
            );
        }
    }
}