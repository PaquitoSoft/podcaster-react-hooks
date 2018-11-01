import React from 'react';
import { func } from 'prop-types';

import LoaderContext from '../contexts/loader-context';

class ExternalDataLoader extends React.Component {

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
            const externalData = await this.props.loader();
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
        return (
            <div>{this.props.children(this.state)}</div>
        );
    }

}

ExternalDataLoader.propTypes = {
    children: func.isRequired,
    loader: func.isRequired
};

export default ExternalDataLoader;
