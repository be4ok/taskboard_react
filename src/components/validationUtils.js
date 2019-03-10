import React from 'react';

export default function validationUtils (validation, targetField) {

    const messageArray = [];

    if (validation.apierror && validation.apierror.message === 'Validation error') {

        const errorArr = validation.apierror.subErrors;

        errorArr.filter(item => item.field === targetField).map((error, i) => {
            messageArray.push(<p key={i} className="error-text">{error.message}</p>);
        });
    }

    return messageArray;

}