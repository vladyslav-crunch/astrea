import Input from "../../ui/common/input/input.tsx";
import Button, {BUTTON_COLOR} from "../../ui/common/button/button.tsx";
import {BUTTON_VARIANT} from "../../ui/common/button/button.tsx";
import styles from "./sign-form.module.css"
import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {SignUpFormFields, signUpSchema} from "astrea-shared";
import {zodResolver} from "@hookform/resolvers/zod";
import Spinner from "../../ui/common/spinner/spinner.tsx";
import {useSignUp} from "../../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

function SignInForm() {
    const {mutateAsync: signUp} = useSignUp();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError
    } = useForm<SignUpFormFields>({resolver: zodResolver(signUpSchema)});

    const onSubmit: SubmitHandler<SignUpFormFields> = async (formData) => {
        try {
            await signUp(formData);
            navigate("/")
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong";
            setError("root", {
                type: "manual",
                message: message,
            });
        }
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.formTitle}>Sign Up</h2>
            <Input {...register("username")} type={"text"} label={"Username"} placeholder={"Username"} icon={"username"}
                   error={errors.username?.message}/>
            <Input {...register("email")} type={"text"} label={"Email"} placeholder={"Email"} icon={"email"}
                   error={errors.email?.message}/>
            <Input {...register("password")} type={"password"} label={"Password"} placeholder={"Password"}
                   error={errors.password?.message}
                   icon={"password"}/>
            <Input {...register("repeatPassword")} type={"password"} label={"Repeat password"}
                   placeholder={"Repeat Password"}
                   error={errors.repeatPassword?.message}
                   icon={"password"}/>

            {errors.root && (<p className={styles.formErrorMessage}>{errors.root.message}</p>)}
            <div className={styles.formButtons}>
                <Button buttonType={BUTTON_VARIANT.base} type={"submit"}
                        disabled={isSubmitting}>{isSubmitting ? <Spinner/> : "Sign up"}</Button>
                <Button onClick={() => alert("Will be soon")}
                        buttonColor={BUTTON_COLOR.google}>Google</Button>
            </div>
            <p className={styles.formHelper}>Already have an account? <Link to="/auth/sign-in">Sign in</Link></p>
        </form>
    );
}

export default SignInForm;