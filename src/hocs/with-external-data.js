import React from 'react';

export default function withExternalData(WrappedComponent, loader) {
    return class extends React.Component {
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

            try {
                const externalData = await loader();
                this.setState({
                    isLoading: false,
                    externalData
                });
            } catch (error) {
                console.warn('Could not load external data:', error);
                this.setState({
                    isLoading: false,
                    error: error
                });
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