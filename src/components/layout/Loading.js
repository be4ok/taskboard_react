import React, {Component} from 'react';
import loading from '../../static/img/loading.svg'

export default function Loading () {
    return <div>
        <img src={loading} alt="Loading..." style={{
            display: 'block',
            width: '15%',
            margin: 'auto'
        }}/>
    </div>
}