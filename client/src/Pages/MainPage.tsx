import React from 'react';
import Graph from "../components/Graph/Graph";
import CardContainer from '../components/Cards/CardContainer';
import Table from '../components/Table/Table';

export default function MainPage() {
  return (
    <div>
      {/* Card Container */}
      <CardContainer />

      {/* Graph and Table Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {/* Graph */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <Graph />
        </div>

        {/* Table */}
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <Table />
        </div>
      </div>
    </div>
  );
}
