import * as React from "react";
import { animate } from "../util/animate";
import { Color, darken, HSL } from "../util/color";
import { getDegreesFromCenter, clamp, toSignedIntString } from "../util/math";
import "./Dial.css";

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

export function getEventCoords(e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent): [number, number] {
	if ('clientX' in e) {
		return [e.clientX, e.clientY];
	} else {
		return [e.touches[0].clientX, e.touches[0].clientY];
	}
}

const COUNTER_BLUR_Z = 100;
const COUNTER_FOCUS_Z = 101;
const COUNTER_END_Z = 102;
interface CounterProps {
	hasFocus: boolean;
	color: Color;
	backgroundColor: Color;
	angle: number;
	onDown: (e: React.MouseEvent | React.TouchEvent) => void;
}
const Counter: React.FC<CounterProps> = ({ hasFocus, color, backgroundColor, angle, onDown }) => {
	const clampedAngle = clamp(-360, 360, angle);
	const center = "translate(-50%, -50%)";
	const toEdge = "translateY(-35vmin)";
	const startSemiCircle = angle > 0
		? `linear-gradient(90deg, ${darken(color, angle)} 50%, transparent 50%)`
		: `linear-gradient(270deg, ${darken(color, angle)} 50%, transparent 50% )`;
	const extraAngle = angle > 360
		? angle - 360
		: angle < -360
			? angle + 360
			: 0;

	return (
		<div className="counter" style={{
			background: conicGradient(angle, color, backgroundColor),
			transform: `rotateZ(${extraAngle}deg)`,
			zIndex: hasFocus ? COUNTER_FOCUS_Z : COUNTER_BLUR_Z
		}} >
			<div className="start" style={{ background: startSemiCircle, transform: `${center} ${toEdge}` }}></div>
			<div
				className="end"
				style={{
					background: color.toString(),
					transform: `${center} rotate(${clampedAngle}deg) ${toEdge}`,
					zIndex: hasFocus ? COUNTER_END_Z : COUNTER_BLUR_Z
				}}
				onMouseDown={onDown}
				onTouchStart={onDown}
			></div>
		</div>
	)
}

const DEGREES2POINTS = 30;

export interface DialRef {
	total: number,
	prevTotal: number,
	isDown: boolean,
	startingAngle: number,
	lastAngle: number,
	enabled: boolean,
}
export const Dial: React.FC<{}> = () => {
	const dialState = React.useRef<DialRef>({ total: 0, prevTotal: 0, isDown: false, lastAngle: 0, enabled: true, startingAngle: 0 });
	const [angle, setAngle] = React.useState(0);

	const handleDown = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		if (e.cancelable) e.preventDefault();
		if (dialState.current.enabled) {
			dialState.current.isDown = true;
			dialState.current.startingAngle = getDegreesFromCenter(...getEventCoords(e));
		}
	}
	const handleUp = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		if (e.cancelable) e.preventDefault();
		if (!dialState.current.isDown) return;

		dialState.current.isDown = false;
		dialState.current.enabled = false;

		animate(
			1200,
			(t01) => {
				const { lastAngle, prevTotal } = dialState.current;
				const newAngle = lastAngle * (1 - t01);
				const points = Math.round(lastAngle * t01 / DEGREES2POINTS);
				const total = prevTotal + points;
				setAngle(newAngle);
				dialState.current.total = total;

				if (t01 === 1) {
					dialState.current.enabled = true;
					dialState.current.lastAngle = 0;
					dialState.current.prevTotal = total;
					setAngle(0);
				}
			},
			(x) => 1 - Math.pow((x - 1), 4)
		)
	}

	const handleMove = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		if (!dialState.current.isDown) return;
		if (e.cancelable) e.preventDefault();

		let angle = getDegreesFromCenter(...getEventCoords(e)) - dialState.current.startingAngle;
		while (Math.abs(dialState.current.lastAngle - angle) > 180) {
			angle += dialState.current.lastAngle > angle ? 360 : -360;
		}

		setAngle(angle);
		dialState.current.lastAngle = angle;
	}

	function setupEventListeners() {
		window.addEventListener('mousemove', handleMove);
		window.addEventListener('touchmove', handleMove);
		window.addEventListener('mouseup', handleUp);
		window.addEventListener('touchend', handleUp);
	}
	function cleanupEventListeners() {
		window.removeEventListener('mousemove', handleMove);
		window.removeEventListener('touchmove', handleMove);
		window.removeEventListener('mouseup', handleUp);
		window.removeEventListener('touchend', handleUp);
	}
	React.useEffect(() => {
		setupEventListeners();
		return cleanupEventListeners;
	}, []);

	const backgroundColor = '#eee';
	const color = new HSL(0, 53, 58);

	return (
		<main>
			<div style={{ color: color.toString() }}>{dialState.current.total}</div>
			<div className="dial">
				<Counter hasFocus onDown={handleDown} color={color} backgroundColor={backgroundColor} angle={angle} />
				<div className="dial-cover" style={{ color: color.toString() }}>
					{angle != 0 && toSignedIntString(angle / DEGREES2POINTS)}
				</div>
			</div>
		</main>
	);
};
