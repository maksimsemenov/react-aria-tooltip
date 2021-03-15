import React from 'react'

import { useInteractionModality } from '@react-aria/interactions'
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip'
import { useTooltipTriggerState } from '@react-stately/tooltip'

import './Tooltip.css'

const InternalTooltip = ({ state, children, ...props }) => {
	const { tooltipProps } = useTooltip(props, state)

	return (
		<div clasName="tooltip" {...tooltipProps}>
			<span className="text">{children}</span>
		</div>
	)
}

const Tooltip = ({ children }) => {
	useInteractionModality()
	const targetRef = React.useRef()
	const tooltipState = useTooltipTriggerState()

	const { triggerProps, tooltipProps } = useTooltipTrigger(
		{},
		tooltipState,
		targetRef
	)

	return (
		<>
			<button ref={targetRef} {...triggerProps}>
				Button
			</button>
			{tooltipState.isOpen && (
				<InternalTooltip state={tooltipState} {...tooltipProps}>
					{children}
				</InternalTooltip>
			)}
		</>
	)
}

export { Tooltip }
