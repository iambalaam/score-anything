import * as React from "react";
import './Dial.css';

export interface DialProps {
	angle: number
}

const Dial: React.FunctionComponent<DialProps> = ({ angle }) => {
	const backgroundColor = 'white';
	const startColor = 'red';
	const endColor = 'blue';
	const conicGradient = `conic-gradient(${backgroundColor} 0deg, ${startColor} 0deg, ${endColor} ${angle}deg, ${backgroundColor} ${angle}deg)`;

	const center = 'translate(-50%, -50%)';
	const toEdge = 'translateY(-200px)';
	const startSemiCircle = `linear-gradient(90deg, ${startColor} 50%, transparent 50%)`
	const endSemiCircle = `linear-gradient(90deg, transparent 50%, ${endColor} 50%)`

	return (
		<div className="dial" style={{ background: conicGradient }}>
			<div className="dial-cover" />
			<div className="dial-start" style={{ background: startSemiCircle, transform: `${center} ${toEdge}` }}></div>
			<div className="dial-end" style={{ background: endSemiCircle, transform: `${center} rotate(${angle}deg) ${toEdge}` }}></div>
		</div>
	);
};

export default Dial;
