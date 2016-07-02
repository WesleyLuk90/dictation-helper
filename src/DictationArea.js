import React from 'react';

export class DictationArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
		};
		this.initializeVoice();

		window.addEventListener('keypress', (e) => {
			let parent = e.target;
			do {
				if (parent.tagName === 'INPUT' || parent.tagName === 'TEXTAREA') {
					return;
				}
				parent = parent.parentNode;
			} while (parent);

			switch (e.key) {
				case 'n':
					this.next();
					break;
				case 'p':
					this.previous();
					break;
				case 'a':
					this.again();
					break;
				default:
					return;
			}
			e.preventDefault();
		});
	}

	initializeVoice() {
		this.synth = window.speechSynthesis;
		speechSynthesis.onvoiceschanged = () => {
			this.voices = this.synth.getVoices();
			this.ready = true;
		};
	}

	getLines() {
		const lines = this.props.text.split(/[;,.!]/g);
		const linesOut = [];
		for (let i = 0; i < lines.length; i++) {
			const thisLine = lines[i].trim();
			if (thisLine.match(/^\d+$/)) {
				continue;
			}
			if (thisLine.match(/^\w+$/) && i + 1 < lines.length) {
				linesOut.push(`${thisLine} ${lines[i + 1]}`);
				i++;
			} else {
				linesOut.push(thisLine);
			}
		}
		return linesOut;
	}

	speakLine(next) {
		const currentLine = this.getLines()[next];
		const voice = this.synth.getVoices()[2];
		if (!voice || !currentLine) {
			return;
		}
		const utterance = new SpeechSynthesisUtterance(currentLine);
		utterance.voice = voice;
		this.synth.speak(utterance);
	}

	next() {
		const next = this.state.index + 1;
		this.speakLine(next);
		this.setState({ index: next });
	}

	previous() {
		const previous = this.state.index - 1;
		this.speakLine(previous);
		this.setState({ index: previous });
	}

	again() {
		this.speakLine(this.state.index);
	}

	goTo(event, index) {
		event.preventDefault();
		this.speakLine(index);
		this.setState({ index });
	}

	getClass(index) {
		if (this.state.index === index) {
			return 'text-info';
		}
		return '';
	}

	render() {
		return (<div>
			{this.getLines().map((p, i) => <p key={i} className={this.getClass(i)} onDoubleClick={(e) => this.goTo(e, i)}>{p}</p>)}
		</div>);
	}
}
