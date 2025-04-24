import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";
import {BUTTON_TYPE_CLASSES} from "../ui/button.tsx";
import styles from "./sign-form.module.css"
import {Link} from "react-router-dom";

import {SubmitHandler, useForm} from "react-hook-form";
import {SignUpFormFields, signUpSchema} from "astrea-shared";
import {zodResolver} from "@hookform/resolvers/zod";

function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError
    } = useForm<SignUpFormFields>({resolver: zodResolver(signUpSchema)});

    const onSubmit: SubmitHandler<SignUpFormFields> = async (formData) => {
        try {
            const response = await fetch("/api/auth/sign-up", {
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
                <Button buttonType={BUTTON_TYPE_CLASSES.purple} type={"submit"}
                        disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Sign up"}</Button>
                <Button onClick={() => alert("Will be soon")}
                        buttonType={BUTTON_TYPE_CLASSES.google} type={"button"}>Google</Button>
            </div>
            <p className={styles.formHelper}>Already have an account? <Link to="/auth/sign-in">Sign in</Link></p>
        </form>
    );
}

export default SignInForm;