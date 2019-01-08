export const arrivalsSelect = theme => ({
	root: {
		display: "block",
	},
	date: {
		margin: "1.5%",
		width: "150px",
		[theme.breakpoints.up('md')]:{
			margin: "6%",
		},
	},
  	select: {
		display: "block",
		width: "97%",
		margin: "1.5%",
		[theme.breakpoints.up('sm')]:{
			display: "inline-block",
			margin: "1.5%",
			width: "37%"
		},
		[theme.breakpoints.up('md')]:{
			display: "inline-block",
			margin: "2%",
			width: "36%"
		}
	},
	button: {
		width: "17%",
		margin: "1.5%",
		[theme.breakpoints.up('sm')]:{
			display: "inline-block",
			width: "17%",
			margin: "1.5%",

		},
		[theme.breakpoints.up('md')]:{
			display: "inline-block",
			margin: "2%",
			width: "16%",
		}
	},
});

export const tableStyle = {
	tableWrapper: {
		overflowX: 'auto',
		margin: "1.5%",
 	},
	table: {
		minWidth: "600px",
	},
}