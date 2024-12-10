import React from 'react';
import Graph from "../components/Graph/Graph";
import CardContainer from '../components/Cards/CardContainer';
import Table from '../components/Table/Table';

export default function MainPage() {
  return (
    <div>
      <CardContainer />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        
        <div style={{ flex: 1, marginRight: '20px' }}>
          <Graph />
        </div>
        
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <Table />
        </div>
      </div>
    </div>
  );
}
