import { BaseButton, GoogleSiginButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSiginButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = (props) => {
  const { children, buttonType, buttonProps } = props;

  const CustomButton = getButton(buttonType);

  return <CustomButton {...buttonProps}>{children}</CustomButton>;
};

export default Button;
