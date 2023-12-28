import React from 'react';
import { BestReactGrid, Column } from '@sencha/best-react-grid';
import '@sencha/best-react-grid/dist/themes/grui.css';

export default class App extends React.Component {
  render() {
    const renderColumn = function () {
      return (
        <img
          style={{ width: 100, height: 100 }}
          src="https://i.dummyjson.com/data/products/19/thumbnail.jpg"
        ></img>
      );
    };

    return (
      <BestReactGrid
        infinite={true}
        scrollable={true}
        variableHeights={true}
        userSelectable={true}
        key="viewQuery"
        autoWidth={false}
        store={{
          type: 'virtual',
          fields: [
            'firstName',
            'lastName',
            'address',
            'company',
            'title',
            {
              name: 'id',
              type: 'int',
            },
          ],
          loadData: async function (params) {
            const response = await fetch(
              'https://llbzr8dkzl.execute-api.us-east-1.amazonaws.com/production/user?' +
                new URLSearchParams(params)
            );
            const jsonResponse = await response.json();
            const dataArray = await jsonResponse;

            return dataArray;
          },
          rootProperty: 'users',
          remoteSort: true,
          countProperty: 'totalCount',
          pageSize: 25,
          autoLoad: true,
        }}
        style={{ width: '500px', height: '700px' }}
        columnLines
      >
        <Column
          field="firstName"
          text="Column 1"
          flex="1"
          renderer={renderColumn}
        />
        <Column field="lastName" text="Column 2" flex="1" />
        <Column field="company" text="Column 3" flex="1" />
      </BestReactGrid>
    );
  }
}
