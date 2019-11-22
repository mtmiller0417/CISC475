import React from "react";

export default class Modal extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <div>
                    <h2>Modal window</h2>
                    <div>{this.props.data}</div>
                    <div>
                        <button onClick={this.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}