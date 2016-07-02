import React from 'react';

export class TextInputArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: this.getSaved(),
		};
	}

	getSaved() {
		return localStorage.getItem('saved-text') || '';
	}

	save(text) {
		localStorage.setItem('saved-text', text);
	}

	onChange(e) {
		this.setState({ text: e.target.value });
	}

	onClick(e) {
		e.preventDefault();
		this.triggerUpdate(this.state.text);
	}

	triggerUpdate(text) {
		this.save(text);
		this.props.onUpdate(text);
	}

	render() {
		return (<div className="clear-fix">
			<textarea
				value={this.state.text}
				className="form-control"
				onChange={(e) => this.onChange(e)}
				rows="20"
			/>
			<div className="pull-right">
				<button className="btn btn-primary" onClick={(e) => this.onClick(e)}>Update</button>
			</div>
		</div>);
	}
}
