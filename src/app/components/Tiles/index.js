import React from 'react'
import '../../containers/Files/files-styles.css'
import "../../containers/color.css";
import { Link } from 'react-router-dom'

export class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _getstyles = () => {
        let style =
            this.props.header_text.toLowerCase().indexOf('total') != -1 ? 'blue summary-title' :
                this.props.header_text.toLowerCase().indexOf('accepted') != -1 || this.props.header_text.toLowerCase().indexOf('paid') != -1 ? 'green summary-title' :
                    (this.props.header_text.toLowerCase().indexOf('rejected') != -1 || this.props.header_text.toLowerCase().indexOf('failed') != -1 || this.props.header_text.toLowerCase().indexOf('denied') != -1) ? 'red summary-title' : 'blue summary-title'
        return style
    }

    // Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)

    renderTiles = () => {
        let style = this._getstyles()
        return (
            this.props.isClickable ?
                <Link to={{ pathname: this.props.url, state: { data: this.props._data } }} className="col summary-container">
                    <div className="summary-header">{this.props.header_text}</div>
                    <div className={this.props._style ? [this.props._style, style] : style}>
                        {Number(this.props.value) ? this.props.value : 0}
                        {
                            this.props.header_text == 'Resubmit Queue' ?
                                <button className="btnDesign button-resubmit">Submit</button> : null
                        }
                    </div>
                </Link>
                :
                <div className="col summary-container">
                    <div className="summary-header">{this.props.header_text}</div>
                    <div className={this.props._style ? [this.props._style, style] : style}>
                        {Number(this.props.value) ? this.props.value : 0}</div>
                </div>
        )
    }

    render() {
        return (
            this.renderTiles()
        )
    }
}