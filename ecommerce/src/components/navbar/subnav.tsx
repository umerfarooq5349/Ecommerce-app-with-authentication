import React from "react";
import styles from "@/utils/saas/subNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

function SubNav() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <p>
          Follow Us on:{" "}
          <span>
            <Link
              href="https://www.instagram.com/umer_faro_oq/"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="xl"
                className={styles.icon}
              />
            </Link>
            <Link
              href={"https://www.facebook.com/umer.farooq.5349/"}
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="xl"
                className={styles.icon}
              />
            </Link>

            <Link href={"https://wa.me/923014044102"} target="_blank">
              <FontAwesomeIcon
                icon={faWhatsapp}
                size="xl"
                className={styles.icon}
              />
            </Link>
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
