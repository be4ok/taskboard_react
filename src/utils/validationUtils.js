import React from 'react';

const validationUtils = (errors, targetField) => {

    const messageArray = [];

    if (errors.apierror && errors.apierror.message === 'Validation error') {

        const errorArr = errors.apierror.subErrors;

        errorArr.filter(item => item.field === targetField).map((error, i) => {
            messageArray.push(<p key={i} className="error-text">{error.message}</p>);
        });
    }

    return messageArray;

};

export default validationUtils