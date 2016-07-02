import React from 'react';
import { TextInputArea } from './TextInputArea.js';
import { DictationArea } from './DictationArea.js';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
		};
	}
	onUpdate(newText) {
		this.setState({ text: newText });
	}

	render() {
		return (<div>
			<TextInputArea onUpdate={(t) => this.onUpdate(t)} />
			<DictationArea text={this.state.text} />
		</div>);
	}
}
