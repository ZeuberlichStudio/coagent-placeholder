import React from 'react';
import PlatformContext from '../../context/platform';
import './styles/item-pc.scss';
import './styles/item-mobile.scss';

const animationSegments = {
    mobile: [
        {
            start: [30, 94],
            end: [108, 162]
        },
        {
            start: [195, 260],
            end: [272, 328]
        },
        {
            start: [375, 440],
            end: [452, 508]
        }
    ],
    pc: [
        {
            start: [15, 98],
            end: [111, 185]
        },
        {
            start: [195, 278],
            end: [291, 365]
        },
        {
            start: [375, 458],
            end: [471, 545]
        }
    ]
}

function Nav({ items, triggerAnimation }) {
    return (
        <div className="menu">
            { items.map((item, i) => <Item {...{...item, triggerAnimation, key: i, i}}/> ) }
        </div>
    );
}

function Item({ title, subtitle, triggerAnimation, i }) {
    const platform = React.useContext(PlatformContext);

    const onMouseEnter = () => platform && triggerAnimation(animationSegments[platform][i].start);
    const onMouseLeave = () => platform && triggerAnimation(animationSegments[platform][i].end);

    return (
        <li className="menu-item" {...{ onMouseEnter, onMouseLeave }}>
            <h3>{title}</h3>
            <hr/>
            <span>{subtitle}</span>
        </li>
    )
}

export default Nav;