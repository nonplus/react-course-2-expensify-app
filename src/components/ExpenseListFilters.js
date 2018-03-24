import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    const { filters, setTextFilter, sortByDate, sortByAmount } = this.props;
    return (
      <div>
        <input
          type="text"
          value={filters.text}
          onChange={e => setTextFilter(e.target.value)}
        />
        <select
          value={filters.sortBy}
          onChange={e => {
            switch (e.target.value) {
              case "date":
                sortByDate();
                break;
              case "amount":
                sortByAmount();
                break;
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={filters.startDate}
          endDate={filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchtoProps = dispatch => ({
  setStartDate: date => dispatch(setStartDate(date)),
  setEndDate: date => dispatch(setEndDate(date)),
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount())
});

export default connect(mapStateToProps, mapDispatchtoProps)(ExpenseListFilters);
