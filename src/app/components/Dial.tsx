import * as React from "react";
import { Color, darken, HSL } from "../util/color";
import "./Dial.css";

export function clamp(min: number, max: number, value: number) {
	if (value > max) return max;
	if (value < min) return min;
	return value;
}


export function conicGradient(degrees: number, baseColor: Color, backgroundColor: Color): string {
	const angle = clamp(-360, 360, degrees);
	if (angle > 0 || Object.is(+0, angle)/* we differentiate ±0 */) {
		// forwards
		return `conic-gradient(${backgroundColor} 0deg, ${darken(baseColor, angle)} 0deg, ${baseColor} ${angle}deg, ${backgroundColor} ${angle}deg)`;
	} else {
		// backwards
		const backAngle = angle + 360;
		return `conic-gradient(${backgroundColor} ${backAngle}deg, ${baseColor} ${backAngle}deg, ${darken(baseColor, angle)} 360deg, ${backgroundColor} 360deg)`;
	}
}

function animate(
	time: number,
	callback: (t01: number) => void,
	easing: (x: number) => number = (x) => x // linear
) {
	let lastTimestamp = 0;
	let cumMs = 0

	function loop(timestamp: DOMHighResTimeStamp) {
		if (lastTimestamp == 0) {
			lastTimestamp = timestamp;
			return requestAnimationFrame(loop);
		}

		const ms = timestamp - lastTimestamp;
		cumMs += ms;
		const t01 = Math.min(cumMs / time, 1);
		const tEval = easing(t01);

		callback(tEval);

		if (cumMs > time) return;
		lastTimestamp = timestamp;
		requestAnimationFrame(loop);
	}
	loop(0);
}

const Dial: React.FunctionComponent<{}> = () => {
	const dialState = React.useRef({ isDown: false, lastAngle: 0, enabled: true });
	const [angle, setAngle] = React.useState(0);

	const handleDown = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();
		if (dialState.current.enabled) {
			dialState.current.isDown = true;
		}
	}
	const handleUp = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();
		if (!dialState.current.isDown) return;

		dialState.current.isDown = false;
		dialState.current.enabled = false;

		animate(
			1200,
			(t01) => {
				const newAngle = dialState.current.lastAngle * (1 - t01);
				setAngle(newAngle);
				if (t01 > 0.999) {
					dialState.current.enabled = true;
					dialState.current.lastAngle = 0;
				}
			},
			(x) => 1 - Math.pow((x - 1), 4)
		)
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


	function setupEventListeners() {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleUp);
	}
	function cleanupEventListeners() {
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleUp);
	}
	React.useEffect(() => {
		setupEventListeners();
		return cleanupEventListeners;
	}, []);

	const backgroundColor = "white";
	// const color = new HSL(208, 64, 57);
	const color = new HSL(0, 53, 58);

	const center = "translate(-50%, -50%)";
	const toEdge = "translateY(-200px)";
	let startSemiCircle = angle > 0
		? `linear-gradient(90deg, ${darken(color, angle)} 50%, transparent 50%)`
		: `linear-gradient(270deg, ${darken(color, angle)} 50%, transparent 50% )`;

	return (
		<>
			<div className="dial" style={{ background: conicGradient(angle, color, backgroundColor) }}>
				<div className="dial-cover" />
				<div className="dial-start" style={{ background: startSemiCircle, transform: `${center} ${toEdge}` }}></div>
				<div
					className="dial-end"
					style={{ background: color.toString(), transform: `${center} rotate(${angle}deg) ${toEdge}` }}
					onMouseDown={handleDown}
				></div>
			</div>
		</>
	);
};

export default Dial;
