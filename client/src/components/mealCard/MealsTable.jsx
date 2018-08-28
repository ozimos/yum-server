import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import requestServices from '../../services/requestServices';

class MealsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      order: { Meals: [] },
      pages: 1
    };
  }

  onFetchData=(state) => {
    this.setState({ loading: true });
    const { page, pageSize } = state;
    const { id } = this.props;
    const offset = page * pageSize;
    const baseUrl = '/api/v1/orders';
    const url = `${baseUrl}/${id}/meals?limit=${pageSize}&offset=${offset}`;

    requestServices(url)
      .then((res) => {
        this.setState({
          pages: res.data.data.pages,
          order: res.data.data.rows[0],
          loading: false
        });
      });
  }

  render() {

    const columns = [
      {
        headerStyle: { height: '0' },
        id: 'pivot',
        accessor: () => '',
        width: 30
      }, {
        headerStyle: { height: '0' },
        accessor: 'title',
        width: 400
      }, {
        headerStyle: { height: '0' },
        accessor: 'MealOrders.quantity',
        width: 150
      }, {
        headerStyle: { height: '0' },
        accessor: 'price',
        width: 150
      }, {
        headerStyle: { height: '0' },
        aggregate: vals => vals.reduce((accum, val) => accum + val),
        accessor: 'subTotal',
        width: 100
      }
    ];

    const { Meals } = this.state.order;


    return (
      <ReactTable
        ref={(refReactTable) => { this.refReactTable = refReactTable; }}
        data={Meals}
        columns={columns}
        minRows={0}
        defaultPageSize={4}
        pivotBy={['pivot']}
        loading={this.state.loading}
        pages={this.state.pages}
        onFetchData={this.onFetchData}
        sortable={false}
        manual
        collapseOnSortingChange={false}
        collapseOnDataChange={false}
        collapseOnPageChange={false}
        nextText=">>"
        previousText="<<"
      />
    );
  }
}

MealsTable.propTypes = {
  id: PropTypes.string.isRequired,
};
export default MealsTable;
