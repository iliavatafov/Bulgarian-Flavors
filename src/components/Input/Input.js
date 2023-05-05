export const Input = ({
  type,
  id,
  label,
  reference,
  require,
  defaultVal,
  disable,
  placeHolder,
}) => {
  return (
    <div>
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        id={id}
        ref={reference}
        required={require}
        defaultValue={defaultVal && defaultVal}
        disabled={disable}
        placeholder={placeHolder}
      />
    </div>
  );
};
