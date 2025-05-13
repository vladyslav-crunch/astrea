// hooks/useAuth.ts
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    signIn as signInRequest,
    signUp as signUpRequest,
    refreshSession,
    signOut as signOutRequest,
} from "../api/auth";
import {RefreshResponse} from "../api/auth";


export const useSession = () => {
    const {data, error, isSuccess, isLoading} = useQuery<RefreshResponse, Error>({
        queryKey: ['session'],
        queryFn: refreshSession,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    if (error) {
        localStorage.removeItem('accessToken');
    }
    return {data, error, isSuccess, isLoading};
};


export const useSignIn = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: signInRequest,
        onSuccess: ({user, accessToken}) => {
            localStorage.setItem("accessToken", accessToken);
            queryClient.setQueryData(["session"], {user, accessToken});
        },
    });
};

export const useSignUp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: signUpRequest,
        onSuccess: ({user, accessToken}) => {
            localStorage.setItem("accessToken", accessToken);
            queryClient.setQueryData(["session"], {user, accessToken});
        },
    });
};

export const useSignOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: signOutRequest,
        onSuccess: () => {
            localStorage.removeItem("accessToken");
            queryClient.removeQueries({queryKey: ["session"]});
        },
    });
};
