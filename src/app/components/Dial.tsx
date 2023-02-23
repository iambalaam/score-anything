import * as React from "react";
import { animate } from "../util/animate";
import { Color, HSL } from "../util/color";
import { getDegreesFromCenter, toAbsCeil, toAbsFloor, toAbsFloorSignedIntString } from "../util/math";
import { HapticValue } from "./HapticValue";

import { Counter } from './Counter';
import "./Dial.css";

export function getEventCoords(e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent): [number, number] {
	if ('clientX' in e) {
		return [e.clientX, e.clientY];
	} else {
		return [e.touches[0].clientX, e.touches[0].clientY];
	}
}

const DEGREES2POINTS = 30;
const DRAGGING_CLASS = 'dragging';

interface EventHandlerRef {
	hasFocus: number
	isDown: boolean,
	onDownAngle: number,
	onMoveAngle: number,
	onUpAngle: number,
	enabled: boolean,
	totals: number[],
	prevTotals: number[]
}
const initialHandlerRef = { hasFocus: -1, isDown: false, enabled: true, onUpAngle: 0, onDownAngle: 0, onMoveAngle: 0 };

export interface DialProps {
	counters: Array<{
		color: Color
		total: number
	}>,
	setCounter: (index: number, total: number) => void,
	backgroundColor: Color,
	trackColor: Color
}
export const Dial: React.FC<DialProps> = ({ backgroundColor, trackColor, counters, setCounter }) => {
	const totals = counters.map(({ total }) => total);
	const eventRef = React.useRef<EventHandlerRef>({ ...initialHandlerRef, totals, prevTotals: totals });
	const [angle, setAngle] = React.useState(0);
	const [hasFocus, setFocus] = React.useState(-1);

	// TODO: Calculate offsets
	const offsets = counters.map(({ color }) => {
		if (!(color instanceof HSL)) throw new Error('Color not HSL');
		return color.h - 45;
	})

	const handleDown = (index: number) => (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		if (e.cancelable) e.preventDefault();
		if (!eventRef.current.enabled) return;

		document.body.classList.add(DRAGGING_CLASS);
		const startAngle = getDegreesFromCenter(...getEventCoords(e));
		eventRef.current = {
			...eventRef.current,
			enabled: true,
			isDown: true,
			hasFocus: index,
			onDownAngle: startAngle,
			onMoveAngle: startAngle,
			onUpAngle: startAngle
		}
		setFocus(index);

	}
	const handleUp = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		if (e.cancelable) e.preventDefault();
		if (!eventRef.current.isDown) return;

		document.body.classList.remove(DRAGGING_CLASS);
		eventRef.current.isDown = false;
		eventRef.current.enabled = false;
		eventRef.current.prevTotals = [...totals];

		animate(
			1000,
			(t01) => {
				const i = eventRef.current.hasFocus;
				const deltaAngle = (eventRef.current.onUpAngle - eventRef.current.onDownAngle);
				const deltaPoints = deltaAngle / DEGREES2POINTS;
				const newAngle = deltaAngle * (1 - t01);
				const newPoints = toAbsFloor(deltaPoints) - toAbsFloor(deltaPoints * (1 - t01));
				const newTotal = eventRef.current.prevTotals[i] + newPoints;

				eventRef.current.totals[i] = newTotal;
				setAngle(newAngle);
				setCounter(i, newTotal);

				if (t01 === 1) {
					eventRef.current.enabled = true;
					eventRef.current.prevTotals[i] = eventRef.current.totals[i];
					setAngle(0);
					setFocus(-1);
				}
			},
			(x) => 1 - Math.pow((x - 1), 4)
		)
	}

	const handleMove = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
		if (!eventRef.current.isDown) return;
		if (e.cancelable) e.preventDefault();

		let newOnMoveAngle = getDegreesFromCenter(...getEventCoords(e));

		while (Math.abs(eventRef.current.onMoveAngle - newOnMoveAngle) > 180) {
			newOnMoveAngle += eventRef.current.onMoveAngle > newOnMoveAngle ? 360 : -360;
		}

		eventRef.current.onMoveAngle = newOnMoveAngle;
		eventRef.current.onUpAngle = newOnMoveAngle;
		setAngle(newOnMoveAngle - eventRef.current.onDownAngle);
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
		document.body.classList.remove(DRAGGING_CLASS);
	}
	React.useEffect(() => {
		setupEventListeners();
		return cleanupEventListeners;
	}, []);

	const currentColor = hasFocus !== -1
		? counters[hasFocus].color.toString()
		: 'transparent';

	return (
		<main>
			<div className="totals">
				{counters.map(({ color, total }, i) =>
					<span
						key={color.toString()}
						style={{ color: color.toString(), width: `${100 / counters.length}%` }}
					>
						{total}
					</span>
				)}
			</div>
			<div className="dial" style={{ backgroundColor: trackColor.toString() }}>
				{
					counters.map((counter, i) => hasFocus === i
						? <Counter
							key={counter.color.toString()}
							hasFocus={true}
							onDown={handleDown(i)}
							color={counter.color}
							angle={angle}
							offset={offsets[i]}
						/>
						: <Counter
							key={counter.color.toString()}
							hasFocus={false}
							onDown={handleDown(i)}
							color={counter.color}
							angle={0}
							offset={offsets[i]}
						/>
					)
				}

				<div className="dial--cover" style={{ color: currentColor, backgroundColor: backgroundColor.toString() }}>
					{angle != 0 && <HapticValue value={toAbsFloorSignedIntString(angle / DEGREES2POINTS)} />}
				</div>
			</div>
		</main>
	);
};
