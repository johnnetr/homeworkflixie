import React from 'react';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }
    }

    onChange(e) {
        let newValue = e.target.value;
        this.setState({
            value: newValue,
        });
        this.props.handleChange(newValue);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={(e) => this.onChange(e)} placeholder="Movie search..." />
            </div>
        )
    }
}