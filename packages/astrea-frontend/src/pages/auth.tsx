import SignInForm from "../components/auth/sign-in-form.tsx";
import styles from "./auth.module.css";
import SignUpForm from "../components/auth/sign-up-form.tsx";

type AuthProps = {
    type: 'sign-in' | 'sign-up';
};

function Auth({type}: AuthProps) {
    return (
        <div className={styles.authContainer}>
            <div className={styles.circle + " " + styles.circleTl}/>
            <div className={styles.circle + " " + styles.circleBr}/>
            <div className={styles.circle + " " + styles.circleTr}/>
            {type === "sign-up" ? <SignUpForm/> : <SignInForm/>}
            <img className={styles.authPicture} src="/assets/astrea-god.png" alt="astrea god picutre"/>
        </div>
    );
}

export default Auth;