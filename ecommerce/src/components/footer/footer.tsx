import styles from "@/utils/saas/footer.module.scss";
import {
  faFacebook,
  faFacebookSquare,
  faInstagram,
  faInstagramSquare,
  faSquareXTwitter,
  faTwitter,
  faWhatsapp,
  faWhatsappSquare,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OneLink from "../navbar/oneLink";
import { title } from "process";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerHeader}>
        <h4>Shop Now</h4>
        {/*  eslint-disable-next-line react/no-unescaped-entities */}
        <span>Let's Shop Together</span>
      </div>
      <div className={styles.footerLinks}>
        <div className={styles.aboutCompany}>
          <p>About</p>
          <OneLink oneLink={{ title: "About", route: "" }} />
          <OneLink oneLink={{ title: "Blogs", route: "" }} />
          <OneLink oneLink={{ title: "Products", route: "" }} />
          <OneLink oneLink={{ title: "Contact Us", route: "" }} />
          <OneLink oneLink={{ title: "Our Company", route: "" }} />
        </div>
        <div className={styles.information}>
          <p>Delivery Information</p>
          <OneLink oneLink={{ title: "Return", route: "" }} />
          <OneLink oneLink={{ title: "Privacy Policy", route: "" }} />
          <OneLink oneLink={{ title: "Terms & Conditions", route: "" }} />
          <OneLink oneLink={{ title: "Delivery Information", route: "" }} />
        </div>
        <div className={styles.FAQ}>
          <p>Other products by developer</p>
          <OneLink oneLink={{ title: "FAQ", route: "" }} />
          <OneLink oneLink={{ title: "Help", route: "" }} />
          <OneLink oneLink={{ title: "Checkout", route: "" }} />
        </div>
      </div>
      <hr className={styles.divider} />

      <div className={styles.footerLinks}>
        <div className={styles.information}>
          {/* <p>Other Projects</p> */}
          <OneLink
            oneLink={{
              title: "Be Anonymous",
              route: "https://be-anonymouse.vercel.app/dashboard",
            }}
          />
          <OneLink
            oneLink={{
              title: "Guess the Number",
              route: "https://guess-the-number-tau-nine.vercel.app/",
            }}
          />
        </div>
        <div className={styles.FAQ}>
          {/* <p></p> */}
          <OneLink
            oneLink={{
              title: "Portfolio",
              route: "https://umer-far-ooq-portfolio.vercel.app/",
            }}
          />
          {/* <OneLink oneLink={{ title: "Checkout", route: "" }} /> */}
        </div>
        <div>
          <OneLink
            oneLink={{
              title: "Expanse Tracker",
              route: "https://expense-tracker-green-phi.vercel.app/summary",
            }}
          />
        </div>{" "}
        <div></div>
      </div>
      <div className={styles.footerSocials}>
        <div className={styles.socialLinks}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faInstagram}
            size="xl"
          />
          <FontAwesomeIcon
            className={styles.icon}
            icon={faFacebook}
            size="xl"
          />
          <FontAwesomeIcon
            className={styles.icon}
            icon={faWhatsapp}
            size="xl"
          />
          <FontAwesomeIcon className={styles.icon} icon={faTwitter} size="xl" />
        </div>
        <p>© 2024 All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
