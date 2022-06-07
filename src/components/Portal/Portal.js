import ReactDOM from "react-dom";

export const Portal = (props) => {
  const node = document.createElement('div')
  document.body.appendChild(node)
  return ReactDOM.createPortal(props.children, node)
}