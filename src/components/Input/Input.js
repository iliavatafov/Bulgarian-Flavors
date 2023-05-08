import "./Input.css";

export const Input = ({
  type,
  id,
  label,
  reference,
  require,
  defaultVal,
  disable,
  placeHolder,
  name,
  icon,
}) => {
  return (
    <div>
      {icon && icon}
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        id={id}
        ref={reference}
        required={require}
        defaultValue={defaultVal && defaultVal}
        disabled={disable}
        placeholder={placeHolder}
        name={name}
      />
    </div>
  );
};
