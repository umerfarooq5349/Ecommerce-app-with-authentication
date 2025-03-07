"use client";

import { getItem } from "@/app/api/item";
import BikeAnimiation from "@/components/bikeAnimiation/bikeAnimiation";
import { alert } from "@/utils/alerts/alert";
import { api } from "@/utils/api response/apiRequest";
import styles from "@/utils/saas/productDetails.module.scss";
import { ProductType } from "@/utils/types/product.types";
import {
  ReviewModalType,
  ReviewType_GET,
  ReviewType_POST,
} from "@/utils/types/reviews.types";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeftLong,
  faCheckSquare,
  faMinus,
  faPlus,
  faCartArrowDown,
  faCashRegister,
  faStar,
  faStarHalfStroke,
  faCommentMedical,
} from "@fortawesome/free-solid-svg-icons";

import {
  faStar as faStarEmpty,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ProductDetailsPage = ({ params }: { params: { productID: number } }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [reviews, setReviews] = useState<ReviewType_GET[]>([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ReviewType_POST>({
    mode: "onChange",
  });

  const [reviewModal, setReviewModal] = useState<ReviewModalType>({
    isOpen: false,
    rating: 0,
    hoverRating: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const itemData = await getItem(params.productID);
        setProduct(itemData.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchProduct();
  }, [params.productID]);

  useEffect(() => {
    if (!product) return;
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `/api/reviews?itemId=${params.productID}`
        );
        setReviews(response.data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.error.message, 1500);
        }
      }
    };
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      const cartProduct = { ...product, quantity: cartQuantity };
      const response = await axios.post("/api/cart", { item: cartProduct });
      alert(response.data.message, 1500);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const handleOpenReview = () =>
    setReviewModal((prev) => ({ ...prev, isOpen: true }));
  const handleCloseReview = () =>
    setReviewModal((prev) => ({ ...prev, isOpen: false }));

  const handleSetRating = (rating: number) => {
    setReviewModal((prev) => ({ ...prev, rating }));
  };

  const handleHoverRating = (rating: number) => {
    setReviewModal((prev) => ({ ...prev, hoverRating: rating }));
  };

  const handleResetHover = () => {
    setReviewModal((prev) => ({ ...prev, hoverRating: 0 }));
  };

  const onSubmit: SubmitHandler<ReviewType_POST> = async (
    review: ReviewType_POST
  ) => {
    const itemId = params.productID;
    review = { ...review, itemId, rating: reviewModal.rating };

    try {
      const reviewResponse = await axios.post("/api/reviews", review);
      alert("Review posted", 1500);
      handleCloseReview();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error.message, 1500);
      }
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Link href="/total-items" className={styles.backLink}>
          <FontAwesomeIcon icon={faArrowLeftLong} size="xl" /> Back to list
        </Link>

        {product ? (
          <>
            <div className={styles.productDetailes}>
              <div className={styles.left}>
                <div className={styles.img}>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className={styles.thumbnail}
                  />
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.discount}>
                  Get {product.discountPercentage}% Off
                </div>
                <div className={styles.title}>
                  <h5>{product.title}</h5>
                  <p>{product.description}</p>
                </div>
                <div className={styles.itemPrice}>
                  <p className={styles.discountedPrice}>
                    $
                    {(
                      product.price *
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </p>
                  <p className={styles.orignalPrice}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className={styles.product}>
                  <div className={styles.id}>
                    <h5>Product code:</h5>
                    <p>{product._id}</p>
                  </div>
                  <div className={styles.stock}>
                    <FontAwesomeIcon icon={faCheckSquare} /> In Stock
                  </div>
                </div>
                <div className={styles.quantityBtn}>
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={() =>
                      setCartQuantity((prev) => Math.max(prev - 1, 1))
                    }
                  />
                  {cartQuantity}
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={() => setCartQuantity((prev) => prev + 1)}
                  />
                </div>
                <div className={styles.actionBtn}>
                  <div className={`${styles.buyNow} `}>
                    <FontAwesomeIcon icon={faCashRegister} /> Buy Now
                  </div>
                  <div
                    className={`${styles.addToCart} `}
                    onClick={handleAddToCart}
                  >
                    <FontAwesomeIcon icon={faCartArrowDown} /> Add To Cart
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.postReview}>
              <div className={styles.modalHeader}>
                <h3>Leave a Review</h3>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.reviewForm}
              >
                <div className={styles.reviewContainer}>
                  {/* Star Ratings Inside Input Field */}
                  <div className={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => handleHoverRating(star)}
                        onMouseLeave={handleResetHover}
                        onClick={() => handleSetRating(star)}
                        className={styles.starButton}
                      >
                        <FontAwesomeIcon
                          icon={
                            star <=
                            (reviewModal.hoverRating || reviewModal.rating)
                              ? faStar
                              : faStarEmpty
                          }
                          className={styles.starIcon}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Review Input Field */}
                  <textarea
                    placeholder="Your review..."
                    {...register("comment", {
                      required: "Comment is required",
                      minLength: {
                        value: 3,
                        message: "Comment should be at least 3 characters",
                      },
                    })}
                    className={styles.reviewTextarea}
                  />

                  {/* Submit Button Inside Input Field */}
                  <button
                    type="submit"
                    className={styles.submitReview}
                    disabled={isSubmitting || reviewModal.rating === 0}
                  >
                    <FontAwesomeIcon icon={faCommentMedical} />
                    {isSubmitting ? "Posting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.divider}></div>
            <div className={styles.reviews}>
              {reviews.map((review) => (
                <div className={styles.review} key={review.itemId}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.left}>
                      <Image
                        alt="avatar"
                        src={review.photo}
                        width={50}
                        height={50}
                        className={styles.avatar}
                      />
                      <div className={styles.name}>{review.name}</div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.rating}>
                        {Array.from({
                          length: Math.floor(review.rating) + 1,
                        }).map((_, index) => (
                          <FontAwesomeIcon
                            key={index}
                            icon={
                              index + 1 <= Math.floor(review.rating)
                                ? faStar
                                : faStarHalfStroke
                            }
                          />
                        ))}
                        <span className={styles.ratingNumber}>
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className={styles.date}>
                        {new Date(review.createdAt!).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.content}>{review.comment}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <BikeAnimiation text="Fetching product data" />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
