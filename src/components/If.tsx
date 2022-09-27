interface IfProps {
  children: JSX.Element | JSX.Element[];
  condition: boolean;
}

const If = ({ children, condition }: IfProps): JSX.Element =>
  condition ? <div>{children}</div> : <div></div>;

export default If;
