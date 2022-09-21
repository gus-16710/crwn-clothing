import "./button.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = (props) => {
  const { children, buttonType, buttonProps } = props;

  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
