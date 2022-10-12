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

import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import React, { useEffect, useState } from 'react';
import { Button, Divider, Nav, Sidenav, Stack } from 'rsuite';
import styles from '../../styles/Settings.module.css';

import { useSession } from 'next-auth/react';
import "rsuite/dist/rsuite.min.css";
import Custom500 from '../../pages/500';
import { checkCustomization, hideBasedOnScopes } from '../../util/util/frontendUtil/frontendUtil';
import { orgSignout } from '../../util/util/routerUtil/routerUtil';
import HomeComponent from './homeComponet/homeComponent';
import IdentityProviders from "./identity-providers/identity-providers";
import LogoComponent from './logoComponent';
import ViewUserComponent from './viewUserComponent';
import ProfileComponent from './Dashboard/profile/profileComponent';
import BlogsComponent from './Dashboard/blogs/blogsComponent';

export default function Settings(props) {

    const SETTINGS_UI = "settings interface"

    const { data: session, status } = useSession();

    const [activeKeySideNav, setActiveKeySideNav] = useState('1-1');

    const mainPanelComponenet = (activeKey, session) => {
        switch (activeKey) {
            case '1-1':

                return <ProfileComponent orgName={props.name} orgId={props.orgId} session={session} />;
            case '1-2':

                return <BlogsComponent />;
            case '2-1':

                return <ViewUserComponent orgName={props.name} orgId={props.orgId} session={session} />;
            case '2-3':

                return <IdentityProviders orgName={props.name} orgId={props.orgId} session={session} />;
            // case '3-1':
            //     return <Application orgName={props.name} session={session} />
        }
    }

    const activeKeySideNavSelect = (eventKey) => {
        setActiveKeySideNav(eventKey);
    }

    useEffect(() => {
        document.body.className = checkCustomization(props.colorTheme)
    }, [props.colorTheme]);

    return (
        <div>
            {session
                ? <div className={styles.mainDiv}>
                    <div className={styles.sideNavDiv}>
                        <SideNavSection name={props.name} scope={session.scope} activeKeySideNav={activeKeySideNav}
                            activeKeySideNavSelect={activeKeySideNavSelect} />
                    </div>
                    <div className={styles.mainPanelDiv}>
                        {mainPanelComponenet(activeKeySideNav, session)}
                    </div>


                </div>
                : <Custom500 />}
        </div>
    )
}

function SideNavSection(props) {

    const signOutOnClick = () => orgSignout();

    return (
        <Sidenav className={styles.sideNav} defaultOpenKeys={['1', '2']} expanded={true}>
            <Sidenav.Header>
                <div style={{ marginTop: '35px', marginBottom: '25px' }}>
                    <LogoComponent imageSize='small' name={props.name} />
                </div>
            </Sidenav.Header>
            <Sidenav.Body>
                <Nav activeKey={props.activeKeySideNav}>
                    <Nav.Menu eventKey="1" title="DASBOARD" icon={<DashboardIcon />}>
                        <Nav.Item eventKey="1-1" onSelect={(eventKey) => props.activeKeySideNavSelect(eventKey)}>
                            Profile
                        </Nav.Item>

                        <Nav.Item eventKey="1-2" onSelect={(eventKey) => props.activeKeySideNavSelect(eventKey)}>
                            Blogs
                        </Nav.Item>
                    </Nav.Menu>

                    <>
                        <Divider style={hideBasedOnScopes(props.scope)} />

                        <Nav.Menu eventKey="2" title="ADMIN SETTINGS" icon={<GearCircleIcon />}
                            style={hideBasedOnScopes(props.scope)}>
                            <Nav.Item eventKey="2-1"
                                onSelect={(eventKey) => props.activeKeySideNavSelect(eventKey)}>
                                Manage Users</Nav.Item>
                            <Nav.Item eventKey="2-3"
                                onSelect={(eventKey) => props.activeKeySideNavSelect(eventKey)}>
                                Identity Providers</Nav.Item>

                        </Nav.Menu>
                    </>

                </Nav>
            </Sidenav.Body>
            <div className={styles.nextButtonDiv}>
                <Button size="lg" appearance='ghost' onClick={signOutOnClick}>Sign Out</Button>
            </div>
        </Sidenav>
    );
}
