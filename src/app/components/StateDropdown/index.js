import '../../containers/Files/files-styles.css'
import React from 'react'
import { getStates } from '../../../helpers/getDetails';

export class StateDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            _states: []
        }
    }

    componentDidMount() {
        this._getState()
    }

    _getState = async () => {
        let stateArray = await getStates()
        console.log('Hello', stateArray)
        this.setState({
            _states: stateArray
        })
    }

    getOptions = () => {
        let row = []
        this.state._states.forEach(element => {
            if (!element) {
                return
            }
            row.push(<option value="">{element}</option>)
        })
        return row
    }

    renderDropdown = () => {
        return (
            <select className="form-control list-dashboard" style={{maxHeight: '100px'}} id="state"
                onChange={(event) => {
                    this.props.method(event)
                }}
            >
                <option value=""></option>
                {this.getOptions()}
            </select>
        )
    }

    render() {
        return (
            this.renderDropdown()
        )
    }
}