/*
 * Copyright (c) 2022 WSO2 LLC. (http://www.wso2.com).
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

import { Divider, FlexboxGrid, Panel } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import styles from '../../../../styles/Settings.module.css';

import React, { useEffect, useState } from 'react';

import decodeMe from '../../../../util/apiDecode/dashboard/decodeMe';
import CoverImage from './coverImage';
import OrgDetails from './orgDetails';
import UserDetails from './userDetails';
import Image from 'next/image';
import profileImage from '../../../../public/internal/profile.svg';

export default function ProfileComponent(props) {

    const [me, setMe] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await decodeMe(props.session);
            setMe(res);
        }
        fetchData();
    }, [props]);

    return (
        <div className={styles.homeMainPanelDiv}>
            <CoverImage />

            <ProfileImageaAndNameSection me={me} />

            <Divider />

            <FlexboxGrid>
                <FlexboxGrid.Item colspan={14}>
                    {
                        me == null
                            ? <Panel bordered style={{ height: '400px' }}>
                                <div>Add the user attributes in created the application to display user details</div>
                            </Panel>

                            : <UserDetails me={me} />


                    }
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={1}>
                    <Divider vertical style={{ height: '44vh' }} />
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={7}>


                    <OrgDetails orgId={props.orgId} orgName={props.orgName} />
                </FlexboxGrid.Item>
            </FlexboxGrid>





        </div>
    );
}

function ProfileImageaAndNameSection(props) {
    return (

        props.me === null
            ? <></>
            : <div style={{ marginLeft: '1rem' }}>
                <FlexboxGrid justify="space-between" align="middle">

                    <FlexboxGrid.Item colspan={4}>
                        <div className={styles.profileImage}>
                            <Image src={profileImage} alt="profile image" />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={20}>
                        <div >

                            <h1>{props.me.firstName}</h1>
                            <h6 style={{ fontWeight: 'normal' }}>{props.me.id}</h6>
                        </div>

                    </FlexboxGrid.Item>

                </FlexboxGrid>
            </div>


    )
}
