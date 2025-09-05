import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { supabase } from "@/integrations/supabase/client";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const starPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const RatingContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
`;

const StarsWrapper = styled.div`
  display: flex;
  position: relative;
`;

const StarBackground = styled.div<{ size: number }>`
  color: #a6aeecff;
  font-size: ${(props) => props.size}px;
  line-height: ${(props) => props.size}px;
  letter-spacing: 2px;
`;

const StarForeground = styled.div<{
  width: number;
  size: number;
  color?: string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}%;
  overflow: hidden;
  color: ${(props) => props.color || "#34f92aff"};
//   color: ${(props) => props.color || "#070fffff"};
  font-size: ${(props) => props.size}px;
  line-height: ${(props) => props.size}px;
  letter-spacing: 2px;
`;

const InteractiveStar = styled.div<{
  filled: number;
  size: number;
  animate: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.filled * 100}%;
  overflow: hidden;
  color: #5ba857ff;
  //   color: #0717ffff;
  font-size: ${(props) => props.size}px;
  line-height: ${(props) => props.size}px;
  letter-spacing: 2px;
  animation: ${(props) =>
    props.animate
      ? css`
          ${starPulse} 0.5s ease
        `
      : "none"};
  pointer-events: none;
`;

const RatingText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
  margin-right: 8px;
`;

const StatusMessage = styled.div<{ error?: boolean }>`
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: ${(props) => (props.error ? "#ffebee" : "#e8f5e9")};
  color: ${(props) => (props.error ? "#c62828" : "#2e7d32")};
  font-size: 14px;
  animation: ${fadeIn} 0.3s ease;
  max-width: 300px;
`;

// Types
interface RatingData {
  average_rating: number;
  total_ratings: number;
  user_rating: number | null;
}

interface StarRatingProps {
  itemId: string;
  itemType: "course" | "seminar" | "blog";
  size?: number;
  color?: string;
  showText?: boolean;
  interactive?: boolean;
  onRatingSubmit?: (rating: number, responseData: any) => void;
  onRatingLoaded?: (ratingData: any) => void;
  className?: string;
}

// Main Component
const StarRating: React.FC<StarRatingProps> = ({
  itemId,
  itemType,
  size = 24,
  color = "#ffc107",
  showText = true,
  interactive = true,
  onRatingSubmit,
  onRatingLoaded,
  className,
}) => {
  const [ratingData, setRatingData] = useState<RatingData | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [animateStar, setAnimateStar] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    error: boolean;
  } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setUserId(data.user.id);
      } else {
        setUserId(null);
      }
    };
    fetchUser();
  }, []);

  // Fetch rating data once userId is known
  useEffect(() => {
    if (userId) {
      fetchRatingData();
    }
  }, [itemId, itemType, userId]);

  const fetchRatingData = async () => {
    setIsLoading(true);
    setStatusMessage(null);

    try {
      const requestBody: any = { user_id: userId };
      if (itemType === "course") requestBody.course_id = itemId;
      if (itemType === "seminar") requestBody.seminar_id = itemId;
      if (itemType === "blog") requestBody.blog_id = itemId;

      const { data, error } = await supabase.functions.invoke(
        "get-star-rating",
        {
          body: requestBody,
        }
      );

      if (error)
        throw new Error(error.message || "Failed to fetch rating data");
      if (!data?.success) throw new Error("Failed to load rating data");

      setRatingData({
        average_rating: data.average_rating,
        total_ratings: data.total_ratings,
        user_rating: data.user_rating ?? null,
      });

      if (onRatingLoaded) onRatingLoaded(data);
    } catch (err: any) {
      console.error("Error fetching rating:", err);
      setStatusMessage({
        text: err.message || "Failed to load rating",
        error: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarClick = async (rating: number) => {
    if (!interactive || !userId) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {

      const requestBody: any = { rating };
      if (itemType === "course") requestBody.course_id = itemId;
      if (itemType === "seminar") requestBody.seminar_id = itemId;
      if (itemType === "blog") requestBody.blog_id = itemId;

      const { data, error } = await supabase.functions.invoke(
        "add-star-rating",
        {
          body: requestBody,
        }
      );

      if (error) {
        // Handle 400 / 500 based on error.message or code if your function provides it
        let message = error.message || "Failed to submit rating.";
        if (error.status === 500)
          message = "Server error. Please try again later.";
        throw new Error(message);
      }
      if (!data?.success)
        throw new Error(
          data.message || data.error || "Failed to submit rating."
        );


      setStatusMessage({
        text: data.message || "Rating submitted successfully!",
        error: false,
      });

      if (onRatingSubmit) onRatingSubmit(rating, data);

      // Refresh after submit
      setTimeout(() => fetchRatingData(), 1000);
    } catch (err: any) {
      console.error("Error submitting rating:", err);
      setStatusMessage({
        text: err.message || "An error occurred while submitting rating",
        error: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarHover = (rating: number) => {
    if (!interactive) return;
    setHoverRating(rating);
  };

  if (isLoading) {
    return (
      <RatingContainer className={className}>
        <StarsWrapper>
          <StarBackground size={size}>★★★★★</StarBackground>
        </StarsWrapper>
        {showText && <RatingText>Loading rating...</RatingText>}
      </RatingContainer>
    );
  }

  if (!ratingData) {
    return (
      <RatingContainer className={className}>
        <StarsWrapper>
          <StarBackground size={size}>★★★★★</StarBackground>
        </StarsWrapper>
        {showText && <RatingText>No ratings yet</RatingText>}
      </RatingContainer>
    );
  }

  const { average_rating, total_ratings, user_rating } = ratingData;
  const displayRating = hoverRating > 0 ? hoverRating : average_rating;

  return (
    <RatingContainer className={className}>
      <StarsWrapper onMouseLeave={() => setHoverRating(0)}>
        <StarBackground size={size}>★★★★★</StarBackground>
        <StarForeground
          width={(displayRating / 5) * 100}
          size={size}
          color={color}
        >
          ★★★★★
        </StarForeground>

        {interactive && (
          <>
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                style={{
                  position: "absolute",
                  left: `${(star - 1) * (size + 2)}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  zIndex: 10,
                  cursor: isSubmitting ? "default" : "pointer",
                }}
                onClick={() => !isSubmitting && handleStarClick(star)}
                onMouseMove={() => !isSubmitting && handleStarHover(star)}
              />
            ))}
            <InteractiveStar
              filled={hoverRating > 0 ? hoverRating / 5 : average_rating / 5}
              size={size}
              animate={animateStar !== -1}
            >
              ★★★★★
            </InteractiveStar>
          </>
        )}
      </StarsWrapper>

      {showText && (
        <RatingText>
          {average_rating > 0 ? average_rating.toFixed(1) : "No ratings"} •{" "}
          {total_ratings} rating
          {total_ratings !== 1 ? "s" : ""}
          {user_rating !== null && ` • Your rating: ${user_rating}`}
        </RatingText>
      )}

      {statusMessage && (
        <StatusMessage error={statusMessage.error}>
          {statusMessage.text}
        </StatusMessage>
      )}

      {isSubmitting && (
        <StatusMessage>
          <Spinner /> Submitting your rating...
        </StatusMessage>
      )}
    </RatingContainer>
  );
};

export default StarRating;
