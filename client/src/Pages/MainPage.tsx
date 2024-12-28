import React from 'react';
import Graph from "../components/Graph/Graph";
import CardContainer from '../MainCourses/Cards/CardContainer';
import Table from '../components/Table/Table';

export default function MainPage() {
  return (
    <div>
      <div style={{ width: '90%', marginLeft: '5%' }}>
      <CardContainer />
      <CardContainer />
      </div>
      
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