import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2'

import showCase1 from "../assets/assets/img/bg-showcase-1.jpg";
import showCase2 from "../assets/assets/img/bg-showcase-2.jpg";
import showCase3 from "../assets/assets/img/bg-showcase-3.jpg";

function Home() {
    const [email, setEmail] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_ROOT + "leads/", {
            email,
        })
            .then(res => {
                Swal.fire({
                    title: "Success!",
                    text: "Thank you for subscribing to our updates!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => setEmail(""));
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    title: "Oops...",
                    text: "Something went wrong.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            })
    }

    function EmailForm({ handleSubmit, handleChange, email }) {
        return (
            <form className="form-subscribe" id="contactForm" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <input className="form-control form-control-lg" id="emailAddress" type="email" placeholder="Email Address" required value={email} onChange={handleChange} />
                    </div>
                    <div className="col-auto"><button className="btn btn-primary btn-lg" id="submitButton" type="submit">Submit</button></div>
                </div>
            </form>
        );
    }

    return (
        <>
            <header className="masthead">
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="text-center text-white">
                                <h1>giyera.io</h1>
                                <h3>A strategic game of warfare and deception.</h3>
                                <p className="lead">Get updates by signing up for our newsletter below:</p>
                                <EmailForm handleSubmit={handleSubmit} handleChange={e => setEmail(e.target.value)} email={email} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="features-icons bg-light text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="bi-layers m-auto text-primary"></i></div>
                                <h3>Classic Strategy</h3>
                                <p className="lead mb-0">
                                    <strong>Giyera</strong> is a game of strategic deduction. Unlike Chess, you won't be memorizing 15-move variations in the opening to get an advantage.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="bi-ladder m-auto text-primary"></i></div>
                                <h3>Matchmaking</h3>
                                <p className="lead mb-0">
                                    Get a provisional rating after 10 games, and climb the upper echelons of the ladder for glory.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="bi-trophy m-auto text-primary"></i></div>
                                <h3>Tournaments</h3>
                                <p className="lead mb-0">
                                    You think you got what it takes? Compete on our automated tournaments and get the chance to win rewards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="showcase">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{ backgroundImage: `url(${showCase1})` }}></div>
                        <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                            <h2>Know your Pieces</h2>
                            <p className="lead mb-0">
                                Giyera uses a simple ranking system for its pieces. Turn on <u>Number Mode</u> to easily see a piece's strength value.
                            </p>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-lg-6 text-white showcase-img" style={{ backgroundImage: `url(${showCase2})` }}></div>
                        <div className="col-lg-6 my-auto showcase-text">
                            <h2>Deploy your Army</h2>
                            <p className="lead mb-0">
                                There's no predefined setup in Giyera &mdash; each game is an opportunity to mix things up. Like a certain setup? <u>Save it</u> and use it for your next battles.
                            </p>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{ backgroundImage: `url(${showCase3})` }}></div>
                        <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                            <h2>Execute your Strategy</h2>
                            <p className="lead">
                                Feel like <u>blitzing</u> your Flag across the board for a quick win? Maybe a <u>balanced setup</u> is what you prefer. How about <u>masquerading</u> a low-ranking piece as a Spy?  <br />
                            </p>
                            <p className="lead mb-0">
                                Your imagination is the limit on what is possible in the battlefield.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-light" style={{ height: "10vh" }}></section>
            <section className="call-to-action text-white text-center" id="signup">
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <h2 className="mb-4">Ready to join the war?</h2>
                            <EmailForm handleSubmit={handleSubmit} handleChange={e => setEmail(e.target.value)} email={email} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;