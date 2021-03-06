import React from 'react';
import './index.scss';
import './styles/slider-pc.scss';
import './styles/slider-mobile.scss';

export default function Slider({ children, loop = true, time = 300, id, slide, buttons = true }) {

    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [touchStartX, setTouchStartX] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);
    const { length: slideCount } = children;
    const containerRef = React.useRef();

    function invisibleGoTo(i) {
        setAnimating(false);
        setCurrentSlide(i);
    }
    
    function goToSlide(i) {
        if ( !loop && (i > slideCount - 1 ||  i < 0) ) return;

        if ( i > slideCount - 1 ) {
            !animating && setAnimating(true);
            setCurrentSlide(i);
            setTimeout( () => invisibleGoTo(0), time );
        } 
        else if ( i < 0 ) {
            !animating && setAnimating(true);
            setCurrentSlide(i);
            setTimeout( () => invisibleGoTo(slideCount - 1), time );
        }
        else {
            !animating && setAnimating(true);
            setCurrentSlide(i);
        }
    }

    React.useEffect(() => {
        if ( slide ) goToSlide(slide);
    }, [slide]);

    const containerStyle = {
        transition: animating ? `${time}ms` : null
    }

    const listeners = {
        onTouchStart: e => {
            setAnimating(false);
            setTouchStartX(e.touches[0].clientX);
        },
        onTouchMove: e => {
            const currentPoint = e.changedTouches[0].clientX;
            containerRef.current.style.setProperty( '--touchOffset', `${ currentPoint - touchStartX }px` );
        },
        onTouchEnd: e => {
            const currentPoint = e.changedTouches[0].clientX;
            const offset =currentPoint - touchStartX
            const direction = currentPoint - touchStartX > 0 ? -1 : 1;
            containerRef.current.style.setProperty( '--touchOffset', `0px` );
            if ( offset <= 40 && offset >= -40 ) return;
            goToSlide( currentSlide + direction );
        }
    }

    return (
        <div id={ id } className="slider" style={{ "--slide": currentSlide }}>
            { buttons && <button className="slider_prev" onClick={ () => goToSlide(currentSlide - 1) }/> }
            
            <div className="slider_slides-wrapper">
                <div ref={ containerRef } className="slider_slides-container" style={containerStyle} {...listeners}>
                    { 
                        children.slice(-2).map( (child, i, arr) => {
                            const number = slideCount - (arr.length - i);

                            return <Slide 
                                key={`clone-${ number }`} 
                                i={ number } 
                                clone={ true }
                            >
                                { child }
                            </Slide> 
                        }) 
                    }

                    { children.map( (child, i) => <Slide key={i} i={i}>{ child }</Slide> ) }

                    { 
                        children.slice(0, 2).map( (child, i) => 
                            <Slide key={`clone-${i}`} i={i} clone={ true }>
                                { child }
                            </Slide> 
                        ) 
                    }
                </div>
            </div>

            { buttons && <button className="slider_next" onClick={ () => goToSlide(currentSlide + 1) }/> }

            { buttons && <Indicator {...{slideCount, currentSlide, goToSlide}}/> }
        </div>
    );
}

export function Slide({ i, children, clone }) {
    return (
        <div className={`slide ${ clone ? 'clone-' : '' }slide-${i}`}>
            { children }
        </div>
    );
}

function Indicator({ slideCount, currentSlide, goToSlide }) {

    const [active, setActive] = React.useState(0);

    React.useEffect(() => {
        if ( currentSlide === active ) return;
        
        if ( currentSlide > slideCount - 1 ) setActive(0); 
        else if ( currentSlide < 0 ) setActive(slideCount - 1);
        else setActive(currentSlide);
    }, [currentSlide]);

    function renderDots() {
        const dots = [];

        for ( let i = 0; i < slideCount; i++ ) {
            dots.push(<span onClick={ () => goToSlide(i) } className={`dot ${ i === active ? 'active' : '' }`}/>);
        }

        return dots;
    }

    return (
        <div className="slider_indicator">
            { renderDots() }
        </div>
    );
}