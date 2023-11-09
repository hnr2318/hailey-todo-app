import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../generalStyles.css"

function RadioInput({
	name,
	handleInputState,
	label,
	options,
	required,
	...rest
}) {
	const handleChange = ({ currentTarget: input }) => {
		handleInputState(input);
	};

	return (
		<div className="vertSpace">
			<p>{label}</p>
			<RadioGroup {...rest} row name={name} onChange={handleChange}>
				{options && options.map((option, index) => (
					<FormControlLabel
						key={index}
						value={option}
						control={
							<Radio
								disableRipple
								style={{ color: "#1976d2", transform: "scale(1.2)" }}
							/>
						}
						label={option}
					/>
				))}
			</RadioGroup>
		</div>
	);
};

export default RadioInput;