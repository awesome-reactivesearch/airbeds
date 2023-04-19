import React from "react";
import {
  ReactiveBase,
  SearchBox,
  NumberBox,
  RangeSlider,
  ResultCard,
  ReactiveList,
  MultiList,
} from "@appbaseio/reactivesearch";
import "./App.css";

const { ResultCardsWrapper } = ReactiveList;

export default () => (
  <div className="container">
    <ReactiveBase
      app="airbnb-dev"
      url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
      enableAppbase
      theme={{
        primaryColor: "#FF3A4E",
      }}
    >
      <nav className="nav">
        <div className="navbar-title">Airbeds</div>
        <SearchBox
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
        <MultiList
          dataField="room_type.keyword"
          componentId="RoomTypeSensor"
          title="Room Type"
          react={{
            and: ["SearchSensor", "SearchResult", "GuestSensor", "PriceSensor"],
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
            end: 16,
          }}
        />

        <RangeSlider
          componentId="PriceSensor"
          dataField="price"
          title="Price Range"
          range={{
            start: 10,
            end: 250,
          }}
          rangeLabels={{
            start: "$10",
            end: "$250",
          }}
          defaultSelected={{
            start: 10,
            end: 50,
          }}
          stepValue={10}
          interval={20}
          react={{
            and: ["RoomTypeSensor"],
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
            "RoomTypeSensor",
            "search",
          ],
        }}
        innerClass={{
          resultStats: "result-stats",
          list: "list",
          listItem: "list-item",
          image: "image",
        }}
      >
        {({ data }) => (
          <ResultCardsWrapper>
            {data.map((item) => (
              <ResultCard key={item._id}>
                <ResultCard.Image
                  src={item.picture_url}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://www.houseoftara.com/shop/wp-content/uploads/2019/05/placeholder.jpg";
                  }}
                />
                <ResultCard.Title
                  dangerouslySetInnerHTML={{
                    __html: item.name,
                  }}
                />
                <ResultCard.Description>
                  <div>
                    <div className="price">$ {item.price}</div>
                    <p className="info">
                      {item.room_type} · {item.accommodates} guests
                    </p>
                  </div>
                </ResultCard.Description>
              </ResultCard>
            ))}
          </ResultCardsWrapper>
        )}
      </ReactiveList>
    </ReactiveBase>
  </div>
);
