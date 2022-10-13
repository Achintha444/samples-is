/*
 * Copyright (c) 2022 WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *http://www.apache.org/licenses/LICENSE-2.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useState } from 'react';
import { Table } from 'rsuite';

export default function TableSection() {

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchPrices = async () => {
            const res = await fetch("https://api.coincap.io/v2/assets/?limit=10");
            const data = await res.json()
            setData(data.data);
        };

        fetchPrices();
    }, []);

    const { Column, HeaderCell, Cell } = Table;

    return (
        <div>
            <h4>Client Information</h4>

            <br />

            <Table
                height={600}
                data={data}
                onRowClick={rowData => {
                    console.log(rowData);
                }}
            >
                <Column width={200} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={150}>
                    <HeaderCell>SymboL</HeaderCell>
                    <Cell dataKey="symbol" />
                </Column>

                <Column width={150}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column width={100}>
                    <HeaderCell>Rank</HeaderCell>
                    <Cell dataKey="rank" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Supply</HeaderCell>
                    <Cell dataKey="supply" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Change Percent</HeaderCell>
                    <Cell dataKey="changePercent24Hr" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Price USD ($)</HeaderCell>
                    <Cell dataKey="priceUsd" />
                </Column>
            </Table>
        </div>

    )
}
