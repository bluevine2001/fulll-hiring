interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  id?: string;
}

const Toggle = ({ checked, onChange, label, id = "toggle" }: ToggleProps) => {
  return (
    <label className="toggle-label" htmlFor={id}>
      <input
        type="checkbox"
        role="switch"
        id={id}
        className="toggle-input"
        checked={checked}
        onChange={onChange}
      />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      {label && <span className="toggle-text">{label}</span>}
    </label>
  );
};

export default Toggle;
