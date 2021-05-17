import React, { useEffect, useState } from "react";
import axios from "axios";
import { Descriptions } from "antd";
import Moment from "moment";
import TeamMembers from "./TeamMembers";
import config from "./config";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [tableData, setTableData] = useState({
    totalMembers: 0,
    newMember: 0,
    totalInvites: 0,
    totalCampaigns: 0,
  });

  // fetching team members
  const fetchTeamMembers = async () => {
    const response = await axios.get(config.API_URL);
    const list = response.data.users;
    setTeamMembers(list);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // calculating data for summary table
  useEffect(() => {
    const totalCount = teamMembers.reduce(
      (counts, member) => {
        const invitesCount = counts.invitesCount + member.stats.invites;
        const campaignCount =
          counts.campaignCount + member.stats.published_campaigns_count || 0;
        return { invitesCount, campaignCount };
      },
      { invitesCount: 0, campaignCount: 0 }
    );
    const date = teamMembers.length
      ? teamMembers[teamMembers.length - 1].created_at
      : 0;
    setTableData({
      totalMembers: teamMembers.length,
      newMember: Moment(date).format("Do MMMM YYYY"),
      totalInvites: totalCount.invitesCount,
      totalCampaigns: totalCount.campaignCount,
    });
  }, [teamMembers]);

  const renderSummary = () => (
    <div style={{ marginTop: 20 }}>
      <Descriptions
        style={{ padding: 20 }}
        bordered
        title={<h1>SUMMARY</h1>}
        column={4}
        layout="vertical"
      >
        <Descriptions.Item label={<h2>Total Team Members</h2>}>
          <h2>{tableData.totalMembers}</h2>
        </Descriptions.Item>
        <Descriptions.Item label={<h2>Last Recruitment Date</h2>}>
          <h2>{tableData.newMember}</h2>
        </Descriptions.Item>
        <Descriptions.Item label={<h2>Total members Invited</h2>}>
          <h2>{tableData.totalInvites}</h2>
        </Descriptions.Item>
        <Descriptions.Item label={<h2>Total Published Campaigns</h2>}>
          <h2>{tableData.totalCampaigns}</h2>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  return (
    <div style={{ padding: 40 }}>
      {renderSummary()}
      <TeamMembers list={teamMembers} />
    </div>
  );
};

export default Team;
