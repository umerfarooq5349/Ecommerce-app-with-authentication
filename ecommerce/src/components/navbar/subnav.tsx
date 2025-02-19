import React from "react";
import styles from "@/utils/saas/subNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

function SubNav() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <p>
          Follow Us on:{" "}
          <span>
            <FontAwesomeIcon
              icon={faInstagram}
              size="xl"
              className={styles.icon}
            />
            <FontAwesomeIcon
              icon={faFacebook}
              size="xl"
              className={styles.icon}
            />
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="xl"
              className={styles.icon}
            />
          </span>
        </p>
        <p>New Products are waiting for you</p>
        <p>
          Let them say <b>WOW</b>
        </p>
      </div>
    </div>
  );
}

export default SubNav;
