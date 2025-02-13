export default function Buttons() {
    //customized button:
    return (
        <div>
            <p>Those are example of buttons:</p>
            <Button message="Hello World" text="Say H"/>
        </div>
    );
}

const Button = (props) => {
    return <button onClick={() => alert(props.message)}>{props.text}</button>
}