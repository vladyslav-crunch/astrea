import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";
import {BUTTON_TYPE_CLASSES} from "../ui/button.tsx";
import styles from "./sign-in-form.module.css"
import {Link} from "react-router-dom";

function SignInForm() {
    return (
        <div className={styles.formContainer}>
            <h2 style={{color: "#44305E", fontSize: "42px"}}>Sign in</h2>
            <Input type={"email"} label={"Email"} placeholder={"Email"} icon={"email"}/>
            <Input type={"password"} label={"Password"} placeholder={"Password"} icon={"password"}
                   hint={"Forget password?"} onHintClick={() => alert("This function is not ready yet")}/>
            <Button onClick={() => alert("Sign in")} buttonType={BUTTON_TYPE_CLASSES.purple}>Sign in</Button>
            <Button onClick={() => alert("Will be soon")} buttonType={BUTTON_TYPE_CLASSES.google}>Google</Button>
            <p className={styles.formHelper}>Don’t have an account? <Link to="/auth/sign-up">Sign up</Link></p>
        </div>
    );
}

export default SignInForm;