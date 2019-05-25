import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362333;
  color: #958993;
`;

const TeamList = styled.div`
  width: 100%;
  padding: 15px;
  list-style: none;
`;

const TeamListItem = styled.div`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const team = ({ id, letter }) => <Link to={`/view-team/${id}`} key={`team-${id}`}><TeamListItem>{letter}</TeamListItem></Link>;

export default ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(team)}</TeamList>
  </TeamWrapper>
);
