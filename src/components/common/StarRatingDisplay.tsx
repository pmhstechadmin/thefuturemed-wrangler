import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { supabase } from "@/integrations/supabase/client";

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
  color: #34f92aff;
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
  color: ${(props) => props.color || "#044301ff"};
  //   color: ${(props) => props.color || "#34f92aff"};
  //   color: ${(props) => props.color || "#0741ffff"};
  font-size: ${(props) => props.size}px;
  line-height: ${(props) => props.size}px;
  letter-spacing: 2px;
`;

const RatingText = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: #666;
  text-align: center;
`;

// Props
interface RatingDisplayProps {
  itemId: string;
  itemType: "course" | "seminar" | "blog";
  size?: number;
  color?: string;
  showText?: boolean;
  className?: string;
}

// Component
const RatingDisplay: React.FC<RatingDisplayProps> = ({
  itemId,
  itemType,
  size = 20,
  color = "#ffc107",
  showText = true,
  className,
}) => {
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchRatingData();
  }, [itemId, itemType]);

  const fetchRatingData = async () => {
    try {
      const requestBody: any = {};
      if (itemType === "course") requestBody.course_id = itemId;
      if (itemType === "seminar") requestBody.seminar_id = itemId;
      if (itemType === "blog") requestBody.blog_id = itemId;

      const { data, error } = await supabase.functions.invoke(
        "get-star-rating",
        {
          body: requestBody,
        }
      );

      if (error) {
        console.error("Error fetching rating:", error.message);
        return;
      }

      if (data?.success) {
        setAverage(data.average_rating || 0);
        setTotal(data.total_ratings || 0);
      }
    } catch (err) {
      console.error("Error loading rating:", err);
    }
  };

  return (
    <RatingContainer className={className}>
      <StarsWrapper>
        <StarBackground size={size}>★★★★★</StarBackground>
        <StarForeground width={(average / 5) * 100} size={size} color={color}>
          ★★★★★
        </StarForeground>
      </StarsWrapper>
      {showText && (
        <RatingText>
          {average > 0 ? average.toFixed(1) : "No ratings"} • {total} rating
          {total !== 1 ? "s" : ""}
        </RatingText>
      )}
    </RatingContainer>
  );
};

export { RatingDisplay };
