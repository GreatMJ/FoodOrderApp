
const Button=({children, textOnly, className,...props})=>{

    // setting respective classes to make it reusable
    let cssClasses=textOnly?'text-button':'button';
    cssClasses+=' '+ className;

    return <button className={cssClasses} {...props}>
        {children}
    </button> ;
}


export default Button;