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

import Image from 'next/image';
import React from 'react';
import { Col, FlexboxGrid, Grid, Input, Row } from 'rsuite';



export default function UserDetails(props) {
    
    return (
        <div>
          

            <UserDetailsSection me={props.me} />

        </div>
    )
}

function UserDetailsSection(props) {

    return (
        <div style={{ margin: '20px' }}>
            <h3 style={{ marginTop: '30px', fontWeight: 'normal' }}>Profile Details</h3>
            <div style={{ margin: '20px' }}>
                <Grid fluid>
                    <Row>
                        <Col xs='24'>

                            <IndividualUserDetail title='First Name' value={props.me.firstName} />

                            <IndividualUserDetail title='Last Name' value={props.me.familyName}/>

                            <IndividualUserDetail title='Username' value={props.me.username} />

                            <IndividualUserDetail title='Email' value={props.me.email} />

                        </Col>
                    </Row>

                </Grid>

            </div>

        </div>
    )
}

function IndividualUserDetail(props) {

    return (
        <div>
            <h5 style={{ marginBottom: '6px', fontWeight: 'normal' }}>{props.title}</h5>
            <Input readOnly value={props.value} size='lg'/>
            {
                props.title==='Email'
                ? <></>
                :  <br />
            }
           
        </div>
    )
}

