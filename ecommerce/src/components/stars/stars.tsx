import {
  faStar,
  faStarHalfStroke,
  faStarOfDavid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@/utils/saas/stars.module.scss";

export const renderStars = (
  rating: number,
  isInteractive = false,
  onClick?: (rating: number) => void
) => {
  const clampedRating = Math.min(5, Math.max(0, rating));

  return Array.from({ length: 5 }).map((_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= Math.floor(clampedRating);
    const isHalf = !isFilled && clampedRating - index >= 0.5;

    return (
      <button
        key={index}
        type="button"
        className={isInteractive ? styles.starButton : ""}
        onMouseEnter={() => isInteractive && onClick?.(starValue)}
        onClick={() => isInteractive && onClick?.(starValue)}
      >
        <FontAwesomeIcon
          icon={isFilled ? faStar : isHalf ? faStarHalfStroke : faStarOfDavid}
          className={`${styles.starIcon} ${
            isInteractive ? styles.interactiveStar : ""
          }`}
        />
      </button>
    );
  });
};
