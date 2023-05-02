export default function Input(props) {
  return (
    <input
      value={props.value}
      onChange={(e) => props.onChange(e)}
      name={props.name}
    />
  );
}
