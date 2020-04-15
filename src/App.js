import React from "react";
import {
  ReactiveBase,
  DataSearch,
  NumberBox,
  DateRange,
  RangeSlider,
  ResultCard,
  ReactiveList
} from "@appbaseio/reactivesearch";
import moment from "moment";

import "./App.css";

const { ResultCardsWrapper } = ReactiveList;

const getDateQuery = (query, value) => {
  query = [
    {
      range: {
        date_from: {
          gte: moment(value.start).format("YYYYMMDD")
        }
      }
    },
    {
      range: {
        date_to: {
          lte: moment(value.end).format("YYYYMMDD")
        }
      }
    }
  ];
  return query;
};

export default () => (
  <div className="container">
    <ReactiveBase
      app="airbeds-test-app"
      url="https://xe6N9nDRV:51ea7a8a-6354-4b5f-83e1-12dce3b7ec47@arc-cluster-appbase-demo-ps1pgt.searchbase.io"
      enableAppbase
      theme={{
        primaryColor: "#FF3A4E"
      }}
    >
      <nav className="nav">
        <div className="title">Airbeds</div>
        <DataSearch
          componentId="SearchSensor"
          dataField="name"
          autosuggest={false}
          placeholder="Search by house names"
          iconPosition="left"
          className="search"
          highlight={true}
        />
      </nav>
      <div className="left-col">
        <DateRange
          dataField="date_from"
          componentId="DateRangeSensor"
          title="When"
          numberOfMonths={2}
          initialMonth={new Date("04-01-2017")}
          customQuery={value => {
            let query = null;
            if (value) {
              query = getDateQuery(query, value);
            }
            return { query };
          }}
        />

        <NumberBox
          componentId="GuestSensor"
          dataField="accommodates"
          title="Guests"
          defaultSelected={2}
          labelPosition="right"
          data={{
            start: 1,
            end: 16
          }}
        />

        <RangeSlider
          componentId="PriceSensor"
          dataField="price"
          title="Price Range"
          range={{
            start: 10,
            end: 250
          }}
          rangeLabels={{
            start: "$10",
            end: "$250"
          }}
          defaultSelected={{
            start: 10,
            end: 50
          }}
          stepValue={10}
          interval={20}
          react={{
            and: ["DateRangeSensor"]
          }}
        />
      </div>

      <ReactiveList
        className="right-col"
        componentId="SearchResult"
        dataField="name"
        size={12}
        pagination
        react={{
          and: [
            "SearchSensor",
            "GuestSensor",
            "PriceSensor",
            "DateRangeSensor",
            "search"
          ]
        }}
        innerClass={{
          resultStats: "result-stats",
          list: "list",
          listItem: "list-item",
          image: "image"
        }}
        render={({ data }) => (
          <ResultCardsWrapper>
            {data.map(item => (
              <ResultCard href={item.listing_url} key={item._id}>
                <ResultCard.Image src={item.image} />
                <ResultCard.Title
                  dangerouslySetInnerHTML={{
                    __html: item.name
                  }}
                />
                <ResultCard.Description>
                  <div>
                    <div className="price">${item.price}</div>
                    <p className="info">
                      {item.room_type} · {item.accommodates} guests
                    </p>
                  </div>
                </ResultCard.Description>
              </ResultCard>
            ))}
          </ResultCardsWrapper>
        )}
      />
    </ReactiveBase>
  </div>
);
