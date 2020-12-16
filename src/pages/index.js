import React from 'react';
import './styles/index/index-pc.scss';
import './styles/index/index-mobile.scss';

import PlatformContext from '../context/platform';
import Menu from '../features/menu';
import Header from '../features/header';
import Footer from '../features/footer';
import Animation from '../features/animation';
import Slider from '../features/slider';

const menuItems = [
    {
        title: 'Мультимедиа',
        subtitle: 'Система с МТС ОС'
    },
    {
        title: 'Видеорегистратор',
        subtitle: 'С функцией облачного хранения данных'
    },
    {
        title: 'Смартфон',
        subtitle: ' Для удобного управления системами прямо с телефона'
    }
];

function IndexPage() {
    const [animSegment, setAnimSegment] = React.useState(null);

    function triggerAnimation(segment) {
        setAnimSegment(segment);
    }

    const [platform, setPlatform] = React.useState(null);

    function watchPlatform() {
        function determinePlatform() {
            if ( window.innerWidth >= 1024 ) setPlatform('pc');
            else setPlatform('mobile');
        }

        determinePlatform();
        window.addEventListener('resize', determinePlatform);
        return () => window.removeEventListener('resize', determinePlatform);
    }

    React.useEffect( watchPlatform, []);

    return (
        <PlatformContext.Provider value={platform}>
            <Header/>
            <aside>
                <Menu items={menuItems} triggerAnimation={triggerAnimation}/>
            </aside>
            <main>
                <Animation segment={animSegment}/>
                <div className="text-container">
                    <h2>преимущества</h2>
                    <Slider id="title-slider">
                        <p>Безопасность и комфорт в управлении системами авто во время вождения</p>
                        <p>Экономия времени и средств при использовании автомобиля</p>
                        <p>Уникальные функции и доступ к цифровым сервисам</p>
                    </Slider>
                </div>
            </main>
            <Footer/>
        </PlatformContext.Provider>
    );
}

export default IndexPage;