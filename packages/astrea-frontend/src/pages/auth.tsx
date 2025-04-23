import SignInForm from "../components/auth/sign-in-form.tsx";
import styles from "./auth.module.css";

type AuthProps = {
    type: 'sign-in' | 'sign-up';
};

function Auth({type}: AuthProps) {
    console.log(type)
    return (
        <div className={styles.authContainer}>
            {type === "sign-up" ? <div></div> : <SignInForm/>}
            <img className={styles.authPicture} src="/assets/astrea-god.png" alt="astrea god picutre"/>
        </div>
    );
}

export default Auth;