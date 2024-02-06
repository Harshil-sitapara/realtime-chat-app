import React, { useEffect } from 'react'
import "../../App.css"
import bg from '../../assets/landing/bg.png'
import bg1 from '../../assets/landing/bg-1.png'
import bg2 from '../../assets/landing/bg-2.png'
import Button from '../../components/Button'
import image1 from '../../assets/landing/chat_img-1.png'
import image2 from '../../assets/landing/chat_img-2.png'
import image3 from '../../assets/landing/chat_img-3.png'
import image4 from '../../assets/landing/chat_img-4.png'
import image5 from '../../assets/landing/chat_img-5.png'
import ChatMessagesImage from '../../assets/landing/5-chat-messages.png'
import Chat3MessagesImage from '../../assets/landing/chat-messages-3.png'
import Chat3MessagesImageShort from '../../assets/landing/chat-messages-3-short.png'
import ChatMessagesImage1 from '../../assets/landing/6-chat-messages.png'
import Chat3MessagesImage1 from '../../assets/landing/chat-messages-3-2.png'
import Chat3MessagesImage1Short from '../../assets/landing/chat-messages-3-2-short.png'
import speakFreely from '../../assets/landing/speak-freely.png'
import SayYouFeelInner from '../../assets/landing/say-you-feel-inner.png'
import SayYouFeelUpper from '../../assets/landing/say-you-feel-upper.png'
import Footer from './Footer'

export default function Landing() {
    useEffect(() => {
        const body = document.body;
        body.style.backgroundColor = "rgba(252, 245, 235, 0.8)"
    }, [])

    return (
        <>
            <div className="main-landing-container">
                <section className='main-hero'>
                    <img src={bg} alt="bg image" className='bg-image' />
                    <img src={bg2} alt="bg1 image" className='bg-image bg1-image' />
                    <div className="upper-container">
                        <div className="left-hero">
                            <h1 className='tracking-wide'>
                                Message privately
                            </h1>
                            <p className='pt-3'>Simple, reliable, private messaging and calling for free*, available all over the world.</p>
                            <div className='pt-4'><Button /></div>
                        </div>
                        <div className="right-hero">
                            <div className="right-images-main">
                                <img src={image1} className='chatUiImg1' data-aos="fade-up"
                                    data-aos-duration="800" alt="chat image 1" />
                                <img src={image2} className='chatUiImg2' data-aos="fade-up"
                                    data-aos-duration="1200" alt="chat image 2" />
                                <img src={image3} className='chatUiImg3' data-aos="fade-up"
                                    data-aos-duration="1800" alt="chat image 3" />
                                <img src={image4} className='chatUiImg4' data-aos="fade-up"
                                    data-aos-duration="2000" alt="chat image 4" />
                                <img src={image5} className='chatUiImg5' data-aos="fade-up"
                                    data-aos-duration="1200" alt="chat image 5" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='chat-messages-first container'>
                    <img src={ChatMessagesImage} alt="chat messages image" className='chatMessageImage1' data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom" />
                    <img src={Chat3MessagesImage} alt="chat messages image" className='chat3MessageImage1' data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom" />
                    <img src={Chat3MessagesImageShort} alt="chat messages image" className='chat3MessageImage1Short' data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom" />
                </section>
                <section className="center-para container py-3">
                    <h4>With private messaging and calling, you can be yourself, speak freely and feel close to the most important people in your life no matter where they are.</h4>
                </section>
                <section className='chat-messages-second container'>
                    <img src={ChatMessagesImage1} alt="chat messages image" className='chatMessageImage2' data-aos="fade-up" />
                    <img src={Chat3MessagesImage1} alt="chat messages image" className='chat3MessageImage2' data-aos="fade-up" data-aos-duration="1000" />
                    <img src={Chat3MessagesImage1Short} alt="chat messages image" className='chat3MessageImage2Short' data-aos="fade-up" data-aos-duration="1000" />
                    </section>
                {/*  */}
                <section className="speck-freely-main">
                    <div className="left-main" data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom">
                        <img src={speakFreely} alt="speak freely image" />
                    </div>
                    <div className="right-main" data-aos="fade-up">
                        <h1>Speak
                            <span><br />freely</span>
                        </h1>
                        <p>With end-to-end encryption, your personal messages and calls are secured. Only you and the person you're talking to can read or listen to them, and nobody in between, not even WhatsApp.</p>
                        <a href="/app" className='inline-block'><p>Learn more</p> </a>
                    </div>
                </section>
                {/*  */}
                <section className="say-you-feel-main container">
                    <div className="you-feel-left-main">
                        <div className="what-feel-images position-relative" data-aos="fade-up"
                            data-aos-anchor-placement="top-bottom" data-aos-duration="1000">
                            <img src={SayYouFeelUpper} alt="image1" className='position-absolute z-3 top-4 youFeelImage1' />
                            <img src={SayYouFeelInner} alt="image2" className='position-relative youFeelImage2' />
                        </div>
                    </div>
                    <div className="you-feel-right-main" data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom" data-aos-duration="1000">
                        <h1>Say what
                            <span><br />you feel</span>
                        </h1>
                        <p className='you-feel-desc pt-3'>Express yourself without words. Use stickers and GIFs or share everyday moments on Status. Record a voice message for a quick hello or a longer story.</p>
                        <a href="/app" className='inline-block'><p>Learn more</p> </a>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}