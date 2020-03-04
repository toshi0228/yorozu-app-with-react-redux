import React from 'react';
import DetailPlan from '../components/detailPlan';

const PlanDetailPage = ({ props }) => {
  const { id } = props.match.params;
  return (
    <>
      <DetailPlan id={id} />
    </>
  );
};

export default PlanDetailPage;
