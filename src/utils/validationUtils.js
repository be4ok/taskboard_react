import React from 'react';

export const validationUtils = (errors, targetField) => {

    const messageArray = [];

    if (errors.apierror && errors.apierror.message === 'Validation error') {

        const errorArr = errors.apierror.subErrors;

        errorArr.filter(item => item.field === targetField).map((error, i) => {
            messageArray.push(<span key={i} className="error-text">{error.message}</span>);
        });
    }

    return messageArray;

};