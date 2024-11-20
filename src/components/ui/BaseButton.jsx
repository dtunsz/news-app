const BaseButton = ({ ...props }) => {
  return (
    // <div className="my-3 rounded border border-black">
    // <div className="primary-btn">
    // </div>
    <button className="my-3 primary-btn" type={props.type || "button"} onClick={props.onClick} >{props.btnText}</button>
  )
}

export default BaseButton