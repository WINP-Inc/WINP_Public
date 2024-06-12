import { useRouter } from "next/navigation";
import React, { useState } from "react";
import '../../../styles/landingPage.css'
import TxtRotate from "./TxtRotate";
import './TxtRotate.css';


const LandingPage = () => {
  const [emailInput, setEmailInput] = useState('');
  const router = useRouter();

  function handleNavigate(url: string) {
    router.push(url);
  }

  function selectChange(id: string): void {
    const select = document.getElementById(id) as HTMLSelectElement | null;
    const option = select?.options[select.selectedIndex];
    if (option) {
      select.style.backgroundImage = `url(${option.value})`;
    }
  }

  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <div className="header__container">
          <div className="header_top">
            <section className="loop03">
              <div className="loop03__box">
                <p className="loop03__item">BREAKING NEWS HERE</p>
                <p className="loop03__item">BREAKING NEWS HERE</p>
                <p className="loop03__item">BREAKING NEWS HERE</p>
                <p className="loop03__item">BREAKING NEWS HERE</p>
                <p className="loop03__item">BREAKING NEWS HERE</p>
                <p className="loop03__item">BREAKING NEWS HERE</p>
                <p className="loop03__item">BREAKING NEWS HERE</p>
                <p className="loop03__item">BREAKING NEWS HERE</p>
              </div>
            </section>
            <div className="lang">
              <select title="select-language" className="lang_pulldown imgSel" id="sel1" onLoad={() => selectChange('sel1')} onChange={() => selectChange('sel1')}>
                <option className="en_opt" value="/landingPage/img/uk_flag.png">EN</option>
                <option className="jp_opt" value="/landingPage/img/jp_flag.png">JP</option>
                <option className="kr_opt" value="/landingPage/img/kr_flag.png">KO</option>
              </select>
            </div>
          </div>
          <div className="header_bottom">
            <div className="logo">
              <a href="#"><img src="/landingPage/img/logo.png" alt="" /></a>
            </div>
            <div className="sign">
              <input className="signup" type="button" value="Sign Up" onClick={() => handleNavigate('/auth')} />
              <input className="login" type="button" value="Login" onClick={() => handleNavigate('/auth')} />
            </div>
          </div>
        </div>
      </header>

      <div className="mv">
        <img className="coin1" src="/landingPage/img/coin1.png" alt="" />
        <img className="coin2" src="/landingPage/img/coin2.png" alt="" />
        <img className="w" src="/landingPage/img/W.png" alt="" />
        <img className="star" src="/landingPage/img/star-img.png" alt="" />
        <div className="mv_txt">
          <h1>where is new<br />P<TxtRotate toRotate={['ersona', 'erspective', 'rosperity', 'eople']} period={30000} /></h1>
          <p>WINP find in the value of your prosperity <br />
            Create and share your new persona on WINP.</p>
          <input className="start" type="button" value="Get Started" onClick={() => handleNavigate('/auth')} />
        </div>
      </div>

      <div className="trust">
        <p>AS TRUSTED BY</p>
        <div className="loop02">
          <ul className="sponsered loop02__box">
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
          </ul>
          <ul className="sponsered loop02__box">
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
            <li className="loop02__item"><img className="bugcity" src="/landingPage/img/bugcity.png" alt="" /></li>
          </ul>
        </div>
      </div>

      <div className="phase">
        <div className="phase_box first">
          <h2><span>WIMP IS IN IT'S</span><br />INITIAL PHASE</h2>
          <div>
            <p>For the first, We recognize that Web3 can be challenging for the average person, so we've implemented
              all the features to make it easy for you to access Web3</p>
          </div>
        </div>
        <div className="phase_box">
          <div className="box_icon">
            <img src="/landingPage/img/boxIcon.svg" alt="" />
          </div>
          <div className="box_title">
            <p>AI Support</p>
          </div>
          <div className="box_txt">
            <p>The most crucial aspect of Web3 is investment. If you have any questions, feel free to ask anything
              to the LLM in the AI-Chart tab. Additionally, the values in the chart provide AI-learned predictive
              values rather than typical values.</p>
          </div>
          <div className="box_link">
            <a href="#">Learn more<img src="/landingPage/img/diag_arrow.png" alt="" /></a>
          </div>
        </div>
        <div className="phase_box">
          <div className="box_icon">
            <img src="/landingPage/img/certification-icon.svg" alt="" />
          </div>
          <div className="box_title">
            <p>TRADE TRANSIFICATION CERTIFICATION</p>
          </div>
          <div className="box_txt">
            <p>Don't fall for scammer information any longer. We distinguish between general information, verified
              posts, and user information. Talk about Web3 in a trusted community.</p>
          </div>
          <div className="box_link">
            <a href="#">Learn more<img src="/landingPage/img/diag_arrow.png" alt="" /></a>
          </div>
        </div>
        <div className="phase_box">
          <div className="box_icon">
            <img src="/landingPage/img/community-icon.svg" alt="" />
          </div>
          <div className="box_title">
            <p>OPEN COMMUNITY</p>
          </div>
          <div className="box_txt">
            <p>WINP is an open community that you can share your various value.You can share photo, NFT projects and
              evem Cryptocurrency. In addition, it provides various functions such as group voice talk and
              streaming.</p>
          </div>
          <div className="box_link">
            <a href="#">Learn more<img src="/landingPage/img/diag_arrow.png" alt="" /></a>
          </div>
        </div>
      </div>

      <div className="phase">
        <div className="phase_box first">
          <h2><span>FUTURE</span><br />ENHANCEMENT</h2>
          <div>
            <p>WINP believes that everything about you is genuinely valuable. For this, we are giving you a new
              persona and creating a platform where you can privately exchange information only with people you
              trust.</p>
          </div>
        </div>
        <div className="phase_box">
          <div className="box_icon">
            <img src="/landingPage/img/ticket-icon.svg" alt="" />
          </div>
          <div className="box_title">
            <p>Social investment</p>
          </div>
          <div className="box_txt">
            <p>You'll be immersed in a superior block ticket compared to <span className="text-blur">traditional subscriptions.Instead of being
              stuck with no other option after subscribing and finding no content, we'll provide you with the
              choice to sell subscription tickets. Of course, the price will continue to change through the market
              due to demand, so it won't be easy to cancel your subscription if you want to keep getting the
              latest information.</span></p>
          </div>
          <div className="box_link">
            <p>COMING SOON</p>
          </div>
        </div>
      </div>

      <div className="roadmap">
        <h2>ROADMAP</h2>
        <div className="roadmap_img">
          <img src="/landingPage/img/Group 163021.png" alt="" />
        </div>
      </div>

      <div className="value">
        <h2>VALUE DRIVEN ENJOYMENT</h2>
        <div className="value_box">
          <div className="value_img">
            <img src="/landingPage/img/section-enjoyment.png" alt="" />
          </div>
          <div className="value_txt">
            <p>"Value-driven Enjoyment" is what Winp pursues most. Winp not only provides reliable investment
              information in web3 but also shares and adds value to all your information and creations. Literally,
              give "value" to everything you have.</p>
            <p>Winp has a trustworthy community, utility features for everyone to enjoy, and special Web3
              capabilities. Now, enjoy a new community on Winp. Your enjoyment also brings value to you.</p>
            <input className="start" type="button" value="Learn More" />
          </div>
        </div>
      </div>

      <div className="sub">
        <div className="sub_left">
          <div className="sub_title">
            <h3>SUBSCRIBE FOR LATEST UPDATE</h3>
          </div>
          <div className="sub_txt">
            <p>Don't worry alone anymore! Get the latest news from WINP. Invest in Web3 assets for you in the new
              open community! WINP will grow with you!</p>
          </div>
        </div>
        <div className="sub_right">
          <div className="input_container">
            <input type="email" placeholder="Your email address" onChange={e => setEmailInput(e.target.value)} value={emailInput} />
          </div>
          <input className="start sub_btn" type="button" value="Subscribe" />
        </div>
        <img className="ellipses" src="/landingPage/img/ellipses.png" alt="" />
        <img className="star2" src="/landingPage/img/star2.png" alt="" />
        <img className="star3" src="/landingPage/img/star3.png" alt="" />
      </div>

      <footer>
        <div className="footer__container">
          <div className="column">
            <div className="footer_logo">
              <a href="#"><img src="/landingPage/img/logo.png" alt="" /></a>
            </div>
            <p className="gray-text">070-8567-3996</p>
            <p className="gray-text">admin@winp.io</p>
            <p className="gray-text">Second floor,1-chōme-6-1</p>
            <p className="gray-text">Ōtemachi,Chiyoda City</p>
          </div>
          <div className="column">
            <h2 className="column-heading">WINP</h2>
            <nav className="column-nav">
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link">Solution</a>
              <a href="#" className="nav-link">Vision</a>
              <a href="#" className="nav-link">Blog</a>
            </nav>
          </div>
          <div className="column">
            <h2 className="column-heading">SNS</h2>
            <div className="sns-icons">
              <a href="#"><img className="icon" src="/landingPage/img/discord.png" alt="" /></a>
              <a href="#"><img className="icon" src="/landingPage/img/discord.png" alt="" /></a>
              <a href="#"><img className="icon" src="/landingPage/img/discord.png" alt="" /></a>
              <a href="#"><img className="icon" src="/landingPage/img/discord.png" alt="" /></a>
            </div>
            <a href="#" className="privacy-policy">Privacy Policy</a>
          </div>
          <div className="column">
            <h2 className="column-heading">LANGUAGE</h2>
            <div className="language-icons">
              <a href="#" className="lang-link">
                <div className="lang_opt">
                  <img src="/landingPage/img/uk_flag.png" alt="アイコン1" />
                  <p className="lang-text">EN</p>
                </div>
              </a>
              <a href="#" className="lang-link">
                <div className="lang_opt">
                  <img src="/landingPage/img/jp_flag.png" alt="アイコン1" />
                  <p className="lang-text">JP</p>
                </div>
              </a>
              <a href="#" className="lang-link">
                <div className="lang_opt">
                  <img src="/landingPage/img/kr_flag.png" alt="アイコン1" />
                  <p className="lang-text">KO</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <img style={{ width: '12px' }} src="/landingPage/img/copyright.svg" alt="copyright" />
          <p>2023 WINP. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
