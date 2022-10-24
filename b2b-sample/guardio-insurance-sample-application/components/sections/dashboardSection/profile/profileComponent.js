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

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Divider, FlexboxGrid, Panel } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import CoverImage from "./otherComponents/coverImage";
import OrgDetails from "./otherComponents/orgDetails";
import UserDetails from "./otherComponents/userDetails";
import profileImage from "../../../../public/internal/profile.svg";
import styles from "../../../../styles/Settings.module.css";
import decodeMe from "../../../../util/apiDecode/dashboard/decodeMe";

export default function ProfileComponent(prop) {

    const { session, orgId, orgName } = prop;

    const [ me, setMe ] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await decodeMe(session);

            setMe(res);
        }
        fetchData();
    }, [ session ]);

    return (
        <div className={ styles.homeMainPanelDiv }>
            <CoverImage />

            <ProfileImageaAndNameSection me={ me } />

            {
                me === null
                    ? <br />
                    : <Divider />
            }

            <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={ 14 }>
                    {
                        me === null
                            ? (<Panel bordered style={ { height: "260px" } }>
                                <FlexboxGrid align="middle" justify="space-around">
                                    <FlexboxGrid.Item colspan={ 8 }>
                                        <div className={ styles.profileImage }>
                                            <Image src={ profileImage } alt="profile image" />
                                        </div>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={ 14 }>
                                        <h4>
                                            Add the user attributes in created the application to display user details
                                        </h4>
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </Panel>)
                            : <UserDetails me={ me } />
                    }
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={ 1 }>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={ 7 }>
                    <OrgDetails orgId={ orgId } orgName={ orgName } />
                </FlexboxGrid.Item>
            </FlexboxGrid>

        </div>
    );
}

function ProfileImageaAndNameSection(prop) {

    const { me } = prop;

    return (

        me === null
            ? <></>
            : (<div style={ { marginLeft: "1rem" } }>
                <FlexboxGrid justify="space-between" align="middle">

                    <FlexboxGrid.Item colspan={ 4 }>
                        <div className={ styles.profileImage }>
                            <Image src={ profileImage } alt="profile image" />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={ 20 }>
                        <div >

                            <h1>{ me.firstName }</h1>
                            <h6 style={ { fontWeight: "normal" } }>{ me.id }</h6>
                        </div>

                    </FlexboxGrid.Item>

                </FlexboxGrid>
            </div>)

    );
}
