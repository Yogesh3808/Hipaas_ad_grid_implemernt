import React from 'react'

export class AutoComplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            showDialog: false,
            selected_item: ""
        }
    }

    renderAutoComplete = () => {
        return (
            <input className="form-control input-style-autocomplete" type="text"
                value={this.state.selected_item}
                onChange={(e) => {
                    this.setState({
                        selected_item: e.target.value,
                        showDialog: e.target.value ? true : false
                    })
                    this.props.onHandleChange(e)
                }}
            />
        )
    }

    renderDialog = () => {
        console.log('hello this is the list : ', this.props.list)
        let list = this.props.list
        let row = []
        list.forEach(element => {
            row.push(
                <div className="dropdown-inner-item">
                    <a onClick={() => {
                        this.setState({
                            selected_item: element,
                            showDialog: false
                        })
                        this.props.onSelected(element)
                    }}>
                        {element}
                    </a>
                </div>
            )
        });
        return (
            <div className="autocomplete-dropdown">
                {row}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.list && this.props.list.length > 0 && this.state.showDialog ? this.renderDialog() : null}
                {this.renderAutoComplete()}
            </div>
        );
    }
}