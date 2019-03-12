import React from 'react';

export default function authorizationErrorHandle (error) {

    let errorMessage;

    if (error.apierror && error.apierror.status === 'UNAUTHORIZED') {
        errorMessage = <p className="error-text">{error.apierror.message}</p>
    }

    return errorMessage;
}