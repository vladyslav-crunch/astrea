import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";
import {BUTTON_TYPE_CLASSES} from "../ui/button.tsx";
import styles from "./sign-form.module.css";
import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {SignInFormFields, signInSchema} from "astrea-shared";
import {zodResolver} from "@hookform/resolvers/zod";
import Spinner from "../ui/spinner.tsx";
import {useUser} from "../../context/user-context.tsx";

function SignInForm() {
    const {signIn} = useUser()
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError
    } = useForm<SignInFormFields>({resolver: zodResolver(signInSchema)});

    const onSubmit: SubmitHandler<SignInFormFields> = async (formData) => {
        try {
            await signIn(formData);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong";
            setError("root", {
                type: "manual",
                message,
            });
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.formTitle}>Sign in</h2>
            <Input {...register("email")} type="text" label="Email" placeholder="Email" icon="email"
                   error={errors.email?.message}/>
            <Input {...register("password")} type="password" label="Password" placeholder="Password" icon="password"
                   error={errors.password?.message} hint="Forget password?"
                   onHintClick={() => alert("This function is not ready yet")}/>
            {errors.root && <p className={styles.formErrorMessage}>{errors.root.message}</p>}
            <div className={styles.formButtons}>
                <Button buttonType={BUTTON_TYPE_CLASSES.purple} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner/> : "Sign in"}
                </Button>
                <Button onClick={() => alert("Will be soon")} type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}>Google</Button>
            </div>
            <p className={styles.formHelper}>Don’t have an account? <Link to="/auth/sign-up">Sign up</Link></p>
        </form>
    );
}

export default SignInForm;
