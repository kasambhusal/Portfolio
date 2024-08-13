import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTypewriter, Cursor } from 'react-simple-typewriter';


export default function Main() {

    const [top, setTop] = useState(5 + 'vh');
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const Wback = (e) => {
        const Top = e.target.offsetTop;
        console.log(Top + "px");
        setTop(Top);
    };

    const [welcome] = useTypewriter({
        words: ['Welcome to my Portfolio Website', 'Thanks for getting interested in my identity.'],
        loop: false,
        typeSpeed: 100
    });

    const [am] = useTypewriter({
        words: ['Frontend developer', 'Student', 'Tech lover', 'Jetho bhusal'],
        loop: false,
        typeSpeed: 100,
    });

    const section1 = useRef();
    const section2 = useRef();
    const section3 = useRef();
    const section4 = useRef();
    const section5 = useRef();

    const scroll = (elmRef) => {
        window.scrollTo({ top: elmRef.current.offsetTop, behavior: 'smooth' });
    };

    const handleClick = (e, sectionRef) => {
        Wback(e);
        scroll(sectionRef);
    };
    const [rotate, setRotate] = useState(false);
    const box = document.querySelector('.A_box');
    const Rotate = () => {
        setRotate(!rotate);

        (rotate ? (box.style.height = '8vh') : (box.style.height = 'auto'))
        console.log('clicked')
    }

    return (
        <div className='All'>
            <div className="nav">
                <ul>
                    <li className='li' onClick={(e) => handleClick(e, section1)}>
                        <img className='Nlogo' src='https://cdn-icons-png.flaticon.com/128/263/263115.png' alt='home' />
                    </li>
                    <li className='li' onClick={(e) => handleClick(e, section2)}>
                        <img className='Nlogo' src='https://cdn-icons-png.flaticon.com/128/3/3729.png' alt='about' />
                    </li>
                    <li className='li' onClick={(e) => handleClick(e, section3)}>
                        <img className='Nlogo' src='https://cdn-icons-png.flaticon.com/128/3135/3135722.png' alt='achievements' />
                    </li>
                    <li className='li' onClick={(e) => handleClick(e, section4)}>
                        <img className='Nlogo' src='https://cdn-icons-png.flaticon.com/128/3413/3413520.png' alt='lessons' />
                    </li>
                    <li className='li' onClick={(e) => handleClick(e, section5)}>
                        <img className='Nlogo' src='https://cdn-icons-png.flaticon.com/128/542/542638.png' alt='message' />
                    </li>
                </ul>
                <div className="Wback" style={{ top: `${top - 9}px` }}></div>
            </div>
            <div className='body'>
                <div className="home" ref={section1}>
                    <h1 className='logo'>Portfolio</h1>
                    <div className="welcome">
                        {welcome}
                        <span className="custom-cursor"><Cursor cursorStyle="." /></span>
                    </div>
                    <div className="identity">
                        <div className="photo"><img src='https://i.pinimg.com/736x/b2/ad/b9/b2adb9fdd313254effbc887d9e28e9ad.jpg' alt='myidentity' /></div>
                        <div className="write">
                            <p style={{ fontSize: '20px' }}>Hi myself kasam, all the way from Nepal.</p>
                            <h1 >I'm a <span style={{ color: 'red' }}>{am} <Cursor /></span></h1>
                        </div>
                    </div>
                    <div className="accounts">
                        <a href="https://www.facebook.com/kasam.bhusal.5" target='_blank' rel="noopener noreferrer"><img className='Alogo' src='https://cdn-icons-png.flaticon.com/512/2175/2175193.png' alt='fb' /></a>
                        <a href="https://www.facebook.com/kasam.bhusal.5"><img className='Alogo' src='https://www.svgrepo.com/show/364604/instagram-logo-fill.svg' alt='insta' /></a>
                        <a href="https://www.facebook.com/kasam.bhusal.5"><img className='Alogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7fj1vqat9XLO4cFwOG1uFqLXYDcISiYil2w&s' alt='insta' /></a>
                    </div>
                    <div style={{ minWidth: '94%' }} className='text-center'>
                        <h1 style={{ textAlign: 'center', margin: '20vh 0 7vh 0', color: 'green' }}>Hands-on Experience with</h1>
                        <div style={{ minWidth: '94%', display: 'flex', flexWrap: 'wrap', padding: '0 auto', gap: '100px' }}>
                            <span className='experience'> <img style={{ width: '100%', height: '100%' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEc9A_S6BPxCDRp5WjMFEfXrpCu1ya2OO-Lw&s" alt="experience_pic" /></span>
                            <span className='experience'> <img style={{ width: '100%', height: '100%' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png" alt="experience_pic" /></span>
                            <span className='experience'> <img style={{ width: '100%', height: '100%' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/768px-JavaScript-logo.png" alt="experience_pic" /></span>
                            <span className='experience'> <img style={{ width: '100%', height: '100%' }} src="https://static-00.iconduck.com/assets.00/react-original-wordmark-icon-840x1024-vhmauxp6.png" alt="experience_pic" /></span>
                        </div>
                    </div>
                </div>
                <div className="about" ref={section2}>
                    <h2 className='about_word'>About</h2>

                    <div className="family" data-aos="fade-left">
                        <div className="photo"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQydxymEfdGWjSfuX0aN9WXMHDSdC2gJw31YA&s' alt='f_photo' /></div>
                        <div className="f_write">
                            <div className="family_word">Family_background</div>
                            <h3>This is family background</h3>
                        </div>
                    </div>
                    <div className="academic" data-aos="fade-right">
                        <div className="a_write">
                            <div className="academic_word">Academic background</div>
                            <h3>This is academic background</h3>
                        </div>
                        <div className="photo"><img src='https://t4.ftcdn.net/jpg/01/66/55/01/360_F_166550191_hEVqAvFjIbRMZNDTaBoi0j7fX7ynPS5x.jpg' alt='a_photo' /></div>
                    </div>
                </div>
                <div className="achievements" ref={section3}>
                    <h2 className='about_word'>Achievements</h2>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px 0' }}>

                        <div className='A_box' style={{ overflowY: 'hidden', width: '80%', height: '8vh', border: '2px solid black', borderRadius: '30px', transition: 'height 1s ease' }}>
                            <div style={{ alignItems: 'center', display: 'flex', height: '8vh', width: '100%' }}>
                                <span style={{ width: '95%' }}>
                                    <h2 style={{ padding: '0 15px' }}>
                                        In 10<sup>th</sup> Vacation, I had joined in 3 months Intership program.
                                    </h2>
                                </span>
                                <ion-icon style={{ cursor: 'pointer' }} size="large" name="caret-down-outline" onClick={Rotate}></ion-icon>
                            </div>
                            <div style={{ padding: '20px' }}>

                                <h3>This is extra.dfjio Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolore? Sit sunt temporibus exercitationem nihil laboriosam eaque quaerat et officia expedita aliquam deserunt dignissimos sapiente a, incidunt accusantium. Possimus, aspernatur?</h3>

                            </div>
                        </div>


                        <div className='A_box' style={{ overflowY: 'hidden', width: '80%', height: '8vh', border: '2px solid black', borderRadius: '30px', transition: 'height 1s ease' }}>
                            <div style={{ alignItems: 'center', display: 'flex', height: '8vh', width: '100%' }}>
                                <span style={{ width: '95%' }}>
                                    <h2 style={{ padding: '0 15px' }}>
                                        In 11<sup>th</sup> Vacation, I had build a website for student use.
                                    </h2>
                                </span>
                                <ion-icon style={{ cursor: 'pointer' }} size="large" name="caret-down-outline" onClick={Rotate}></ion-icon>
                            </div>
                            <div style={{ padding: '20px' }}>

                                <h3>This is extra.dfjio Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolore? Sit sunt temporibus exercitationem nihil laboriosam eaque quaerat et officia expedita aliquam deserunt dignissimos sapiente a, incidunt accusantium. Possimus, aspernatur?</h3>

                            </div>
                        </div>


                        <div className='A_box' style={{ overflowY: 'hidden', width: '80%', height: '8vh', border: '2px solid black', borderRadius: '30px', transition: 'height 1s ease' }}>
                            <div style={{ alignItems: 'center', display: 'flex', height: '8vh', width: '100%' }}>
                                <span style={{ width: '95%' }}>
                                    <h2 style={{ padding: '0 15px' }}>
                                        After 12<sup>th</sup> examination, I had joined in 6 months Intership program.
                                    </h2>
                                </span>
                                <ion-icon style={{ cursor: 'pointer' }} size="large" name="caret-down-outline" onClick={Rotate}></ion-icon>
                            </div>
                            <div style={{ padding: '20px' }}>

                                <h3>This is extra.dfjio Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolore? Sit sunt temporibus exercitationem nihil laboriosam eaque quaerat et officia expedita aliquam deserunt dignissimos sapiente a, incidunt accusantium. Possimus, aspernatur?</h3>

                            </div>
                        </div>

                    </div>





                </div>
                <div className="lessons" ref={section4}>
                    <h2 className='about_word'>Lessons</h2>
                </div>
                <div className="message" ref={section5}>
                    <h2 className='about_word'>This is the place for message.</h2>
                </div>
            </div>
        </div>
    );
}
