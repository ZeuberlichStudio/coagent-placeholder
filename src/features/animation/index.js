import React from 'react';
import './styles/animation-pc.scss';
import './styles/animation-mobile.scss';
import illustartion from '../../assets/images/illustration.jpg';
import animationDataPc from '../../assets/json/animation-pc.json';
import animationDataMobile from '../../assets/json/animation-mobile.json';
import PlatformContext from '../../context/platform';
import lottie from 'lottie-web';

function Animation({ segment }) {
    const platform = React.useContext(PlatformContext);
    const [animation, setAnimation] = React.useState(null);

    function initAnimation() {
        destroyAnimation();

        const animation = lottie.loadAnimation({
            container: document.getElementById('animation'),
            animationData: platform === 'pc' ? animationDataPc : animationDataMobile,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            name: 'title'
        });

        setAnimation(animation);
    }

    function destroyAnimation() {
        if ( !animation ) return console.log('No animation set');
        animation.destroy();
    }

    React.useEffect(() => {
        if ( !platform ) return;
        initAnimation();
        return destroyAnimation;
    }, [platform]);

    React.useEffect(() => {
        if ( !animation || !segment ) return;
        animation.playSegments(segment, true);
    }, [segment]);

    return (
        <div className="animation-container">
            <div className="animation-wrapper">
                <div id="animation"></div>
            </div>
        </div>
    );
}

export default Animation;