import * as React from "react";
import "./Dial.css";

const Dial: React.FunctionComponent<{}> = () => {
	const dialState = React.useRef({ isDown: false, lastAngle: 0 });
	const [angle, setAngle] = React.useState(0);

	const handleDown = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();
		dialState.current.isDown = true;
	}
	const handleUp = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();
		dialState.current.isDown = false;
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!dialState.current.isDown) return;
		e.preventDefault();

		const dx = e.clientX - window.innerWidth / 2;
		const dy = e.clientY - window.innerHeight / 2;
		let angle = 90 - Math.atan2(-dy, dx) * 180 / Math.PI;

		while (Math.abs(dialState.current.lastAngle - angle) > 180) {
			angle += dialState.current.lastAngle > angle ? 360 : -360;
		}
		setAngle(angle);
		dialState.current.lastAngle = angle;
	}

	const cleanupMoveListeners = () => {
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleUp);
	}

	React.useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleUp);
		return cleanupMoveListeners;
	}, []);

	const backgroundColor = "white";
	const startColor = "#1f4259";
	const endColor = "#4d96d8";
	let conicGradient = `conic-gradient(${backgroundColor} 0deg, ${startColor} 0deg, ${endColor} ${angle}deg, ${backgroundColor} ${angle}deg)`;

	const center = "translate(-50%, -50%)";
	const toEdge = "translateY(-200px)";
	let startSemiCircle = `linear-gradient(90deg, ${startColor} 50%, transparent 50%)`;
	let endSemiCircle = `linear-gradient(90deg, transparent 50%, ${endColor} 50%)`;

	// Wasn't sure of how to 'do the math' inside the template literal, so I did it here instead...
	const negativeAngle = 360 + angle;

	// If the angle is negative, we need to flip the gradient and the semi-circles
	if (angle < 0) {
		conicGradient = `conic-gradient(
			${backgroundColor} 0deg, 
			${backgroundColor} ${negativeAngle}deg, 
			${endColor} ${negativeAngle}deg, 
			${startColor} 360deg
			)`;
		startSemiCircle = `linear-gradient(
			270deg,
			${startColor} 50%, 
			transparent 50%
			)`;
		endSemiCircle = `linear-gradient(
			270deg,
			transparent 50%,
			${endColor} 50%
			)`;
	}

	return (
		<>
			<div className="dial" style={{ background: conicGradient }}>
				<div className="dial-cover" />
				<div className="dial-start" style={{ background: startSemiCircle, transform: `${center} ${toEdge}` }}></div>
				<div
					className="dial-end"
					style={{ background: endColor, transform: `${center} rotate(${angle}deg) ${toEdge}` }}
					onMouseDown={handleDown}
				></div>
			</div>
		</>
	);
};

export default Dial;
