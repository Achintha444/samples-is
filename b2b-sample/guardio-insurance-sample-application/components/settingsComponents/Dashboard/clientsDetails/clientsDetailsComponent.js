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

import PeopleBranchIcon from '@rsuite/icons/PeopleBranch';
import PeopleExpandIcon from '@rsuite/icons/PeopleExpand';
import PeoplesIcon from '@rsuite/icons/Peoples';
import BarLineChartIcon from '@rsuite/icons/BarLineChart';
import React from 'react';
import { Divider, FlexboxGrid, Panel, Stack } from 'rsuite';
import SettingsTitle from '../../../util/settingsTitle';
import GraphsSection from './graphsSection';
import TableSection from './tableSection';

export default function ClientsDetailsComponent() {

    return (
        <div style={{ margin: '1rem' }}>
            <br />
            <Stack direction='column' alignItems='flex-start' spacing={30} style={{ width: '100%' }}>
                <FlexboxGrid justify="start">
                    <FlexboxGrid.Item key={0} colspan={24}>
                        <SettingsTitle title='Overall Usage' subtitle='Indepth details of the overall usage' />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <></>
            </Stack>

            <FlexboxGrid justify="space-between" >
                <FlexboxGrid.Item key={0} colspan={6}>
                    <IndividualCard title='Number of Connections' text='100'>
                        <PeoplesIcon style={{ fontSize: '3em' }} />
                    </IndividualCard>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item key={0} colspan={5}>
                    <IndividualCard title='Connection Growth' text='24+'>
                        <PeopleExpandIcon style={{ fontSize: '3em' }} />
                    </IndividualCard>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item key={0} colspan={5}>
                    <IndividualCard title='Transactions' text='35'>
                        <PeopleBranchIcon style={{ fontSize: '3em' }} />
                    </IndividualCard>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item key={0} colspan={6}>
                    <IndividualCard title='Usages' text='56'>
                        <BarLineChartIcon style={{ fontSize: '3em' }} />
                    </IndividualCard>
                </FlexboxGrid.Item>

            </FlexboxGrid>

            <br />

            <Divider />

            <GraphsSection />

            <Divider />
            
            <TableSection />
        </div>
    )
}

function IndividualCard(props) {
    return (
        <Panel bordered>
            <p>{props.title}</p>

            <br />

            <FlexboxGrid align='bottom' justify='space-between'>
                <FlexboxGrid.Item key={0} colspan={14}>
                    <h1 style={{ fontSize: '80px' }}>{props.text}</h1>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item key={1} colspan={6}>
                    <div>
                        {props.children}
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    )
}
