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
    const [prevInteraction, setPrevInteraction] = React.useState(null);

    return (
        <div className="menu">
            { items.map((item, i) => <Item {...{...item, triggerAnimation, key: i, i, prevInteraction, setPrevInteraction}}/> ) }
        </div>
    );
}

function Item({ title, subtitle, triggerAnimation, i, prevInteraction, setPrevInteraction }) {
    const platform = React.useContext(PlatformContext);

    const onMouseEnter = () => {
        if ( !platform ) return;
        if ( prevInteraction !== null ) {
            const segments = [
                animationSegments[platform][prevInteraction].end,
                animationSegments[platform][i].start
            ];
            triggerAnimation(segments);
            setPrevInteraction(i);
        } else {
            triggerAnimation([animationSegments[platform][i].start]);
            setPrevInteraction(i);
        }
    };
    const onMouseLeave = () => {
        if ( !platform ) return;
        triggerAnimation([animationSegments[platform][i].end]);
        setPrevInteraction(null);
    };

    return (
        <li className="menu-item" {...{ onMouseEnter, onMouseLeave }}>
            <h3>{title}</h3>
            <hr/>
            <span>{subtitle}</span>
        </li>
    )
}

export default Nav;