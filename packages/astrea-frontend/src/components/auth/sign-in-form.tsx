import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";
import {BUTTON_TYPE_CLASSES} from "../ui/button.tsx";
import styles from "./sign-in-form.module.css"
import {Link} from "react-router-dom";

import {SubmitHandler, useForm} from "react-hook-form";
import {SignInFormFields, signInSchema} from "astrea-shared";
import {zodResolver} from "@hookform/resolvers/zod";

function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError
    } = useForm<SignInFormFields>({resolver: zodResolver(signInSchema)});

    const onSubmit: SubmitHandler<SignInFormFields> = async (formData) => {
        try {
            const response = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (!response.ok) {
                setError("root", {
                    type: "manual",
                    message: data.message || "Something went wrong",
                });
                return;
            }

            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.formTitle}>Sign in</h2>
            <Input {...register("email")} type={"text"} label={"Email"} placeholder={"Email"} icon={"email"}/>
            {errors.email && (<p>{errors.email.message}</p>)}
            <Input {...register("password")} type={"password"} label={"Password"} placeholder={"Password"}
                   icon={"password"}
                   hint={"Forget password?"} onHintClick={() => alert("This function is not ready yet")}/>
            {errors.password && (<p>{errors.password.message}</p>)}
            {errors.root && (<p>{errors.root.message}</p>)}
            <Button buttonType={BUTTON_TYPE_CLASSES.purple} type={"submit"}
                    disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Submit"}</Button>
            <Button onClick={() => alert("Will be soon")}
                    buttonType={BUTTON_TYPE_CLASSES.google}>Google</Button>
            <p className={styles.formHelper}>Don’t have an account? <Link to="/auth/sign-up">Sign up</Link></p>
        </form>
    );
}

export default SignInForm;