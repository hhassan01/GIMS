import React from 'react';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';

export default function Popup(props)

{
	const {title, children, openPopup, setOpenPopup}= props;
	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div>Success!</div>
			</DialogTitle>
			<DialogContent>
				<div>You have successfully signed-in.</div>
			</DialogContent>
		</Dialog>
	)

}