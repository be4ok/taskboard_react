
export const authorizationErrorHandle = error => {

    let errorMessage;

    if (error.apierror && error.apierror.status === 'UNAUTHORIZED') {
        errorMessage = error.apierror.message
    }

    return errorMessage;
};