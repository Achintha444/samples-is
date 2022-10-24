/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import ImageIcon from "@rsuite/icons/Image";
import MediaIcon from "@rsuite/icons/Media";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Divider, FlexboxGrid, Panel, Stack } from "rsuite";
import { checkIfJSONisEmpty } from "../../../../util/util/common/common";
import SettingsTitle from "../../../common/settingsTitle";

export default function DataUsageComponent() {

    const [ chartData, setChartData ] = useState({});

    const usageData = {
        labels: [ "Used", "Available" ],
        datasets: [
            {
                label: "Storage",
                data: [ 45, 24 ],
                backgroundColor: [
                    "rgba(255, 99, 12, 0.2)",
                    "rgba(54, 12, 235, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 12, 1)",
                    "rgba(54, 12, 235, 1)"
                ],
                borderWidth: 1
            }
        ]
    };

    function nameToMonth(data) {

        const months = [ "January", "Feburary", "March", "April", "May", "June", "July", "Augest", "September",
            "October", "November", "December" ];

        data.forEach(mapFuction);

        function mapFuction(crytpo, index, array) {
            crytpo.name = months[index];
        }

        return data;
    }

    useEffect(() => {
        const fetchPrices = async () => {
            const res = await fetch("https://api.coincap.io/v2/assets/?limit=12");
            const data = await res.json();

            const dataValues = nameToMonth(data.data);

            setChartData({
                labels: data.data.map((crypto) => crypto.name),
                datasets: [
                    {
                        fill: true,
                        label: "Price in USD",
                        data: dataValues.map((crypto) => crypto.priceUsd > 10 ? Math.random() * 8 : crypto.priceUsd),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ]
                    }
                ]
            });
        };

        fetchPrices();
    }, []);

    return (
        <div style={ { margin: "1rem" } }>

            <br />
            <Stack direction="column" alignItems="flex-start" spacing={ 30 } style={ { width: "100%" } }>
                <FlexboxGrid justify="start">
                    <FlexboxGrid.Item key={ 0 } colspan={ 24 }>
                        <SettingsTitle title="Internet Usage" subtitle="Indepth details of your internet usage" />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <></>
            </Stack>

            <h4>Data Usage</h4>
            <br />

            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item colspan={ 9 } >
                    <Panel bordered >
                        <Doughnut data={ usageData } />
                    </Panel>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={ 14 }>

                    <h5>Details</h5>
                    <br />

                    <FlexboxGrid justify="space-between" style={ { marginBottom: "16px" } }>
                        <FlexboxGrid.Item key={ 0 } colspan={ 11 }>
                            <IndividualCard title="Used" value="45">
                                <ImageIcon style={ { fontSize: "3em" } } />
                            </IndividualCard>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item key={ 0 } colspan={ 12 }>
                            <IndividualCard title="Remaining" value="24">
                                <MediaIcon style={ { fontSize: "3em" } } />
                            </IndividualCard>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <Divider />

                    <FlexboxGrid justify="space-between" style={ { marginBottom: "16px" } }>
                        <FlexboxGrid.Item key={ 0 } colspan={ 24 }>

                            <Panel bordered style={ { height: "31vh" } }>
                                <div
                                    style={ {
                                        width: "100%", height: "27vh",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    } }>
                                    <Stack direction="column" spacing={ 10 }>
                                        <PlusRoundIcon style={ { fontSize: "3em" } } />
                                        <p>Add data to the package</p>
                                    </Stack>
                                </div>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <br />

            <Divider />

            <h4>Monthly Usage</h4>
            <br />

            {
                checkIfJSONisEmpty(chartData)
                    ? <></>
                    : (<Bar
                        data={ chartData }
                        options={ {
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }
                        } } />)
            }
        </div>
    );
}

function IndividualCard(props) {
    return (
        <Panel bordered>
            <FlexboxGrid align="middle" justify="space-between">
                <FlexboxGrid.Item key={ 1 } colspan={ 20 }>
                    <FlexboxGrid align="middle" justify="start">
                        <FlexboxGrid.Item key={ 1 - 1 } colspan={ 2 }>

                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item key={ 1 - 2 } colspan={ 18 }>
                            <h3>{ props.title } data</h3>
                            <h5 style={ { fontWeight: "normal" } }>{ props.title } data for Oct</h5>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item key={ 0 } colspan={ 4 }>
                    <h4>{ props.value } GB</h4>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    );
}
