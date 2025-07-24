import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Modal from "../../common/modal/modal.tsx";
import Input, {INPUT_OPTION_CLASSES} from "../../common/input/input.tsx";
import {GoalWithStats} from "astrea-shared/types/goal.type.ts";
import {UpdateGoalInput, updateGoalSchema} from "astrea-shared";
import {zodResolver} from "@hookform/resolvers/zod";
import styles from "./goal-edit-modal.module.css"
import Textarea, {TEXTAREA_OPTION_CLASSES} from "../../common/textarea/textarea.tsx";
import {useEffect} from "react";
import Select from "../../common/select/select.tsx";
import Button, {BUTTON_COLOR, BUTTON_VARIANT} from "../../common/button/button.tsx";
import {Trash} from "lucide-react";
import {useDeleteGoal, useUpdateGoal} from "../../../../hooks/useGoal.ts";

type GoadEditModalProps = {
    isOpen: boolean;
    onClose: () => void;
    goal: GoalWithStats;
};

function GoalEditModal({isOpen, onClose, goal}: GoadEditModalProps) {
    console.log("GoalEditModal", goal);
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        control
    } = useForm<UpdateGoalInput>({
        resolver: zodResolver(updateGoalSchema),
        defaultValues: {
            title: goal.title,
            description: goal.description,
            modifier: {
                easy: goal.modifier?.easy,
                medium: goal.modifier?.medium,
                hard: goal.modifier?.hard,
            }
        }
    });

    useEffect(() => {
        if (goal) {
            reset({
                title: goal.title || "",
                description: goal.description || "",
                topicId: goal.topicId ?? undefined,
                modifier: {
                    easy: goal.modifier?.easy ?? 1.15,
                    medium: goal.modifier?.medium ?? 1.15,
                    hard: goal.modifier?.hard ?? 1.15,
                }
            });
        }
    }, [goal, reset]);

    const optionsOfMultipliers = [
        {label: "x0.25", value: 0.25},
        {label: "x0.50", value: 0.5},
        {label: "x0.75", value: 0.75},
        {label: "x1 (default)", value: 1},
        {label: "x1.25", value: 1.25},
        {label: "x1.50", value: 1.5},
        {label: "x1.75", value: 1.75},
        {label: "x2.00", value: 2},
    ]

    const updateGoalMutation = useUpdateGoal(goal.topicId);
    const deleteGoalMutation = useDeleteGoal(goal.topicId);
    const onSubmit: SubmitHandler<UpdateGoalInput> = (data) => {
        console.log("click");
        updateGoalMutation.mutate(
            {
                goalId: goal._id,
                body: data,
            },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    const onDeleteGoal = () => {
        deleteGoalMutation.mutate(goal._id, {
            onSuccess: () => {
                onClose();
            }
        })
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Title>Edit Goal "{goal.title}"</Modal.Title>
            <Modal.Content>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.editGoalForm}>
                    <div className={styles.editGoalFormInformation}>
                        <h4>Information</h4>
                        <Input
                            {...register("title")}
                            option={INPUT_OPTION_CLASSES.modal}
                            placeholder="Enter goal title"
                            error={errors.title?.message}
                        />
                        <Textarea
                            {...register("description")}
                            option={TEXTAREA_OPTION_CLASSES.modal}
                            placeholder="Enter goal description"
                            error={errors.description?.message}
                        />
                    </div>
                    <div className={styles.editGoalFormAward}>
                        <h4>Reward multipliers</h4>
                        <Controller
                            control={control}
                            name="modifier.easy"
                            render={({field}) => (
                                <Select
                                    label="Easy"
                                    value={field.value!}
                                    onChange={field.onChange}
                                    options={optionsOfMultipliers}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="modifier.medium"
                            render={({field}) => (
                                <Select
                                    label="Mid"
                                    value={field.value!}
                                    onChange={field.onChange}
                                    options={optionsOfMultipliers}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="modifier.hard"
                            render={({field}) => (
                                <Select
                                    label="Hard"
                                    value={field.value!}
                                    onChange={field.onChange}
                                    options={optionsOfMultipliers}
                                />
                            )}
                        />
                    </div>
                </form>
            </Modal.Content>
            <Modal.Footer>
                <div className={styles.editGoalFooter}>
                    <Button buttonType={BUTTON_VARIANT.modal} buttonColor={BUTTON_COLOR.red}
                            style={{"maxWidth": "65px"}} onClick={onDeleteGoal} disabled={goal.isDefault}>
                        <Trash color={"#fff"} size={24}/>
                    </Button>
                    <Button buttonType={BUTTON_VARIANT.modal} style={{"width": "150px"}}
                            disabled={updateGoalMutation.isPending}
                            onClick={handleSubmit(onSubmit)}>{updateGoalMutation.isPending ? "Saving..." : "Edit"}</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default GoalEditModal;
