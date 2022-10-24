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

import React from "react";
import { Col, Grid, Input, Row } from "rsuite";

export default function UserDetails(prop) {

    const { me } = prop;
    
    return (
        <div>
            <UserDetailsSection me={ me } />
        </div>
    );
}

function UserDetailsSection(prop) {

    const { me } = prop;

    return (
        <div style={ { margin: "20px" } }>
            <h3 style={ { fontWeight: "normal", marginTop: "30px" } }>Profile Details</h3>
            <div style={ { margin: "20px" } }>
                <Grid fluid>
                    <Row>
                        <Col xs="24">

                            <IndividualUserDetail title="First Name" value={ me.firstName } />

                            <IndividualUserDetail title="Last Name" value={ me.familyName }/>

                            <IndividualUserDetail title="Username" value={ me.username } />

                            <IndividualUserDetail title="Email" value={ me.email } />

                        </Col>
                    </Row>

                </Grid>

            </div>

        </div>
    );
}

function IndividualUserDetail(prop) {

    const { title, value } = prop;

    return (
        <div>
            <h5 style={ { fontWeight: "normal", marginBottom: "6px" } }>{ title }</h5>
            <Input readOnly value={ value } size="lg"/>
            {
                title==="Email"
                    ? <></>
                    :  <br />
            }
           
        </div>
    );
}
