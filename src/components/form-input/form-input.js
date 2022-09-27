import {FormInputLabel, Group, Input} from "./form-input.styles";

const FormInput = (props) => {
  const { label, inputOptions } = props;
  return (
    <Group>
      <Input className="form-input" {...inputOptions} />
      {label && (
        <FormInputLabel
          className={`${
            inputOptions.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
