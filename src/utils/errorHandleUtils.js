
export const notFoundErrorHandle = error => {

    let errorMessage;

    if (error.apierror && error.apierror.status === 'NOT_FOUND' && error.apierror.message !== 'Validation error') {
        errorMessage = error.apierror.message
    }

    return errorMessage;
};

export const badRequestErrorHandle = error => {

    let errorMessage;

    if (error.apierror && error.apierror.status === 'BAD_REQUEST' && error.apierror.message !== 'Validation error') {
        errorMessage = error.apierror.message
    }

    return errorMessage;
};

export const unsupportedMediaTypeErrorHandle = error => {

    let errorMessage;

    if (error.apierror && error.apierror.status === 'UNSUPPORTED_MEDIA_TYPE' && error.apierror.message !== 'Validation error') {
        errorMessage = error.apierror.message
    }

    return errorMessage;
};

export const allErrorsHandle = error => {

    let errorMessage;

    if (error.apierror && error.apierror.message !== 'Validation error') {
        errorMessage = error.apierror.message
    }

    return errorMessage;
};