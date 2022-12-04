import React from 'react';
import './Headline.css';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@material-ui/icons';

function Headline({headline, title}) {
    return (
        <div className="headline">
            <div className="headline__left">
                {headline}
            </div>
            <div className="headline__right">
                <Link to="/"><HomeOutlined/></Link>&nbsp;&nbsp;/&nbsp;&nbsp;{title}
            </div>
        </div>
    )
}

export default Headline;


