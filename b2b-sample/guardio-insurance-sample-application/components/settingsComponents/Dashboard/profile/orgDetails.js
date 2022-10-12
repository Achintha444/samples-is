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

import React from 'react'
import { Col, Grid, Input, Row } from 'rsuite'

export default function OrgDetails(props) {

    return (
        <div style={{ margin: '20px' }}>
            <h3 style={{ fontWeight: 'normal' }}>Organization Details</h3>
            <div style={{ margin: '20px' }}>

                <Grid fluid>
                    <Row>
                        <Col xs='24'>

                            <IndividualOrgDetail title='Organization Id' value={props.orgId} />

                            <IndividualOrgDetail title='Organization Name' value={props.orgName} />

                        </Col>
                    </Row>
                </Grid>

            </div>

        </div>
    )
}


function IndividualOrgDetail(props) {

    return (
        <div>
            <h5 style={{ marginBottom: '6px', fontWeight: 'normal' }}>{props.title}</h5>
            <Input readOnly value={props.value} size='lg' />
            <br />
        </div>
    )
}
