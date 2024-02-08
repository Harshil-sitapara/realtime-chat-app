import '../../App.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FooterLogo from '../../assets/footer-logo.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import Button, { FooterButton } from '../../components/Button';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start bg-body-tertiary text-muted">
                <div className="footer-main">
                    <section>
                        <div className="container text-center text-md-start py-10">
                            <div className="row">
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4 pb-4">
                                        <img src={FooterLogo} alt="footer logo" width={'60%'} />
                                    </h6>
                                    <FooterButton />
                                </div>
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 flex flex-col justify-between">
                                    <h6 className="text-uppercase fw-bold mb-4">
                                        Products
                                    </h6>
                                    <p>
                                        <a href="#" className="text-reset text-decoration-none">Angular</a>
                                    </p>
                                    <p>
                                        <a href="#" className="text-reset text-decoration-none">React</a>
                                    </p>
                                    <p>
                                        <a href="#" className="text-reset text-decoration-none">Vue</a>
                                    </p>
                                    <p>
                                        <a href="#" className="text-reset text-decoration-none">Laravel</a>
                                    </p>
                                </div>

                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 flex flex-col justify-between">
                                    <h6 className="text-uppercase fw-bold mb-4">
                                        Useful links
                                    </h6>
                                    <p>
                                        <a href="#" className="text-reset text-decoration-none">Pricing</a>
                                    </p>
                                    <p>
                                        <a href="#" className="text-reset text-decoration-none">Settings</a>
                                    </p>
                                    <p>
                                        <a href="#" className="text-reset text-decoration-none">Orders</a>
                                    </p>
                                    <p>
                                        <a href="#" className="text-reset text-decoration-none">Help</a>
                                    </p>
                                </div>
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 ">
                                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                    <p><LocationOnIcon /> New York, NY 10012, US</p>
                                    <p className='py-2'>
                                        <EmailIcon /> {"  "}
                                        info.quicktalk@gmail.com
                                    </p>
                                    <p><PhoneIcon /> + 01 234 567 88</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </footer>
        </>
    )
}
