import React from 'react';
import { ReactiveBase, DataSearch, NumberBox, DateRange, RangeSlider, ResultCard, ReactiveList } from '@appbaseio/reactivesearch';

import './App.css';

const { ResultCardsWrapper } = ReactiveList;

export default () => (
    <div className="container">
        <ReactiveBase
            app="airbeds-test-app"
            credentials="X8RsOu0Lp:9b4fe1a4-58c6-4089-a042-505d86d9da30"
            theme={{
                primaryColor: '#FF3A4E',
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
                    queryFormat="basic_date"
                    initialMonth={new Date('04-01-2017')}
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
                        start: '$10',
                        end: '$250',
                    }}
                    defaultSelected={{
                        start: 10,
                        end: 50,
                    }}
                    stepValue={10}
                    interval={20}
                    react={{
                        and: ['DateRangeSensor'],
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
                    and: ['SearchSensor', 'GuestSensor', 'PriceSensor', 'DateRangeSensor', 'search'],
                }}
                innerClass={{
                    resultStats: 'result-stats',
                    list: 'list',
                    listItem: 'list-item',
                    image: 'image',
                }}
                render={({ data }) => <ResultCardsWrapper>{
                    data.map(item => (
                        <ResultCard key={item.id}>
                            <ResultCard.Image src={item.image}/>
                            <ResultCard.Title
                                dangerouslySetInnerHTML={{
                                    __html: item.name
                                }}
                            />
                            <ResultCard.Description>
                                <div>
                                    <div className="price">${item.price}</div>
                                    <p className="info">{item.room_type} · {item.accommodates} guests</p>
                                </div>
                            </ResultCard.Description>
                        </ResultCard>
                    ))
                }
                </ResultCardsWrapper>}
            />
        </ReactiveBase>
    </div>
);
