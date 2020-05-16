import React from "react";
import styled from "styled-components";

export default function Metric({
  name,
  id,
  source,
  duration,
  startTime,
  tags,
}) {
  return (
    <MetricArticle>
      <MetricHeader>
        <h3>{name}</h3>
        <RightSide>{id}</RightSide>
      </MetricHeader>
      <Duration duration={duration}>{duration}</Duration>
      <p>{`${startTime ? `${startTime} ` : ""}from ${source}`}</p>
      <Tags>{tags.join(", ")}</Tags>
    </MetricArticle>
  );
}

const Duration = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${(props) =>
    props.duration < 100 ? "green" : props.duration < 250 ? "orange" : "red"};
`;

const MetricArticle = styled.article`
  padding: 1rem;
  background-color: white;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;
const MetricHeader = styled.header`
  border-bottom: #c0c0c0;
  display: flex;
  > h3 {
    flex: 1 1 auto;
  }
`;
const RightSide = styled.p`
  flex: 0 0 auto;
  color: #c0c0c0;
`;

const Tags = styled.footer`
  color: #303030;
`;
