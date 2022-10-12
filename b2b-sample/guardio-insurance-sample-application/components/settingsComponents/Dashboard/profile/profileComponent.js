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

import { Divider, Panel } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import styles from '../../../../styles/Settings.module.css';

import React, { useEffect, useState } from 'react';

import decodeMe from '../../../../util/apiDecode/dashboard/decodeMe';
import CoverImage from './coverImage';
import OrgDetails from './orgDetails';
import UserDetails from './userDetails';

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

            {
                me == null
                    ? <Panel bordered>
                        <div>Add the user attributes in created the application to display user details</div>
                    </Panel>
                    : <UserDetails me={me} />


            }

            <Divider />

            <OrgDetails orgId={props.orgId} orgName={props.orgName} />

        </div>
    );
}
