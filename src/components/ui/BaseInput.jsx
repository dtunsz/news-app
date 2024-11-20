const BaseInput = ({ ...props }) => {

    return (
        <>
            {/* <div className="input_wrapp">
                <div className='input_container'>
                    {props.icon &&
                        <div className="input_icon">
                            {props.icon}
                        </div>
                    }

                    <input
                        type={props.type || "text"}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        name={props.name}
                    />

                </div>
            </div> */}
            <input
                type={props.type || "text"}
                placeholder={props.placeholder}
                className={props.className}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
            />
        </>
    )
}


export default BaseInput;