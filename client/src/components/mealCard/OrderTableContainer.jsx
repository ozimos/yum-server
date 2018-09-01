import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import 'react-table/react-table.css';

const OrderTableContainer = ({ orders, ...props }) => {
  const hasEditMinutes = (updatedAt) => {
    const orderEditMinutes = parseInt(process.env.ORDER_EDIT_MINUTES, 10) || 15;
    const minutesSinceOrder = differenceInMinutes(new Date(), updatedAt);
    return orderEditMinutes - minutesSinceOrder > 0;
  };


  const columns = [
    {
      Header: 'Order Id',
      accessor: 'id',
      width: 550,
    }, {
      Header: 'Date',
      accessor: 'updatedAt',
      Cell: columnProps =>
        (<span>{format(columnProps.value, 'DD MMM, YYYY')}</span>),
      width: 250,
    }, {
      Header: 'Time',
      accessor: 'updatedAt',
      Cell: columnProps => (<span>{format(columnProps.value, 'h:mm A')}</span>),
      width: 200
    }, {
      Header: '',
      accessor: 'updatedAt',
      Cell: columnProps => isToday(columnProps.value) &&
        hasEditMinutes(columnProps.value) &&
      (
      <button
        className="btn title-button"
        onClick={() => props.addOrderToCart(columnProps.row.id)}
        disabled={props.currentOrderId === columnProps.row.id}
      >
      Edit
      </button>
      ),
      getProps: () => ({
        style: {
          cursor: 'auto',
          marginRight: 'auto',
          marginLeft: 'auto',
        }
      }),
      className: 'normal-cursor',
      width: 50
    }
  ];
  return (
    <div>
      <ReactTable
        data={orders}
        columns={columns}
        className="-striped -highlight clickable"
        minRows={0}
        defaultPageSize={props.pagination.limit}
        loading={props.loading}
        pages={props.pagination.pages}
        onFetchData={props.onFetchData}
        sortable={false}
        manual
        getTdProps={(state, rowInfo, column) => ({
            onClick: (e, handleOriginal) => {
              if (column.Header) {
                props.getOrderMeals(rowInfo.row.id);
                props.getOrderMealsTotals(rowInfo.row.id);
              }

              if (handleOriginal) {
                handleOriginal();
              }
            }
          })}
      />
    </div>
  );
};
OrderTableContainer.defaultProps = {
  pagination: {
    pages: 1,
    limit: 10,
    offset: 0
  },
  loading: false,
  currentOrderId: ''
};
OrderTableContainer.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  addOrderToCart: PropTypes.func.isRequired,
  getOrderMeals: PropTypes.func.isRequired,
  getOrderMealsTotals: PropTypes.func.isRequired,
  onFetchData: PropTypes.func.isRequired,
  currentOrderId: PropTypes.string,
  pagination: PropTypes.shape({
    pages: PropTypes.number,
    limit: PropTypes.number,
    offset: PropTypes.number,
  }),
  loading: PropTypes.bool
};

export default OrderTableContainer;

