import React, { useState, useEffect } from "react";
import { Card } from "antd";
import styled from "styled-components";
import Moment from "moment";

const Cards = styled.div`
  display: flex;
  flex-grow: 4;
  flex-wrap: wrap;
`;

const Items = styled.p`
  font-size: 15px;
`;

const TeamMembers = ({ list }) => {
  const { Meta } = Card;
  const [sortedTeamMembers, setSortedTeamMembers] = useState([]);

  // Sorting list of team members by created_at
  useEffect(() => {
    const sortedList = list.sort((a, b) => Moment(a.created_at).unix() - Moment(b.created_at).unix());
    setSortedTeamMembers(sortedList);
  }, [list]);

  // Rendering team members
  const renderTeamMembers = () => {
    return sortedTeamMembers.map((teamMember) => (
      <Card
        key={teamMember.id}
        hoverable
        style={{ width: 370, margin: "30px 30px 30px 0px" }}
        cover={<img alt="example" src={teamMember.cached_avatar} />}
      >
        <Meta
          title={<h2>{teamMember.name}</h2>}
          description={<p style={{ fontSize: "20px" }}>{teamMember.title}</p>}
        />
        <Items>
          Date Joined:
          {` ${Moment(teamMember.created_at).format("Do MMMM, YYYY ")}`}
        </Items>
        <Items>
          Timezone:
          {` ${teamMember.timezone}`}
        </Items>
        <Items>
          Total invites:
          {` ${teamMember.stats.invites}`}
        </Items>
        <Items>
          Published Campaigns:
          {` ${teamMember.stats.published_campaigns_count || 0}`}
        </Items>
      </Card>
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginTop: 50, marginBottom: 10 }}>TEAM</h1>
      <Cards>{renderTeamMembers()}</Cards>
    </div>
  );
};

export default TeamMembers;
